const fs = require('fs')
const { Transform } = require('stream')

const readStream = fs.createReadStream('huge_users.csv', 'utf8')
const writeStream = fs.createWriteStream('clean_users.csv')
function jsonToString(obj) {
  res = ''
  for (const key in obj) {
    if (res !== '') {
      if (obj[key] !== undefined) {
        res = `${res},${obj[key]}`
      }
    } else {
      res = obj[key]
    }
  }
  return res
}
class UserValidateTransform extends Transform {
  constructor() {
    super()
    this.remainingData = ''
  }

  _transform(chunk, encoding, callback) {
    const data = this.remainingData + chunk.toString()
    this.remainingData = ''
    const lines = data.split('\n')

    const validateUserArray = []
    for (const line of lines) {
      if (line.trim() === '') continue

      const parseUser = line.split(',')

      const userObj = {
        id: parseUser[0]?.trim(),
        first_name: parseUser[1]?.trim(),
        last_name: parseUser[2]?.trim(),
        email: parseUser[3]?.trim(),
      }

      if (
        userObj.id === undefined ||
        userObj.first_name === undefined ||
        userObj.last_name === undefined ||
        userObj.email === undefined
      ) {
        this.remainingData = jsonToString(userObj)
        continue
      }

      if (userObj.id === 'id') {
        validateUserArray.push(jsonToString(userObj))
        continue
      }

      userObj.first_name = userObj.first_name.toUpperCase()
      userObj.last_name = userObj.last_name.toUpperCase()

      if (
        !userObj.email.includes('@') ||
        !['com', 'ru', 'net'].includes(userObj.email.split('.').pop())
      ) {
        console.log(userObj)
        continue
      }

      validateUserArray.push(jsonToString(userObj))
    }

    callback(null, validateUserArray.join('\r\n') + '\n')
  }
}

readStream
  .pipe(new UserValidateTransform())
  .pipe(writeStream)
  .on('finish', () => {
    console.log('record finish')
  })
