const express = require("express");
const database = require('../database');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();

router.post("", checkAuth, async (req,res,next) => {
  userId = req.userData.userId;
  cartItems = req.body.cartItems;
  result = await database.simpleExecute("SELECT seq_orders.nextval FROM DUAL")
    .catch(error => {
      res.status(500).json({
        message: "Belső hiba lépett fel rendelés közben",
        error: error
      });
    });
  orderId = result.rows[0].NEXTVAL;
  await database.simpleExecute("INSERT INTO Orders(ID,USER_ID, BUYINGDATE, STATUS) VALUES (" + orderId + ", " + userId + ", TO_DATE('" + (new Date().toLocaleDateString()) + "', 'YYYY-MM-DD'), 'Fizetesre var')"  )
    .catch( error => {
      res.status(500).json({
        message: "Belső hiba lépett fel rendelés közben",
        error: error
      });
  });

  cartItems.forEach(async element => {
    await database.simpleExecute("INSERT INTO OrderedProducts VALUES (" +  orderId + ", " + element.PRODUCT_ID + ", " + element.QUANTITY + ")")
      .catch(error => {
        res.status(500).json({
          message: "Belső hiba lépett fel rendelés közben",
          error: error
        });
      });
  });

  await database.simpleExecute("DELETE FROM Cart WHERE USER_ID = " + userId);

  res.status(201).json({
    message:"Rendelés megtörtént"
  })
})


module.exports = router;
