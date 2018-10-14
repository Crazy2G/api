const { Schema } = require('mongoose')

module.exports = {
  // Application Schema
  Application: new Schema({
    _id: String,
    acceptanceTimestamp: { type: Number, default: 0 },
    randomVerificationString: { type: String, default: '' },
    token: { type: String, default: '' }
  })
}
