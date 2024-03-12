const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares/verifyToken')
const groupChatController = require('../controllers/GroupChatController.js')
const messageController = require('../controllers/MessageController.js')

router.post('/create-group-chat', verifyToken, groupChatController.createGroupChat)
router.post('/invite', verifyToken, groupChatController.invite)
router.post('/send-message-group-chat', verifyToken, messageController.sendGroupMessage)
router.post('/send-message', verifyToken, messageController.sendMessage)
router.get('/messages/:id', verifyToken, messageController.index)

module.exports = router