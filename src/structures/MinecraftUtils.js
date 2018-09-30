const rp = require('request-promise-native')
const servers = require('../resources/MinecraftServers.json')

const convertUUID = (user) => {
  return new Promise((resolve) => {
    rp.get(`https://api.mojang.com/users/profiles/minecraft/${user}`).then(res => {
      const response = res ? JSON.parse(res) : null
      if (!response) resolve('8667ba71b85a4004af54457a9734eed7')
      else resolve(response.id)
    })
  })
}

const getAvatar = (user) => {
  return new Promise((resolve) => {
    convertUUID(user).then(uuid => {
      rp.get({
        uri: `https://crafatar.com/avatars/${uuid}.png?overlay=true`,
        encoding: null
      }).then(image => {
        resolve(image)
      })
    })
  })
}

const getHead = (user) => {
  return new Promise((resolve) => {
    convertUUID(user).then(uuid => {
      rp.get({
        uri: `https://crafatar.com/renders/head/${uuid}.png?overlay=true`,
        encoding: null
      }).then(image => {
        resolve(image)
      })
    })
  })
}

const getBody = (user) => {
  return new Promise((resolve) => {
    convertUUID(user).then(uuid => {
      rp.get({
        uri: `https://crafatar.com/renders/body/${uuid}.png?overlay=true`,
        encoding: null
      }).then(image => {
        resolve(image)
      })
    })
  })
}

const getSkin = (user) => {
  return new Promise((resolve) => {
    convertUUID(user).then(uuid => {
      rp.get({
        uri: `https://crafatar.com/skins/${uuid}.png`,
        encoding: null
      }).then(image => {
        resolve(image)
      })
    })
  })
}

const getStatus = () => {
  return Promise.all(servers.map(async ({ url, name }) => {
    var response = await rp.head({ url, simple: false, resolveWithFullResponse: true, timeout: 7500, time: true }).catch(e => e)
    var online = (response.statusCode === 200 || response.statusCode === 404 || response.statusCode === 403) ? `${response.elapsedTime}ms` : false
    return { url, name, online }
  }))
}

module.exports.convertUUID = convertUUID
module.exports.getAvatar = getAvatar
module.exports.getHead = getHead
module.exports.getBody = getBody
module.exports.getSkin = getSkin
module.exports.getStatus = getStatus
