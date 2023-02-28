const { Seller, SellerItem, SellerPaymentType } = require('../models/Seller.js');
const { Product } = require('../models/Product.js');
const { Store } = require('../models/Store.js');
const GenericController = require('./GenericController.js');
const { Op } = require('sequelize');
const lodash = require('lodash');
class SellerController extends GenericController{
  constructor(){
    super();
  }

  async create(body){
    const { 
      total, 
      payments, 
      cart, 
      troco,
      employee_id,
      store_id } = body;
      
    const seller = await Seller.create({
      total,
      payed_value: lodash.sumBy(payments, 'value'),
      troco,
      store_id,
      employee_id,
    });


    payments.forEach(async payment => {
      const { value, type } = payment;

      await SellerPaymentType.create({
        value,
        type,
        seller_id: seller.id,
      });
    })

    cart.forEach(async item => {
      const { id, quantity, price, promo_price } = item;

      await SellerItem.create({
        product_id: id,
        seller_id: seller.id,
        quantity,
        price,
        promo_price,
        seller_id: seller.id,
      });
    })
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
    const seller = await Seller.findOne({
      where: {
        id
      }
    });

    const sellerItems = await SellerItem.findAll({
      where: {
        seller_id: id
      }
    });

    let ids = sellerItems.map(item => item.product_id);
    let products = await Product.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });

    const formas = await SellerPaymentType.findAll(
      {
        where: {
          seller_id: id
        }
      }
    )

    const loja = await Store.findOne({
      where: {
        id: seller.store_id
      }
    })

    products = products.map(product => {
      const sellerItem = sellerItems.find(item => item.product_id === product.id);
      return {
        ...product.dataValues,
        ...sellerItem.dataValues
      }
    });

    return {
      rows: {
        products,
        formas,
        loja
      },
      count: sellerItems.length
    };
  }}

module.exports = SellerController