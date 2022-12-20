const express = require('express');
const login = express.Router();
const UserController = require('../controllers/UserController');

userCtrl = new UserController();

login.post('', async(req, res) => {
    const user = await userCtrl.login(req.body.email, req.body.password);
    
    if(user){
        const {
            id,
            email,
            store_id,
            active
        } = user
        res.statusCode = 200;
        res.send({
            id,
            email,
            store_id,
            active
        })
        return;
    }
    res.statusCode = 404;
    res.send({})
})

module.exports = login;