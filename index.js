async function loadImages() {
    const res = await fetch('http://localhost:5000/api/images')
    const data = await res.json()

    const gallery = document.getElementById('gallery')
    gallery.innerHTML = ''

    data.data.forEach(image => {
        const container = document.createElement('div')

        const img = document.createElement('img')
        img.src = image.url
        img.style.width = '200px'
        img.style.display = 'block'
        img.style.marginTop = '10px'

        const btn = document.createElement('button')
        btn.textContent = 'Delete'
        btn.style.display = 'block'
        btn.style.marginTop = '5px'

        btn.onclick = () => deleteImage(image.id)

        container.appendChild(img)
        container.appendChild(btn)

        gallery.appendChild(container)
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

async function deleteImage(id) {
    const res = await fetch(`http://localhost:5000/api/images/${id}`, {
        method: 'DELETE'
    })

    const data = await res.json()
    console.log(data)

    loadImages()
}