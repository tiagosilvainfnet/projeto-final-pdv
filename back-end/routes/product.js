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

product.get('/sync', async(req, res) => {
    const products = await productCtrl.getSync(req.query);
    
    if(products){
        res.statusCode = 200;
        res.send(products)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

product.get('/:id', async(req, res) => {
    const product = await productCtrl.getOne(req.params.id);
    
    if(product){
        res.statusCode = 200;
        res.send(product)
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

product.post('', async(req, res) => {
    res.statusCode = 200;
    try{
        await productCtrl.add(req.body);
        res.send({'msg': 'Produto criado com sucesso!!!', status: 200})
    }catch(err){
        res.send({'msg': `Erro ao criar produto. Erro ${err}`, status: 400})
    }
})

product.patch('/:id', async(req, res) => {
    res.statusCode = 200;

    try{
        await productCtrl.update(req.body, req.params.id);
        res.send({'msg': 'Produto editado com sucesso!!!', status: 200})
    }catch(err){
        res.send({'msg': `Erro ao editar produto. Erro ${err}`, status: 400})
    }
}),


module.exports = product;