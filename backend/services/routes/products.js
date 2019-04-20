const express = require("express");
const database = require('../database');

const router = express.Router();

router.get("", async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const min = 1 + (currentPage-1)*pageSize;
  const max = min + pageSize-1;
  //const result = await database.simpleExecute("SELECT * FROM Products);
  const result = await database.simpleExecute('SELECT * FROM (SELECT prod.*, row_number() over (ORDER BY prod.id) line_number FROM Products prod) WHERE line_number between '+ min +' and  '+ max +' ORDER BY line_number');
  products=result.rows;
  const result2 = await database.simpleExecute('SELECT count(*) as count FROM Products')
  res.status(200).json({
    message: 'Products fetched succesfully!',
    products: products,
    count: result2.rows
  });
});

module.exports = router;
