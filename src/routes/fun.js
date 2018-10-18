const { Route } = require('../index')
const { Router } = require('express')
const figlet = require('figlet')

module.exports = class Fun extends Route {
  constructor (client) {
    super(client)
    this.name = 'fun'
  }

  register (app) {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({
        endpoints: [
          'GET /asciify',
          'GET /vaporwave'
        ]
      })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/asciify', (req, res) => {
      if (!req.query.text) return res.status(400).json({ message: 'You need to specify a text parameter to asciify' })
      else {
        const font = req.query.font || 'Standard'
        const text = figlet.textSync(req.query.text, { font })
        res.status(200).json({ text })
      }
    })

    router.get('/vaporwave', (req, res) => {
      if (!req.query.text) return res.status(400).json({ message: 'You need to specify a text parameter to vaporwave-ify' })
      else {
        const text = req.query.text.split('').map(Fun.charToFullWidth).join('')
        res.status(200).json({ text })
      }
    })

    app.use(this.path, router)
  }

  static charToFullWidth (char) {
    const c = char.charCodeAt(0)
    return c >= 33 && c <= 126
      ? String.fromCharCode((c - 33) + 65281)
      : char
  }
}
