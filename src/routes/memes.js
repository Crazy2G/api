const { Route } = require('../index')
const { Router } = require('express')

module.exports = class Memes extends Route {
  constructor (client) {
    super(client)
    this.name = 'memes'
  }

  register (app) {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({
        endpoints: [
          'GET /tiodopave'
        ]
      })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/tiodopave', (req, res) => {
      const piadas = require('../resources/PiadasTioDoPave')
      const piada = piadas[Math.floor(Math.random() * piadas.length)]
      res.status(200).json({ piada })
    })

    app.use(this.path, router)
  }
}
