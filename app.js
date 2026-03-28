const express = require('express')
const path = require('path')
const app = express()
const {products, images} = require('./data')

// middleware
app.use(express.json())

// server static files
app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/api/products', (req, res) => {
    res.status(200).json({success:true, data: products})
})

// fetch a single data
app.get('/api/images/:id', (req, res) => {
    const { id } = req.params
    const image = images.find(img => img.id === Number(id))

    if (!image) {
        return res
            .status(404)
            .json({
                success: false,
                message: 'Image not found'
            })
    }

    res.status(200).json({
        success: true,
        data: image
    })
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})