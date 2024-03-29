const { Op } = require('sequelize');
const { Product } = require('../models/Product.js');
const GenericController = require('./GenericController.js');

class ProductController extends GenericController{
    constructor(){
      super();
    }

    async getSync(query){
      const { store_id } = query;

      const product = await Product.findAll({
        where: {
          store_id
        }
      });

      return {
        rows: product
      };
    }


    async get(query){
      const { store_id, limit, page, search } = query;
      const paginate = this.generatePagination(limit, page)

      let where = {
          store_id          
      }

      if(search){
        // Adicione um operador Or para pesquisar por nome e ean
        where = {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { ean: { [Op.like]: `%${search}%` } }
          ]
        }
      }
      
      const count = await Product.count();
      const product = await Product.findAll({
        where,
        ...paginate
      });

      return {
        rows: product,
        count
      };
    }

    async delete(id){
      try{
        await Product.destroy({
          where: {
            id
          }
        });
      }catch(err){
        console.log(err)
        throw(err)
      }
    }

    async getOne(id){
      const product = await Product.findOne({
        where: {
          id
        }
      });

      const _product = product;
      _product.price = Number(product.price).toFixed(2);
      _product.promo_price = Number(product.promo_price).toFixed(2);

      return _product;
    }
    
    async add(data){
      try{
        await Product.create(data);
      }catch(err){
        console.log(err)
        throw(err)
      }
    }
  
    async update(data, id){
      try{
        await Product.update(data, {
          where: {
            id
          }
        });
      }catch(err){
        console.log(err)
        throw(err)
      }
    }
}

module.exports = ProductController