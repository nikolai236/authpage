const router = require('express').Router()

const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

router.get('/', userController.checkAuth)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', auth, userController.logout)

module.exports = router
