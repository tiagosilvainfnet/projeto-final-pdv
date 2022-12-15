const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
const express = require('express')
const db = require('./db.js');
const { generateAdminOptions } = require('./utils/adminOptions.js');

const PORT = 3000

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
})

const start = async () => {
  const app = express()

  const adminOptions = generateAdminOptions();

  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildRouter(admin)

  app.use(express.json())
  app.use(admin.options.rootPath, adminRouter)

  db.sync(() => console.log("Banco de dados rodando..."))
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()