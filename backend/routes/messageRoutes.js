const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares/verifyToken')
const groupMessageController = require('../controllers/GroupMessageController.js')
const messageController = require('../controllers/MessageController.js')

router.post('/create-group-chat', verifyToken, groupMessageController.createGroupChat)
router.post('/invite', verifyToken, groupMessageController.invite)
router.post('/send-message-group-chat', verifyToken, groupMessageController.sendGroupMessage)
router.post('/send-message', verifyToken, messageController.sendMessage)
router.get('/messages', verifyToken, messageController.index)

module.exports = router