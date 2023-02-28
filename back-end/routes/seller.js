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

seller.post('', async(req, res) => {
    try{
        await sellerCtrl.create(req.body);
        res.send({'msg': 'Venda realizada com sucesso!', status: 200})
    }catch(err){
        res.send({'msg': `Erro ao realizar venda. Erro ${err}`, status: 400})
    }
})

module.exports = seller;