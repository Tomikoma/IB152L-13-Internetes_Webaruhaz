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

router.get('/:type/:id', async (req, res, next) => {
  type = null;
  id = req.params.id;
  if(req.params.type === 'tv') {
    type = 'TV'
  }
  if(req.params.type === 'notebook') {
    type = 'Notebook'
  }
  if(req.params.type === 'phone') {
    type = 'Smartphone'
  }
  if(type){
    const result = await database.simpleExecute(' SELECT * FROM ' + type + ' WHERE id = ' + id);
    product = result.rows[0];
    if(product){
      res.status(200).json({
        product: product
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
})

module.exports = router;
