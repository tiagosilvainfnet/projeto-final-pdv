const express = require('express');
const category = express.Router();
const CategoryController = require('../controllers/CategoryController');

categoryCtrl = new CategoryController();

category.get('', async(req, res) => {
    const categories = await categoryCtrl.get(req.query);
    
    if(categories){
        res.statusCode = 200;
        res.send(categories)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

category.get('/:id', async(req, res) => {
    const category = await categoryCtrl.getOne(req.params.id);
    
    if(category){
        res.statusCode = 200;
        res.send(category)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

category.delete('/:id', async(req, res) => {
    try{
        await categoryCtrl.delete(req.params.id);
        res.statusCode = 200;
        res.send({})
    }catch(err){
        res.statusCode = 404;
        res.send({})
    }
})

category.post('', async(req, res) => {
    res.statusCode = 200;
    try{
        await categoryCtrl.add(req.body);
        res.send({'msg': 'Categoria criada com sucesso!!!', status: 200})
    }catch(err){
        res.send({'msg': `Erro ao criar categoria. Erro: ${err}`, status: 400})
    }
})

category.patch('/:id', async(req, res) => {
    res.statusCode = 200;
    try{
        await categoryCtrl.update(req.body, req.params.id);
        res.send({'msg': 'Categoria editada com sucesso!!!', status: 200})
    }catch(err){
        res.send({'msg': `Erro ao editar categoria. Erro: ${err}: `, status: 400})
    }
})

module.exports = category;