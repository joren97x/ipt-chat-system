const express = require('express')
require('dotenv').config();
const app = express()
app.use(express.json())
const authRoutes = require('./routes/authRoutes.js')

app.use('/api/', authRoutes)

app.listen(3001, () => {
    console.log(`Server listening at post 3001`)
})