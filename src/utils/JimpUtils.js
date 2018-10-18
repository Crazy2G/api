const config = require('@jimp/custom')
const types = require('@jimp/types')
const plugins = require('@jimp/plugins')
const fisheye = require('@jimp/plugin-fisheye')
const circle = require('@jimp/plugin-circle')

module.exports = config({
  types: [types],
  plugins: [plugins, fisheye, circle]
})
