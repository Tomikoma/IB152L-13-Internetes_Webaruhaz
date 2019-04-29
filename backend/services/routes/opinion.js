const express = require("express");
const database = require('../database');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();


router.get('/comments/:id', async (req, res, next) => {

  const result = await database.simpleExecute(" SELECT * FROM Comments WHERE PRODUCT_ID = " + req.params.id);
  if (result.rows) {
    res.status(200).json({
      comments: result.rows
    });
  } else {
    res.status(500).json({
      message: 'Something went wrong!'
    });
  }

});

router.post('/comments/:id', checkAuth, async (req, res, next) => {
  productId = req.params.id;
  userId = req.userData.userId;
  content = req.body.content;
  commentDate = new Date();
  try{
    const result = await database
      .simpleExecute(" INSERT INTO Comments VALUES (" + productId + ", " + userId + ", '" + content +  "', TO_DATE('" + commentDate.toLocaleDateString() + "', 'YYYY-MM-DD') )");
    res.status(200).json({
      message: "Comment inserted"
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong!'
    });
  }
});

router.get('/rating/:id', async (req, res, next) => {
  productId = req.params.id;
  try {
    const result = await database.simpleExecute("SELECT AVG(RATEVALUE)  as rating, COUNT(RATEVALUE) as rateCount FROM Rates WHERE PRODUCT_ID = " + productId);
    res.status(200).json({
      rating: result.rows[0].RATING,
      count: result.rows[0].RATECOUNT
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong!'
    })
  }
});

router.post ('/rating/:id', checkAuth, async (req, res, next) => {
  productId = req.params.id;
  userId = req.userData.userId;
  rating = req.body.rating;
  try{
    const result = await database.simpleExecute("SELECT * FROM Rates WHERE PRODUCT_ID =" + productId + " AND USER_ID =" + userId );
    if (!result.rows[0]) {
      try {
        const result2 = await database.simpleExecute("INSERT INTO Rates VALUES(" + productId + ", " + userId +", "+ rating + ")");
        res.status(200).json({
          message:"ok"
        });
      } catch (error) {
        res.status(500).json({
          message: 'Something went wrong!'
        });
      }
    } else {
      try {
        const result2 = await database
          .simpleExecute("UPDATE Rates SET RATEVALUE = " + rating + " WHERE PRODUCT_ID = " + productId + " AND USER_ID = " + userId );
        res.status(200).json({
          message:"ok"
        });
      } catch (error) {
        res.status(500).json({
          message: 'Something went wrong!'
        });
      }
    }

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong!'
    });
  }

})


module.exports = router;
