const { Router } = require('express')
const router = Router()
const authController = require('../controllers/AuthController.js')
const { verifyToken } = require('../middlewares/verifyToken')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/logout', verifyToken, authController.logout)

module.exports = router