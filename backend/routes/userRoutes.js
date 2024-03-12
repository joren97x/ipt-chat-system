const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares/verifyToken') 
const userController = require('../controllers/UserController')

router.get('/users', userController.index)

module.exports = router