const express = require('express');
const product = express.Router();
const ProductController = require('../controllers/ProductController');

productCtrl = new ProductController();

product.get('', async(req, res) => {
    const products = await productCtrl.get(req.query);
    
    if(products){
        res.statusCode = 200;
        res.send(products)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

product.delete('/:id', async(req, res) => {
    try{
        await productCtrl.delete(req.params.id);
        res.statusCode = 200;
        res.send({})
    }catch(err){
        res.statusCode = 404;
        res.send({})
    }
})

module.exports = product;