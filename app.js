const express = require('express')
const path = require('path')
const app = express()
const {products, images} = require('./data')

// middleware
app.use(express.json())

// server static files
app.use('/images', express.static(path.join(__dirname, 'images')))
// http://localhost:5000/index.html
app.use(express.static(path.join(__dirname)))

// fetch all images array
app.get('/api/images', (req, res) => {
    res.status(200).json({
        success:true, 
        data: images
    })
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

// add new data
app.post('/api/images', (req, res) => {
    const { id, url } = req.body

    // basic validation
    if (!id || !url) {
        return res.status(400).json({
            success: false,
            message: 'Please provide id and url'
        })
    }

    // check if image already exists
    const exists = images.find(img => img.id === Number(id))
    if (exists) {
        return res.status(409).json({
            success: false,
            message: 'Image with this ID already exists'
        })
    }

    const newImage = {
        id: Number(id),
        url: url
    }

    images.push(newImage)

    res.status(201).json({
        success: true,
        data: newImage
    })
})

// delete an existing data
app.delete('/api/images/:id', (req, res) => {
    const { id } = req.params

    const imageIndex = images.findIndex(img => img.id === Number(id))

    if (imageIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Image not found'
        })
    }

    const deleteImage = images.splice(imageIndex, 1)

    res.status(200).json({
        success: true,
        data: deleteImage[0]
    })
})

// PUT route
// https://picsum.photos/200
app.put('/api/images/:id', (req, res) => {
    const { id } = req.params
    const { url } = req.body
    
    // validate input
    if (!url) {
        return res.status(400).json({
            success: false,
            message: 'Please provide URL'
        })
    }

    const image = images.find(img => img.id === Number(id))

    if (!image) {
        res.status(404).json({
            success: false,
            message: 'Image not found'
        })
    }

    // update the image
    image.url = url

    res.status(200).json({
        success: true,
        data: image
    })
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})