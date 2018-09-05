module.exports = class Route {
  constructor (client, parentRoute) {
    this.client = client

    this.name = 'RouteName'

    this.requirements = null
    this.parentRoute = parentRoute
  }

  get path () {
    return `${this.parentRoute || ''}/${this.name}`
  }

  load () {
    return null
  }

  canLoad () {
    return true
  }

  handleRequirements (args) {
    return this.requirements ? this.requirements.handle(args) : true
  }
}
