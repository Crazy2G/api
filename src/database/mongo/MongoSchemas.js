const { Schema } = require('mongoose')

module.exports = {
  // Application Schema
  Application: new Schema({
    name: String,
    accepted: { type: Boolean, default: false },
    acceptanceTimestamp: { type: Date, default: 0 },
    randomVerificationInteger: { type: String, required: true }
  })
}
