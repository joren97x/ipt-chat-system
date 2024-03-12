const { Conversation } = require('../models')
const { Participant } = require('../models')

const invite = async (req, res) => {

    const { conversation_id, user_id, is_admin } = req.body

    try {
        await Participant.create({ conversation_id, user_id, is_admin }).then(() => {
            return res.status(201).json({ message: "Invite successful" })
        })
        .catch((error) => {
            return res.status(500).json({ error })
        })
    }
    catch(err) {
        return res.status(500).json({ err })
    }

}

const createGroupChat = async (req, res) => {
    
    const { user_id, name } = req.body

    try {
        await Conversation.create({name}).then(async (result) => {
            await Participant.create({ conversation_id: result.id, user_id, is_admin: 1 }).then(() => {
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
    createGroupChat,
    invite
}