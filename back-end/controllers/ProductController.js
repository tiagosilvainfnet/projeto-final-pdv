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
}

module.exports = ProductController