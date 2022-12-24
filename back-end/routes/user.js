const express = require('express');
const user = express.Router();
const UserController = require('../controllers/UserController');

userCtrl = new UserController();

user.get('', async(req, res) => {
    const users = await userCtrl.get(req.query);
    
    if(users){
        res.statusCode = 200;
        res.send(users)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

user.get('/:id', async(req, res) => {
    const user = await userCtrl.getOne(req.params.id);
    
    if(user){
        res.statusCode = 200;
        res.send(user)
        return;
    }
    res.statusCode = 404;
    res.send({})
})

user.delete('/:id', async(req, res) => {
    try{
        await userCtrl.delete(req.params.id);
        res.statusCode = 200;
        res.send({})
    }catch(err){
        res.statusCode = 404;
        res.send({})
    }
})

user.post('', async(req, res) => {
    res.statusCode = 200;
    try{
        await userCtrl.add(req.body);
        res.send({'msg': 'Usuário criado com sucesso!!!', status: 200})
    }catch(err){
        res.send({'msg': `Erro ao criar usuário. Erro ${err}`, status: 400})
    }
})

user.patch('/:id', async(req, res) => {
    res.statusCode = 200;
    try{
        await userCtrl.update(req.body, req.params.id);
        res.send({'msg': 'Usuário editado com sucesso!!!', status: 200})
    }catch(err){
        res.send({'msg': `Erro ao editar usuário. Erro ${err}`, status: 400})
    }
})

module.exports = user;