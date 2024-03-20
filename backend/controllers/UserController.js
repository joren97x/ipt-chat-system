const { User } = require('../models')

const index = async (req, res) => {
    const {user_id} = req.params.id
    try {
        const users = await User.findAll()
        return res.json({ users })
    }
    catch(err) {
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    index
}