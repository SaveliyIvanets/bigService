const winston = require('winston')
const { v4: uuidv4 } = require('uuid')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/api-combined.log',
    }),
  ],
})

const requestLogger = (req, res, next) => {
  const requestId = uuidv4()
  req.requestId = requestId
  logger.info('Incoming request', {
    requestId,
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  })

  next()
}

module.exports = { logger, requestLogger }
