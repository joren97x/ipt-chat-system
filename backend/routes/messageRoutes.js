const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares/verifyToken')
const messageController = require('../controllers/MessageController.js')

router.post('/create-group-chat', verifyToken, messageController.createGroupChat)

module.exports = router