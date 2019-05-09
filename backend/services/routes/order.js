const express = require("express");
const database = require('../database');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();

router.post("", checkAuth, async (req,res,next) => {
  userId = req.userData.userId;
  cartItems = req.body.cartItems;
  totalprice = req.body.totalprice;
  result = await database.simpleExecute("SELECT seq_orders.nextval FROM DUAL")
    .catch(error => {
      res.status(500).json({
        message: "Belső hiba lépett fel rendelés közben",
        error: error
      });
    });
  await database.simpleExecute("COMMIT")
  orderId = result.rows[0].NEXTVAL;
  await database.simpleExecute("INSERT INTO Orders(ID,USER_ID, BUYINGDATE, STATUS, totalprice) VALUES (" + orderId + ", " + userId + ", TO_DATE('" + (new Date().toLocaleDateString()) + "', 'YYYY-MM-DD'), 'Fizetesre var', " + totalprice +")"  )
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
});

router.get("",checkAuth, async (req,res,next) => {
  userId = req.userData.userId;
  result = await database.simpleExecute("SELECT * FROM Orders WHERE USER_ID = " + userId + " ORDER BY ID ")
    .catch(error => {
      res.status(500).json({
        message: "Belső hiba lépett fel rendelés közben",
        error: error
      });
    });
  result2 = await database.simpleExecute("SELECT * FROM OrderedProducts WHERE ORDER_ID IN (SELECT ID FROM Orders WHERE USER_ID = " + userId + ")");
  result3 = await database.simpleExecute("SELECT * FROM Products WHERE ID IN (SELECT PRODUCT_ID FROM OrderedProducts WHERE ORDER_ID IN (SELECT ID FROM Orders WHERE USER_ID = " + userId + "))");
  orders = result.rows;
  res.status(200).json({
    orders: orders,
    orderedProducts: result2.rows,
    products: result3.rows,
    message: "Rendelések lekérve"
  });
});

router.patch("/:id", checkAuth, async (req,res,next) => {
  userId = req.userData.userId;
  orderId = req.params.id;
  total = req.body.total;
  result = await database
    .simpleExecute("SELECT balance FROM Users WHERE ID = " + userId)
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Belső hiba lépett fel rendelés közben!"
      });
    });
  balance = result.rows[0].BALANCE;
  if (balance < total) {
    res.status(404).json({
      message: "Az egyenlegén nincs elegendő Ft (HUF), ahhoz hogy kifizethesse ezt a rendelést!"
    })
  }

});

module.exports = router;
