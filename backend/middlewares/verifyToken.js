const jwt = require('jsonwebtoken')

module.exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) {
        return res.status(403).json({ message: "Token not provided" })
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(403).json({ message: "Invalid token" })
        }
        req.user = decoded
        next()
    })

}
