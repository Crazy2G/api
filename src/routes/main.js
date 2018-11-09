const { Route, ApiKeyUtils } = require('../index')
const { Router } = require('express')
const path = require('path')

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
          'GET /image',
          'GET /memes',
          'GET /minecraft',
          'GET /misc',
          'GET /privacy'
        ]
      })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.post('/registerApp', (req, res) => {
      if (!req.query.name) return res.status(400).json({ message: 'You need to specify a name parameter to register the application' })
      if (!req.query.secret || req.query.secret !== process.env.JWT_SECRET) return res.status(400).json({ message: 'Secret token doesn\'t exist or is invalid' })
      else {
        new ApiKeyUtils(this.client).registerApplication(req.query.name).then(token => res.status(200).json({ token }))
      }
    })

    router.get('/privacy', (req, res) => {
      res.status(200).sendFile(path.join(__dirname, 'static/privacy-policy.html'))
    })

    app.use(this.path, router)
  }
}
