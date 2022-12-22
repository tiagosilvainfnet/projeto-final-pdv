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

module.exports = user;