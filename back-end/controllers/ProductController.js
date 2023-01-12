const { Product } = require('../models/Product.js');
const GenericController = require('./GenericController.js');

class ProductController extends GenericController{
    constructor(){
      super();
    }

    async get(query){
      const { store_id, limit, page } = query;
      const paginate = this.generatePagination(limit, page)

      
      const count = await Product.count();
      const product = await Product.findAll({
        where: {
          store_id
        },
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