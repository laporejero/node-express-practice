async function loadImages() {
    const res = await fetch('http://localhost:5000/api/images')
    const data = await res.json()

    console.log(data)

    const gallery = document.getElementById('gallery')
    gallery.innerHTML = ''

    data.data.forEach(image => {
        const img = document.createElement('img')
        img.src = image.url
        img.style.width = '200px'
        img.style.margin = '10px'

        gallery.appendChild(img)
    });
}

async function addImage() {
    const id = document.getElementById('imageId').value
    const url = document.getElementById('imageUrl').value

    if (!id || !url) {
        alert('Please fill all fields')
        return
    }

    const res = await fetch('http://localhost:5000/api/images', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, url })
    })

    const data = await res.json()
    console.log(data)

    loadImages() // refresh gallery
}