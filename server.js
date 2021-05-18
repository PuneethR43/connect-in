const express = require('express')
const configureDB = require('./config/database')
// const router = require('./routes/api/routes')
const app = express()
configureDB()

app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to Express Server'))
// app.use(router)
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server running on ${PORT}`))