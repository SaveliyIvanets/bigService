const fs = require('fs')
const path = require('path')
const defaultConfig = require('./defaultConfig.json')
const configPath = path.join(__dirname, '../', 'config.json')

const config = (() => {
  try {
    if (fs.existsSync(configPath)) {
      try {
        const config = require(configPath)

        return JSON.parse(JSON.stringify({ ...defaultConfig, ...config }))
      } catch (err) {
        throw new Error(err)
      }
    } else {
      console.log('конфиг отсутствует')
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2))
      console.log('конфиг создан')

      const config = require(configPath)

      return JSON.parse(JSON.stringify({ ...config }))
    }
  } catch (err) {
    throw new Error(`что-то пошло не так в момент проверки конфига:\n ${err}`)
  }
})()

module.exports = config
