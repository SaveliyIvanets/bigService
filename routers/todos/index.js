const express = require('express')
const router = express.Router()
const asyncHandler = require('../../libraries/asyncHandler')
router.post('/reg', asyncHandler(require('./auth/register')))
router.post('/auth', asyncHandler(require('./auth/login')))
router.use(require('../../middleware/authMiddleware'))
router.get(
  '/admin',
  require('../../middleware/ensureAdminMiddleware'),
  asyncHandler(require('../todos/admin/users'))
)
router.delete(
  '/admin/:id',
  asyncHandler(require('../../middleware/ensureAdminMiddleware')),
  asyncHandler(require('../todos/admin/delete'))
)
router.post('/', asyncHandler(require('./create')))
router.put(
  '/:id',
  asyncHandler(require('../../middleware/ensureOwnerMiddleware')),
  asyncHandler(require('./update'))
)
router.patch(
  '/:id',
  asyncHandler(require('../../middleware/ensureOwnerMiddleware')),
  asyncHandler(require('./update'))
)
router.delete(
  '/:id',
  asyncHandler(require('../../middleware/ensureOwnerMiddleware')),
  asyncHandler(require('./delete'))
)
router.get(
  '/',
  asyncHandler(require('../../middleware/ensureAdminMiddleware')),
  asyncHandler(require('./tasks'))
)
router.get(
  '/:id',
  asyncHandler(require('../../middleware/ensureOwnerMiddleware')),
  asyncHandler(require('./show'))
)
router.use(require('../../middleware/errorMiddleware'))
module.exports = router
