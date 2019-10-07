const express = require("express");
const database = require('../database');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();

router.post("", checkAuth, async (req,res,next) => {
  userId = req.userData.userId;
  cartItems = req.body.cartItems;
  totalprice = req.body.totalprice;
  result = await database.simpleExecute("INSERT INTO Orders(USER_ID, BUYINGDATE, STATUS, totalprice) VALUES (" + userId + ", '" + (new Date().toISOString()) + "', 'Fizetesre var', " + totalprice +");SELECT SCOPE_IDENTITY() AS id;"  )
    .catch( error => {
      console.log("elso",error);
      res.status(500).json({
        message: "Belső hiba lépett fel rendelés közben",
        error: error
      });
  });
  orderId = result.recordset[0].id;
  cartItems.forEach(async element => {
    await database.simpleExecute("INSERT INTO OrderedProducts VALUES (" +  orderId + ", " + element.product_Id + ", " + element.quantity + ")")
      .catch(error => {
        console.log("harmadik",error);
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
  orders = result.recordset;
  res.status(200).json({
    orders: orders,
    orderedProducts: result2.recordset,
    products: result3.recordset,
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
  balance = result.recordset[0].balance;
  if (balance < total) {
    res.status(404).json({
      message: "Az egyenlegén nincs elegendő Ft (HUF), ahhoz hogy kifizethesse ezt a rendelést!"
    })
  } else {
    await database.simpleExecute("UPDATE Orders SET STATUS = 'Fizetve', PAYDATE = GETDATE() WHERE ID = " + orderId )
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Belső hiba lépett fel rendelés fizetése közben!"
        });
      });
      await database.simpleExecute("INSERT INTO Bills (ORDER_ID) VALUES (" + orderId + ")")
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Belső hiba lépett fel a számla kiállítása közben!"
        });
      });
    await database.simpleExecute("UPDATE Users SET BALANCE = BALANCE-" + total + " WHERE ID = " + userId).catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Belső hiba lépett fel rendelés fizetése közben!"
      });
    });

    res.status(200).json({
      message: "Rendelés kifizetve!"
    });
  }

});

router.get("/deliver",checkAuth, async (req,res,next) => {
  authLevel=req.userData.authLevel;
  if(authLevel!=1){
    res.status(401).json({
      message: "Csak adminok kérhetik le a kiszállítandó rendeléseket!"
    });
  } else {
    result = await database.simpleExecute("SELECT Orders.*,Users.city FROM Orders,Users WHERE STATUS LIKE 'Fizetve' AND Orders.USER_ID = Users.ID")
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Belső hiba lépett fel a rendelések lekérdezése közben!"
        });
      });
    res.status(200).json({
      orders: result.recordset,
      message: "Rendelések lekérdezve"
    });

  }
});

router.post("/deliver", checkAuth, async (req,res,next) => {
  authLevel=req.userData.authLevel;
  city = req.body.city;
  if(authLevel!=1){
    res.status(401).json({
      message: "Csak adminok indíthatják el a szállítást!"
    });
  } else {
    await database.simpleExecute("UPDATE Orders SET STATUS ='Szallitas alatt' WHERE ID IN (SELECT Orders.ID FROM Orders,Users WHERE CITY LIKE '"+ city +"' AND Orders.USER_ID = Users.ID AND STATUS LIKE 'Fizetve')")
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: "Belső hiba lépett fel a rendelések lekérdezése közben!"
        });
      });

    res.status(200).json({
      message: "Termékek kiszállítása megkezdődött!"
    });
  }
});

router.get("/income",checkAuth, async (req,res,next) => {
  if(req.userData.authLevel!=1){
    return res.status(401).json({
      message:"Csak adminok tekinthetik meg a bevételeket!"
    })
  }
  result = await database.simpleExecute("SELECT CAST(YEAR(payDate) AS VARCHAR(4)) + '-' + CAST(MONTH(payDate) AS VARCHAR(2)) AS datum"
    + ", sum(totalprice) as osszeg From Orders WHERE payDate IS NOT NULL"
    + " GROUP BY CAST(YEAR(payDate) AS VARCHAR(4)) + '-' + CAST(MONTH(payDate) AS VARCHAR(2))")
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Belső hiba lépett fel a rendelések lekérdezése közben!"
      });
    });
  res.status(200).json({
    incomes: result.recordset
  })
});

module.exports = router;
