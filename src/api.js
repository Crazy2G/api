const express = require('express')
const morgan = require('morgan')
const app = express()

const { Route, FileUtils } = require('./')

module.exports = class API {
  constructor (options = {}) {
    this._options = options
    this.app = app
    this.routes = []
  }

  start (port, url) {
    port = port || this._options.port || 1591
    url = url || this._options.url

    app.use(express.json())
    app.use(morgan('combined'))
    app.set('trust proxy', true)

    app.listen(port, () => {
      this.log(`Listening on port ${port}, using URL ${url}`, 'API')
      this.app = app
    })

    return this.initializeRoutes('src/routes/')
  }

  log (...args) {
    const message = args[0]
    const tags = args.slice(1).map(t => `[${t}]`)
    console.log(...tags, message)
  }

  logError (...args) {
    const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : []
    console.error('[Error]', ...tags, args[args.length - 1])
  }

  addRoute (route) {
    if (route instanceof Route) {
      route._register(app)
      this.routes.push(route)
    }
  }

  initializeRoutes (dirPath) {
    return FileUtils.requireDirectory(dirPath, (NewRoute) => {
      if (Object.getPrototypeOf(NewRoute) !== Route) return
      this.addRoute(new NewRoute(this))
      this.log(`${NewRoute.name} loaded.`, 'Routes')
    }, this.logError)
  }
}
