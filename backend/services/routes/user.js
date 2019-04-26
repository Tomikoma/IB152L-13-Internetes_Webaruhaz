const express = require("express");
const database = require('../database');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup",async (req,res,next) => {

  bcrypt.hash(req.body.password,10)
    .then(async hash =>  {
      const result = await database.simpleExecute(
        "INSERT INTO Users(email,password,name,phonenumber,postalcode,city,street,streetnumber) VALUES ('"
        + req.body.email + "','" + hash + "','" + req.body.name + "'," + req.body.phoneNumber + "," + req.body.postalCode
         + ",'" + req.body.city + "','" + req.body.street + "'," + req.body.streetNumber + ")")
         .then(response => {
           console.log(response);
         });
    });

});

module.exports = router;
