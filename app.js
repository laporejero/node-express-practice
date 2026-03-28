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

// fetch a single data
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params
    const product = products.find(product => product.id === Number(id))

    if (!product) {
        return res
            .status(404)
            .json({
                success: false,
                message: 'Product not found'
            })
    }

    res.status(200).json({
        success: true,
        data: product
    })
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})