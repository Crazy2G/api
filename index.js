const express = require('express')
// const expressVue = require('express-vue')

// const expressVueMiddleware = expressVue.init()
const app = express()

const { Route, FileUtils } = require('./src/')

const options = {
  port: process.env.PORT || 1591,
  url: process.env.URL || 'https://minecraft.c2g.space/'
}

let expressApp = null
let routes = []

const start = (port) => {
  port = port || options.port

  app.use(express.json())
  // app.use(expressVueMiddleware)

  app.listen(port, () => {
    log(`Listening on port ${port}`, 'Website')
    expressApp = app
  })

  return initializeRoutes('src/routes')
}

const log = (...args) => {
  const message = args[0]
  const tags = args.slice(1).map(t => `[${t}]`)
  console.log(...tags, message)
}

const logError = (...args) => {
  const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`) : []
  console.error('[Error]', ...tags, args[args.length - 1])
}

const addRoute = (route) => {
  if (route instanceof Route && route.canLoad()) {
    const router = route.load()
    if (router) {
      routes.push(route)
      app.use(route.path, router)
    }
  }
}

const initializeRoutes = (dirPath) => {
  return FileUtils.requireDirectory(dirPath, (NewRoute) => {
    if (Object.getPrototypeOf(NewRoute) !== Route) return
    addRoute(new NewRoute(expressApp))
    log(`${NewRoute.name} loaded.`, 'Routes')
  }, this.logError)
}

start().then(() => log(`${options.url} is being served successfully on port ${options.port}`, 'Website')).catch(logError)
