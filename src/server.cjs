const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.get('/users', (req, res) => {
    res.send('Get users')
})

app.listen(3001)
console.log(`Server on port ${3001}`)