const { Route, ApiKeyUtils } = require('../index')
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
      const worker = cluster.worker.id
      res.status(200).json({ worker })
    })

    router.post('/registerApp', (req, res) => {
      if (!req.query.name) return res.status(400).json({ message: 'You need to specify a name parameter to register the application' })
      if (!req.query.secret || req.query.secret !== process.env.JWT_SECRET) return res.status(400).json({ message: 'Secret token doesn\'t exist or is invalid' })
      else {
        new ApiKeyUtils(this.client).registerApplication(req.query.name).then(token => res.status(200).json({ token }))
      }
    })

    app.use(this.path, router)
  }
}
