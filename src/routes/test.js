const { Route } = require('../index')
const { Router } = require('express')

module.exports = class Test extends Route {
  constructor (client) {
    super(client)
    this.name = 'test'
  }

  load () {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({ error: false, message: 'OK' })
    })

    return router
  }
}
