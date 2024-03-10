const { User }  = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        const { username, name, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ username, name, password: hashedPassword })
        .then((result) => {
            res.status(201).json({ message: "Registered successfully", result })
        })
        .catch((err) => {
            res.json({error: err})
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: "Server error", error: err })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({where: { username } })
        
        if(!user || !await bcrypt.compare(password, user.password)) {
            return res.status(404).json({ message: "Invalid credentials" })
        }

        try {
            const token = jwt.sign({user}, process.env.TOKEN_SECRET_KEY)
            return res.status(200).json({ user: user, token })
        }
        catch(err) {
            return res.status(500).json({error: err})
        }
    }
    catch(err) {
        res.status(500).json({ message: "Server error", error: err })
    }
}

const logout = async (req, res) => {
    res.json({
        users: await User.findAll()
    })
}

module.exports = {
    register,
    login,
    logout
}
