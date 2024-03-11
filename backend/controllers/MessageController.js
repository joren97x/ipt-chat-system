const { Message } = require('../models')

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



module.exports = {
    sendMessage
}