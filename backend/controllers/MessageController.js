const { Conversation } = require('../models')
const { Participant } = require('../models')

const sendGroupMessage = (req, res) => {

}

const createGroupChat = async (req, res) => {
    
    const { user_id, name } = req.body

    try {
        await Conversation.create({name}).then(async (result) => {
            await Participant.create({ conversation_id: result.id, user_id, is_admin: true }).then(() => {
                return res.status(201).json({ message: "Group chat created successfully" })
            })
            .catch((err) => {
                return res.status(500).json({ error: err })
            })
            
        })
        .catch((err) => {
            return res.status(500).json({ message: "Server error", err })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    createGroupChat
}