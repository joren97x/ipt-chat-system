const { Message } = require('../models')
const { Op } = require('sequelize')

const sendMessage = async (req, res) => {
    const { sender_id, receiver_id, content } = req.body

    try {
        await Message.create({ sender_id, receiver_id, content, is_read: 0 }).then(() => {
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
const index = async (req, res) => {
    const { user_id } = req.body;
    
    try {
        // Find all 1:1 messages where the user is either the sender or the receiver
        const oneToOneMessages = await Message.findAll({ 
            where: {
                [Op.and]: [
                    { [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }] }, // User is sender or receiver
                    { receiver_id: { [Op.ne]: null } } // Receiver ID is not null (indicating 1:1 message)
                ]
            }
        });

        // Find all group chat messages where the user is a member of the group
        const groupChatMessages = await Message.findAll({ 
            where: {
                [Op.and]: [
                    { sender_id: user_id }, // User is the sender
                    { receiver_id: null } // Receiver ID is null (indicating group chat message)
                ]
            }
        });

        return res.json({ oneToOneMessages, groupChatMessages });
    } catch(err) {
        console.error('Error retrieving messages:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    sendMessage,
    index
}