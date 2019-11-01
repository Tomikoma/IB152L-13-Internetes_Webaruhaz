const express = require("express");
const database = require('../database');

const router = express.Router();
const checkAuth = require("../../middleware/check-auth");

router.get("/pr/:type", async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const min = 1 + (currentPage-1)*pageSize;
  const max = min + pageSize-1;
  const type = req.params.type;
  if(type === "all"){
    //const result = await database.simpleExecute('SELECT * FROM (SELECT prod.*, row_number() over (ORDER BY prod.id) line_number FROM Products prod) WHERE line_number between '+ min +' and  '+ max +' ORDER BY line_number');
    //const result = await database.simpleExecute('SELECT * FROM Products ORDER BY ID OFFSET ' + pageSize +' * ('+ currentPage + '-1) ROWS FETCH NEXT '+ pageSize + ' ROWS ONLY');
    const result = await database.simpleExecute('SELECT t1.* FROM (SELECT * FROM Products) t1 JOIN '
    +'(SELECT  id, COALESCE(SUM(OrderedProducts.Quantity),0) as BOUGHT ' +
    'FROM OrderedProducts ' +
    'RIGHT OUTER JOIN Products on Products.id = OrderedProducts.product_id GROUP BY Products.id) t2 ON t1.id = t2.id ' +
    'ORDER BY BOUGHT desc OFFSET '+ pageSize +' * ('+ currentPage +'-1) ROWS FETCH NEXT '+ pageSize +' ROWS ONLY');
    products=result.recordset;
    const result2 = await database.simpleExecute('SELECT count(*) as count FROM Products');
    res.status(200).json({
      message: 'Products fetched succesfully!',
      products: products,
      count: result2.recordset[0].count
    });
  } else { //egyszerűsíthető column table-lel => with T(....) AS (SELECT ..) SELECT c1,c2,c3 FROM T;
    const result = await database.simpleExecute('SELECT t1.* FROM (SELECT * FROM Products WHERE productType = \'' + type + '\') t1 LEFT JOIN '
    +'(SELECT  id, COALESCE(SUM(OrderedProducts.Quantity),0) as BOUGHT ' +
    'FROM OrderedProducts ' +
    'RIGHT OUTER JOIN Products on Products.id = OrderedProducts.product_id GROUP BY Products.id) t2 ON t1.id = t2.id ' +
    'ORDER BY BOUGHT desc OFFSET '+ pageSize +' * ('+ currentPage +'-1) ROWS FETCH NEXT '+ pageSize +' ROWS ONLY');
    products=result.recordset;
    const result2 = await database.simpleExecute('SELECT count(*) as count FROM ' + type);
    res.status(200).json({
      message: 'Products fetched succesfully!',
      products: products,
      count: result2.recordset[0].count
    });
  }
  //const result = await database.simpleExecute("SELECT * FROM Products);

});

router.get('/:type/:id', async (req, res, next) => {
  type = req.params.type;
  id = req.params.id;
  if(type){
    const result = await database.simpleExecute(' SELECT * FROM ' + type + ' WHERE id = ' + id);
    const result2 = await database.simpleExecute(' SELECT id, productName FROM ' + type + ' WHERE ID != ' + id);
    product = result.recordset[0];
    products = result2.recordset;
    if(product){
      res.status(200).json({
        product: product,
        products: products
      });
    } else {
      res.status(404).json({
        message: 'Product with this type and id not found!'
      });
    }

  } else {
    res.status(404).json({
      message: 'Product with this type not found!'
    });
  }
});

router.get("/:type/:id1/compare/:id2", async (req, res, next) => {
  type = req.params.type;
  id1 = req.params.id1;
  id2 = req.params.id2;
  if(type){
    const result = await database.simpleExecute(' SELECT * FROM ' + type + ' WHERE id = ' + id1);
    const result2 = await database.simpleExecute(' SELECT * FROM ' + type + ' WHERE id = ' + id2);
    product1 = result.recordset[0];
    product2 = result2.recordset[0];
    if(product1 && product2){
      res.status(200).json({
        firstProduct: product1,
        secondProduct: product2
      });
    } else {
      res.status(404).json({
        message: 'Product with this type and id not found!'
      });
    }

  } else {
    res.status(404).json({
      message: 'Product with this type not found!'
    });
  }
});

router.post('/cart/:type/:id', checkAuth, async (req, res, next) => {
  userId=req.userData.userId;
  productId = +req.params.id;
  type = req.params.type;
  count = req.body.count;
  //console.log(userId,productId,count);
  resultOne = await database.simpleExecute("SELECT QUANTITY FROM Products WHERE ID = " + productId)
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Belső hiba történt!"
      })
    });
  if(resultOne.recordset[0].quantity < 1 ) {
    res.status(404).json({
      message: "Ebből a termékből jelenleg nincsen raktáron!"
    });
  }
  else {
    try {
      const result = await database.simpleExecute("SELECT * FROM Cart WHERE PRODUCT_ID =" + productId + " AND USER_ID =" + userId);
      await database.simpleExecute("UPDATE Products SET QUANTITY = QUANTITY-1 WHERE ID = " + productId);
      await database.simpleExecute("UPDATE " + type + " SET QUANTITY = QUANTITY-1 WHERE ID = " + productId);
      if (!result.recordset[0]) {
        try {
          await database.simpleExecute("INSERT INTO Cart VALUES(" + productId + ", " + userId +", "+ count + ")");
          res.status(200).json({
            message:"ok"
          });
        } catch (error) {
          res.status(500).json({
            message: 'Belső hiba történt!'
          });
        }
      } else {
        try {
          count = result.recordset[0].quantity + count;
          const result2 = await database
            .simpleExecute("UPDATE Cart SET QUANTITY = " + count + " WHERE PRODUCT_ID = " + productId + " AND USER_ID = " + userId );
          res.status(200).json({
            message:"ok"
          });
        } catch (error) {
          console.log(err);
          res.status(500).json({
            message: 'Something went wrong!'
          });
        }
      }

    } catch(error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong!"
      })
    }
  }
});

router.get('/cart',checkAuth, async (req, res, next) =>{
  userId=req.userData.userId;
  try {
    result = await database.simpleExecute("SELECT * FROM Cart WHERE USER_ID = " + userId);
    result2 = await database.simpleExecute("SELECT * FROM Products WHERE ID IN (SELECT PRODUCT_ID FROM Cart WHERE USER_ID = " + userId + " )");
    result3 = await database
      .simpleExecute("SELECT * FROM Products WHERE id IN"
      + "(SELECT product_id FROM OrderedProducts WHERE Order_id IN (SELECT Order_id FROM OrderedProducts WHERE Product_id in (SELECT product_id FROM Cart))) AND id NOT IN (SELECT product_id FROM Cart)")
    res.status(200).json({
      products: result2.recordset,
      cartItems: result.recordset,
      recommendedProducts: result3.recordset
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Nem sikerült lekérdezni a kosarad tartalmát"
    })
  }
});

router.put('/cart/:type/:id',checkAuth, async (req, res, next) => {
  userId = req.userData.userId;
  productId = req.params.id;
  count = req.body.count;
  type = req.params.type;
  try {
    result = await database.simpleExecute("SELECT quantity FROM Cart WHERE USER_ID = " + userId + " AND PRODUCT_ID = " + productId);
    quantity = result.recordset[0].quantity - count;
    if (quantity > 0) {
      await database.simpleExecute("UPDATE Cart SET QUANTITY = " + quantity + " WHERE USER_ID = " + userId + " AND PRODUCT_ID = " + productId);
      await database.simpleExecute("UPDATE Products SET QUANTITY = QUANTITY + 1 WHERE ID = " + productId);
      await database.simpleExecute("UPDATE "+ type +" SET QUANTITY = QUANTITY + 1 WHERE ID = " + productId);
      res.status(200).json({
        message: "Egy termék törölve lett a kosárból"
      });
    } else {
      await database.simpleExecute("DELETE FROM CART WHERE USER_ID = " + userId + " AND PRODUCT_ID = " + productId);
      await database.simpleExecute("UPDATE Products SET QUANTITY = QUANTITY + 1 WHERE ID = " + productId);
      await database.simpleExecute("UPDATE "+ type +" SET QUANTITY = QUANTITY + 1 WHERE ID = " + productId);
      res.status(200).json({
        message: "Termék törölve lett a kosárból"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Valami belső hiba lépett fel a kosárból való törlés közben",
      error: error
    });
  }
});

router.get('', async (req,res,next) => {
  result1 = await database.simpleExecute("SELECT top(6) * FROM Products WHERE PRODUCTTYPE = 'tv' ORDER BY RELEASEDATE DESC")
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Belső hiba lépett fel a termékek lekérdezése közben"
      });
    });
    result2 = await database.simpleExecute("SELECT top(6) * FROM Products WHERE PRODUCTTYPE = 'notebook' ORDER BY RELEASEDATE DESC")
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Belső hiba lépett fel a termékek lekérdezése közben"
      });
    });
    result3 = await database.simpleExecute("SELECT top(6) * FROM Products WHERE PRODUCTTYPE = 'smartphone' ORDER BY RELEASEDATE DESC")
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Belső hiba lépett fel a termékek lekérdezése közben"
      });
    });
    res.status(200).json({
      tvs: result1.recordset,
      notebooks: result2.recordset,
      smartphones: result3.recordset
    });

});

module.exports = router;
