const express = require("express");
const database = require('../database');

const router = express.Router();

router.get("", async (req, res, next) => {
  const result = await database.simpleExecute('SELECT * FROM Products');
  products=result.rows;
  res.status(200).json({
    message: 'Products fetched succesfully!',
    products: products
  });
});

module.exports = router;
