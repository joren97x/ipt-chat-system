const { Message, User } = require('../models')
const { Op } = require('sequelize')
const Sequelize = require('sequelize');

const sendMessage = async (req, res) => {
    const { conversation_id, sender_id, content } = req.body

    try {
        await Message.create({ conversation_id, sender_id, content, is_read: 0 }).then(() => {
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
    const user_id = req.params.id
    try {
           // Find all messages where the user is either the sender or the receiver
           const messages = await Message.findAll({ 
            where: {
                sender_id: user_id
            },
        })
        const conversationIds = [...new Set(messages.map(message => message.conversation_id))];
        const groupedMessages = {};
        for (const id of conversationIds) {
            // Find all messages with the current conversation ID
            const messagesInConversation = await Message.findAll({
                where: {
                    conversation_id: id
                },
                include: {
                    model: User,
                    as: 'sender',
                    attributes: ['name']
                }
            });
            // Store the messages in the groupedMessages object
            groupedMessages[id] = messagesInConversation;
        }
        return res.json({ groupedMessages });
        
    } catch(err) {
        console.error('Error retrieving messages:', err);
        return res.status(500).json({ error: 'Internal server error', err });
    }
}

const index2 = async (req, res) => {
    const { id: user_id } = req.params;

    try {
        // Find the last message sent in each conversation where the user is either the sender or receiver
        const latestMessages = await Message.findAll({ 
            attributes: ['conversation_id', [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'latest_message_time']],
            where: {
                sender_id: user_id 
            },
            group: ['conversation_id']
        });

        // Extract conversation_ids from the latestMessages result
        const conversationIds = latestMessages.map(message => message.conversation_id);

        // Find the actual messages based on the conversation_ids and latest_message_time
        const messages = await Message.findAll({
            where: {
                [Op.and]: [
                    { conversation_id: conversationIds },
                    Sequelize.literal('createdAt IN (SELECT MAX(createdAt) FROM messages GROUP BY conversation_id)')
                ]
            }
        });

        // Return the last message in each conversation along with its conversation_id
        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    sendMessage,
    index,
    index2
}