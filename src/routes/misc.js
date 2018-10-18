const { Route } = require('../index')
const { Router } = require('express')
const os = require('os')
const moment = require('moment')
const cluster = require('cluster')

module.exports = class Misc extends Route {
  constructor (client) {
    super(client)
    this.name = 'misc'
  }

  register (app) {
    const router = Router()

    router.get('/', (req, res) => {
      res.status(200).json({
        endpoints: [
          'GET /ping',
          'GET /status'
        ]
      })
    })

    router.get('/ping', (req, res) => {
      res.status(200).json({ message: 'OK' })
    })

    router.get('/status', (req, res) => {
      const payload = {
        version: `v${require('../../package.json').version}`,
        routes: this.client.routes.length,
        worker: {
          processId: process.pid,
          workerId: cluster.worker.id
        },
        cpu: `${os.cpus().length}x ${os.cpus()[0].model}`,
        ram: {
          used: `${Math.round(((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100)} MB`,
          total: `${Math.round(((os.totalmem() / 1024 / 1024) * 100) / 100000)} GB`
        },
        uptime: moment.duration(process.uptime() * 1000).format('d[d] h[h] m[m] s[s]')
      }
      res.status(200).json(payload)
    })

    app.use(this.path, router)
  }
}
