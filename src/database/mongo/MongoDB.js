const DBWrapper = require('../DBWrapper.js')
const { Application } = require('./MongoSchemas.js')
const MongoRepository = require('./MongoRepository.js')

const mongoose = require('mongoose')

module.exports = class MongoDB extends DBWrapper {
  constructor (options = {}) {
    super(options)
    this.mongoose = mongoose
  }

  connect () {
    return mongoose.connect(process.env.MONGODB_URI, this.options).then((m) => {
      this.applications = new MongoRepository(m, m.model('Application', Application))
    })
  }
}
