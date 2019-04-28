const express = require("express");
const database = require('../database');

const router = express.Router();


router.get('/:id', async (req, res, next) => {

  const result = await database.simpleExecute(' SELECT * FROM Comments WHERE PRODUCT_ID = ' + req.params.id);
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


module.exports = router;
