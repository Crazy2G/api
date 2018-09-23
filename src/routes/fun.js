const { Route } = require('../index')
const { Router } = require('express')

module.exports = class Fun extends Route {
  constructor (client) {
    super(client)
    this.name = 'fun'
  }

  load () {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({
        endpoints: [
          'GET /ping',
          'GET /vaporwave/:text'
        ]
      })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/vaporwave/:text', (req, res) => {
      if (!req.params.text) return res.status(400).json({ message: 'You need to specify a text to vaporwave-ify' })
      else {
        const text = req.params.text.split('').map(Fun.charToFullWidth).join('')
        res.status(200).json({ text })
      }
    })

    return router
  }

  static charToFullWidth (char) {
    const c = char.charCodeAt(0)
    return c >= 33 && c <= 126
      ? String.fromCharCode((c - 33) + 65281)
      : char
  }
}
