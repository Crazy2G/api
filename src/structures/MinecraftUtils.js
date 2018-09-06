const rp = require('request-promise-native')

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
        uri: `https://crafatar.com/avatars/${uuid}.png`,
        encoding: null
      }).then(image => {
        resolve(image)
      })
    })
  })
}

module.exports.convertUUID = convertUUID
module.exports.getAvatar = getAvatar
