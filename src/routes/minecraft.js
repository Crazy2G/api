const { Route, MinecraftUtils } = require('../index')
const { Router } = require('express')

module.exports = class Minecraft extends Route {
  constructor (client) {
    super(client)
    this.name = 'minecraft'
  }

  register (app) {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({ endpoints: [
        'GET /avatar',
        'GET /body',
        'GET /head',
        'GET /skin',
        'GET /status'
      ] })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/avatar', async (req, res) => {
      if (!req.query.user) return res.status(400).json({ message: 'You need to specify a user parameter to grab the avatar from' })
      else {
        const avatar = await MinecraftUtils.getAvatar(req.query.user)
        res.status(200).set('Content-Type', 'image/png').send(avatar)
      }
    })

    router.get('/body', async (req, res) => {
      if (!req.query.user) return res.status(400).json({ message: 'You need to specify a user parameter to grab the body from' })
      else {
        const body = await MinecraftUtils.getBody(req.query.user)
        res.status(200).set('Content-Type', 'image/png').send(body)
      }
    })

    router.get('/head', async (req, res) => {
      if (!req.query.user) return res.status(400).json({ message: 'You need to specify a user parameter to grab the head from' })
      else {
        const head = await MinecraftUtils.getHead(req.query.user)
        res.status(200).set('Content-Type', 'image/png').send(head)
      }
    })

    router.get('/skin', async (req, res) => {
      if (!req.query.user) return res.status(400).json({ message: 'You need to specify a user parameter to grab the skin from' })
      else {
        const skin = await MinecraftUtils.getSkin(req.query.user)
        res.status(200).set('Content-Type', 'image/png').send(skin)
      }
    })

    router.get('/status', async (req, res) => {
      const status = await MinecraftUtils.getStatus()
      res.status(200).json(status)
    })

    app.use(this.path, router)
  }
}
