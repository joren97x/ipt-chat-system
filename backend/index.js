const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())
const authRoutes = require('./routes/authRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

app.use('/api/', authRoutes)
app.use('/api/', messageRoutes)
app.use('/api/', userRoutes)

app.listen(3001, () => {
    console.log(`Server listening at post 3001`)
})