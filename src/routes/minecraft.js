const { Route, MinecraftUtils } = require('../index')
const { Router } = require('express')

module.exports = class Minecraft extends Route {
  constructor (client) {
    super(client)
    this.name = 'minecraft'
  }

  load () {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({ endpoints: [
        'GET /ping',
        'GET /avatar/:user',
        'GET /head/:user',
        'GET /body/:user',
        'GET /skin/:user'
      ] })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/avatar/:user', async (req, res) => {
      if (!req.params.user) return res.status(400).json({ message: 'You need to specify a user to grab the avatar from' })
      else {
        const avatar = await MinecraftUtils.getAvatar(req.params.user)
        res.status(200).set('Content-Type', 'image/png').send(avatar)
      }
    })

    router.get('/head/:user', async (req, res) => {
      if (!req.params.user) return res.status(400).json({ message: 'You need to specify a user to grab the head from' })
      else {
        const head = await MinecraftUtils.getHead(req.params.user)
        res.status(200).set('Content-Type', 'image/png').send(head)
      }
    })

    router.get('/body/:user', async (req, res) => {
      if (!req.params.user) return res.status(400).json({ message: 'You need to specify a user to grab the body from' })
      else {
        const body = await MinecraftUtils.getBody(req.params.user)
        res.status(200).set('Content-Type', 'image/png').send(body)
      }
    })

    router.get('/skin/:user', async (req, res) => {
      if (!req.params.user) return res.status(400).json({ message: 'You need to specify a user to grab the skin from' })
      else {
        const skin = await MinecraftUtils.getSkin(req.params.user)
        res.status(200).set('Content-Type', 'image/png').send(skin)
      }
    })

    router.get('/status', async (req, res) => {
      const status = await MinecraftUtils.getStatus()
      res.status(200).json(status)
    })

    return router
  }
}
