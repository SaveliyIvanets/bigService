const fs = require('fs')
const { Transform } = require('stream')

const readStream = fs.createReadStream('huge_users.csv', 'utf8')
const writeStream = fs.createWriteStream('clean_users.csv')
const jsonToString = (obj) => {
  return Object.values(obj)
    .filter((v) => v !== undefined)
    .join(',')
}
class UserValidateTransform extends Transform {
  constructor() {
    super()
    this.remainingData = ''
    this.total = 0
    this.invalid = 0
  }

  _transform(chunk, encoding, callback) {
    let data = this.remainingData + chunk.toString()

    const lines = data.split('\n')
    this.remainingData = lines.pop()

    const validateUserArray = []
    for (const line of lines) {
      this.total++
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
        this.invalid++
        continue
      }
      validateUserArray.push(jsonToString(userObj))
    }

    callback(null, validateUserArray.join('\r\n') + '\n')
  }
  _flush(callback) {
    console.log(`Обработка завершена`)
    console.log(`Всего строк: ${this.total}`)
    console.log(`Пропущено (некорректных email): ${this.invalid}`)
    callback()
  }
}

readStream
  .pipe(new UserValidateTransform())
  .pipe(writeStream)
  .on('finish', () => {})
