require('dotenv').config();

const { User } = require('../models/User.js');
const bcrypt = require('bcryptjs');
const GenericController = require('./GenericController.js');
const Email = require('../utils/Email');

const {
  URL_FRONT
} = process.env;

class UserController extends GenericController{
    constructor(){
      super();
    }
    async login(email, password){
        const user = await User.findOne({
            where: {
              email
            }
          });
          if(user && (user.role_id === 2 || user.role_id === 3)){
            let verify = await bcrypt.compare(password, user.password)
            if(verify) return user;
          }
  
          return null;
    }

    async get(query){
      const { store_id: _store_id, limit, page } = query;
      const paginate = this.generatePagination(limit, page)
      
      const count = await User.count();
      const users = await User.findAll({
        where: {
          store_id: _store_id
        },
        ...paginate
      });

      const _users = users.map(user => {
        const {id, email, store_id, role_id, active, createdAt, updatedAt} = user;
        return {id, email, store_id, role_id, active, createdAt, updatedAt}
      })

      
      return {
        rows: _users,
        count
      };
    }

    async getOne(id){
      const user = await User.findOne({
        where: {
          id
        }
      });

      const {email, store_id, role_id, active, createdAt, updatedAt} = user;
      return {id, email, store_id, role_id, active, createdAt, updatedAt};
    }

    async delete(id){
      try{
        await User.destroy({
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
        const emailUtil = new Email(__dirname.replace('controllers', '').replace('/', ''));
        await emailUtil.sendEmail(email, 'Dados de acesso ao retaguarda', 'password-email', {
            email,
            password,
            url: URL_FRONT
        })

        data.password = bcrypt.hashSync(data.password, 10);
        await User.create(data);
      }catch(err){
        console.log(err)
        throw(err)
      }
    }
  
    async update(data, id){
      try{
        await User.update(data, {
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

module.exports = UserController