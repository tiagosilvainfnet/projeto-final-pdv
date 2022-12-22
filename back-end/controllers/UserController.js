const { User } = require('../models/User.js');
const bcrypt = require('bcryptjs');
const GenericController = require('./GenericController.js');

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
}

module.exports = UserController