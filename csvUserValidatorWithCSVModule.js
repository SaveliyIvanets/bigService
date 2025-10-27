const fs = require('fs')
const { parse, transform, stringify } = require('csv')

const readStream = fs.createReadStream('huge_users.csv', 'utf8')
const writeStream = fs.createWriteStream('clean_users.csv')
let total = 0
let invalid = 0

readStream
  .pipe(parse({ columns: true }))
  .pipe(
    transform((record) => {
      total++
      record.first_name = record.first_name.toUpperCase()
      record.last_name = record.last_name.toUpperCase()
      const emailValid =
        record.email.includes('@') &&
        ['com', 'ru', 'net'].includes(record.email.split('.').pop())
      if (emailValid) {
        return record
      } else {
        invalid++
      }
    })
  )
  .pipe(stringify({ header: true }))
  .pipe(writeStream)
  .on('finish', () => {
    console.log(`Обработка завершена`)
    console.log(`Всего строк: ${total}`)
    console.log(`Пропущено (некорректных email): ${invalid}`)
  })
