const express = require("express");
const database = require('../database');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        res.status(500).json({
          message: 'Something went wrong!'
        })
      } finally {

      }
    });

});

module.exports = router;
