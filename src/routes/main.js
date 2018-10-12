const { Route } = require('../index')
const { Router } = require('express')
const cluster = require('cluster')

module.exports = class Main extends Route {
  constructor (client) {
    super(client)
    this.name = ''
  }

  register (app) {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({
        endpoints: [
          'GET /fun',
          'GET /memes',
          'GET /minecraft'
        ]
      })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/c12n', (req, res) => {
      const worker = cluster.worker
      res.status(200).json({ worker })
    })

    app.use(this.path, router)
  }
}
