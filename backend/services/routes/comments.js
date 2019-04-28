const express = require("express");
const database = require('../database');
const checkAuth = require('../../middleware/check-auth');

const router = express.Router();


router.get('/:id', async (req, res, next) => {

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

router.post('/:id', checkAuth, async (req, res, next) => {
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


module.exports = router;
