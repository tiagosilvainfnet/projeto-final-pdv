const { User } = require('../models/User.js');
const bcrypt = require('bcryptjs');

class UserController{
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

    async get(store_id){
      const user = await User.findAll({
        where: {
          store_id
        }
      });

      return user;
    }
}

module.exports = UserController