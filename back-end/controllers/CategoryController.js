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

  async getOne(id){
    const category = await Category.findOne({
      where: {
        id
      }
    });

    return category;
  }

  async delete(id){
    try{
      await Category.destroy({
        where: {
          id
        }
      });
    }catch(err){
      console.log(err)
      throw(err)
    }
  }

  async add(data){
    try{
      await Category.create(data);
    }catch(err){
      console.log(err)
      throw(err)
    }
  }

  async update(data, id){
    try{
      await Category.update(data, {
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

module.exports = CategoryController