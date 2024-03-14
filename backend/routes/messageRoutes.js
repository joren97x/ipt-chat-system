const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../middlewares/verifyToken')
const groupChatController = require('../controllers/GroupChatController.js')
const messageController = require('../controllers/MessageController.js')

router.post('/create-group-chat', verifyToken, groupChatController.createGroupChat)
router.post('/invite', verifyToken, groupChatController.invite)
router.post('/send-message', verifyToken, messageController.sendMessage)
router.get('/messages/:id', verifyToken, messageController.index)
router.get('/messages2/:id', verifyToken, messageController.index2)

module.exports = router