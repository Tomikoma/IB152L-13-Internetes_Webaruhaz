const express = require("express");
const database = require('../database');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkAuth = require("../../middleware/check-auth");

const router = express.Router();

router.post("/signup",async (req,res,next) => {

  bcrypt.hash(req.body.password,10)
    .then(async hash =>  {
      try{
      const result = await database.simpleExecute(
        "INSERT INTO Users(email,password,name,phonenumber,postalcode,city,street,streetnumber) VALUES ('"
        + req.body.email + "','" + hash + "','" + req.body.name + "'," + req.body.phoneNumber + "," + req.body.postalCode
         + ",'" + req.body.city + "','" + req.body.street + "'," + req.body.streetNumber + ")");
         res.status(201).json({
           message: "User created",
         })
      } catch(err) {
        let errorMessage = "A regisztáció nem sikerült!";
        if(err.number === 2627){
          errorMessage = "Ez az email cím már foglalt!"
        }
        res.status(500).json({
          message: errorMessage
        })
      } finally {

      }
    });

});

router.post("/login", async (req,res,next) => {
  const result = await database.simpleExecute("SELECT email,password,id,authorizationLevel FROM Users WHERE email= '" + req.body.email + "'");
  if(!result.recordset[0]) {
    return res.status(401).json({
      message: "Rossz email cím/jelszó kombináció!"
    });
  }
  bcrypt.compare(req.body.password,result.recordset[0].password)
    .then(hash => {
      if (!hash) {
        return res.status(401).json({
          message: "Rossz email cím/jelszó kombináció!"
        });
      }
      const token = jwt.sign(
        {email: result.recordset[0].email, userId: result.recordset[0].id, authLevel: result.recordset[0].authorizationLevel  },
        "secret_this_should_be_longer",
        { expiresIn: '1h'});
      res.status(200).json({
        token:token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "A bejelentkezés nem sikerült!"
      });
    });
});

  router.get("/info", checkAuth, async (req,res, next) => {
    userId = req.userData.userId;
    try{
      result = await database.simpleExecute("SELECT * FROM Users WHERE ID = " + userId);
      res.status(200).json({
        user: result.recordset[0]
      })
    } catch (error) {
      res.status(500).json({
        message: "Belső hiba lépett fel!"
      })
    }
  })

  router.post("/balance",checkAuth, async (req,res, next) =>{
    userId = req.userData.userId;
    amount = req.body.amount;
    await database.simpleExecute("UPDATE Users SET BALANCE=BALANCE + " + amount + " WHERE ID=" + userId)
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Belső hiba lépett fel!"
        })
      });
    res.status(200).json({
      message: "Egyenleg feltöltve!"
    });
  });

module.exports = router;
