require('dotenv').config()
const API = require('./src/api.js')
const wrapper = new API({
  port: process.env.PORT || 1591,
  url: process.env.URL || 'localhost'
})

wrapper.start().then(() => wrapper.log('API initialized successfully', 'API')).catch(wrapper.logError)
