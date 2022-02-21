const router = require('express').Router()

const mainController = require('../controllers/mainController')
const auth = require('../middleware/auth')

router.get('/home', auth, mainController.home)

module.exports = router
