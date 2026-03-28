const express = require('express')
const path = require('path')
const app = express()
const products = require('./data')

// middleware
app.use(express.json())

// server static files
// app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/api/products', (req, res) => {
    res.status(200).json({success:true, data: products})
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})