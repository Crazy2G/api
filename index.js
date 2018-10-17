require('dotenv').config()
const API = require('./src/api.js')
const wrapper = new API({
  port: process.env.PORT || 1591,
  url: process.env.URL || 'localhost'
})

wrapper.start().catch(wrapper.logError)
