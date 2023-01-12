const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
const express = require('express')
const { generateAdminOptions } = require('./utils/adminOptions.js');
const cors = require('cors')
const session = require('express-session');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Database
const db = require('./db.js');

// Models
const { User } = require('./models/User.js');

// Routes
const login = require('./routes/login.js');
const user = require('./routes/user.js');
const product = require('./routes/product.js');
const category = require('./routes/category.js');
const seller = require('./routes/seller.js');

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    NODE_ENV
} = process.env;

const PORT = 3001
const ROOT_DIR = __dirname;

const mysqlStore = require('express-mysql-session')(session)

const sessionStore = new mysqlStore({
  connection: 10,
  password: DB_PASSWORD,
  user: DB_USER,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  createDatabaseTable: true
});

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
})

const start = async () => {
  const app = express()

  const adminOptions = generateAdminOptions(ROOT_DIR);

  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
      authenticate: async (email, password) => {
        const user = await User.findOne({
          where: {
            email
          }
        });
        if(user && user.role_id === 1){
          let verify = await bcrypt.compare(password, user.password)
          if(verify) return user;
        }

        return null;
      },
      cookieName: 'pdv-admin',
      cookiePassword: 'Hm9OAs@xOYbGs9s%Y6334&jfKbzPTX29'
    },
    null,
    {
      store: sessionStore,
      resave: true,
      secret: 'rzXHE&BC@J1E98tZ96@&S2SnRB3pi40Y',
      cookie: {
        httpOnly: NODE_ENV === 'development',
        secure: NODE_ENV === 'production'
      },
      name: 'pdv-admin'
    }
  )

  app.use(cors());
  app.use(express.json())
  app.use(admin.options.rootPath, adminRouter)
  app.use('/api/login', login)
  app.use('/api/user', user)
  app.use('/api/category', category)
  app.use('/api/product', product)
  app.use('/api/seller', seller)

  db.sync(() => console.log("Banco de dados rodando..."))
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()