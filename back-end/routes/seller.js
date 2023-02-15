const express = require('express');
const seller = express.Router();
const SellerController = require('../controllers/SellerController');

sellerCtrl = new SellerController();

seller.get('', async(req, res) => {
    const sellers = await sellerCtrl.get(req.query);
    
    if(sellers){
        res.statusCode = 200;
        res.send(sellers)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

seller.get('/:id', async(req, res) => {
    const seller = await sellerCtrl.getSellerById(req.params.id);
    
    if(seller){
        res.statusCode = 200;
        res.send(seller)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

module.exports = seller;