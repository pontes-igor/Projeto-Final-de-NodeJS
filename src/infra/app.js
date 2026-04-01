const express = require('express')
const { router } = require('../routes/routes')
const app = express()
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })
app.use(express.json())
app.use(router)

module.exports = { app }