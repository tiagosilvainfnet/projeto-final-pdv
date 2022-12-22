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

module.exports = category;