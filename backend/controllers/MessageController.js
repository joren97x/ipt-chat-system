const { Message } = require('../models')
const { Op } = require('sequelize')

const sendMessage = async (req, res) => {
    const { conversation_id, sender_id, receiver_id, content } = req.body

    try {
        await Message.create({ conversation_id, sender_id, receiver_id, content, is_read: 0 }).then(() => {
            return res.status(201).json({ message: "Message sent successfully" })
        })
        .catch((error) => {
            return res.status(500).json({ error })
        })
    }
    catch(err) {
        return res.status(500).json({ err })
    }

}

const sendGroupMessage = async (req, res) => {
    const { conversation_id, sender_id, content } = req.body

    try {
        await Message.create({ conversation_id, sender_id, content, is_read: 0 }).then(() => {
            return res.status(201).json({ message: "Group chat message sent successfully" })
        })
        .catch((error) => {
            return res.status(500).json({ error })
        })
    }
    catch(err) {
        return res.status(500).json({ err })
    }

}

const index = async (req, res) => {
    const { user_id } = req.body;
    
    try {
           // Find all messages where the user is either the sender or the receiver
           const messages = await Message.findAll({ 
            where: {
                [Op.or]: [
                    { sender_id: user_id },
                    { receiver_id: user_id }
                ]
            },
            order: [['conversation_id', 'ASC'], ['createdAt', 'ASC']] // Order by conversation_id and createdAt
        })

        // Group messages by conversation ID and type
        const groupedMessages = { group: {}, individual: {} }
        messages.forEach(message => {
            if (message.receiver_id === null) {
                // Group message
                if (!groupedMessages.group[message.conversation_id]) {
                    groupedMessages.group[message.conversation_id] = [message]
                } else {
                    groupedMessages.group[message.conversation_id].push(message)
                }
            } else {
                // 1:1 message
                if (!groupedMessages.individual[message.conversation_id]) {
                    groupedMessages.individual[message.conversation_id] = [message]
                } else {
                    groupedMessages.individual[message.conversation_id].push(message)
                }
            }
        })

        return res.json({ groupedMessages });
    } catch(err) {
        console.error('Error retrieving messages:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    sendMessage,
    sendGroupMessage,
    index
}