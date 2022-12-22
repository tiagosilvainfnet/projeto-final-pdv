const { Category } = require('../models/Category.js');
const GenericController = require('./GenericController.js');

class CategoryController extends GenericController{
  constructor(){
    super();
  }

  async get(query){
    const { store_id, limit, page } = query;
    const paginate = this.generatePagination(limit, page)
    
    const count = await Category.count();
    const category = await Category.findAll({
      where: {
        store_id
      },
      ...paginate
    });

    return {
      rows: category,
      count
    };
  }
}

module.exports = CategoryController