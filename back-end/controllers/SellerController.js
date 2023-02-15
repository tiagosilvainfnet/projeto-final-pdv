const { Seller } = require('../models/Seller.js');
const GenericController = require('./GenericController.js');

class SellerController extends GenericController{
  constructor(){
    super();
  }

  async get(query){
    const { store_id, limit, page } = query;
    const paginate = this.generatePagination(limit, page)
    
    const count = await Seller.count();
    const seller = await Seller.findAll({
      where: {
        store_id
      },
      ...paginate
    });

    return {
      rows: seller,
      count
    };
  }

  async getSellerById(id){
    // TODO: Fazer com que os dados sejam recuperados
    const count = 10;

    return {
      rows: {
        products: [{},{},{},{},{},{}],
        formas: [{},{},{}],
        loja: {}
      },
      count
    };
  }}

module.exports = SellerController