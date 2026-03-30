async function loadImages() {
    const res = await fetch('http://localhost:5000/api/images')
    const data = await res.json()

    const gallery = document.getElementById('gallery')
    gallery.innerHTML = ''

    data.data.forEach(image => {
        const container = document.createElement('div')
        container.classList.add('gallery-item')

        const img = document.createElement('img')
        img.src = image.url
        // img.style.display = 'block'

        const btn = document.createElement('button')
        btn.textContent = 'Delete'

        btn.onclick = () => deleteImage(image.id)

        const editBtn = document.createElement('button')
        editBtn.textContent = 'Edit'
        editBtn.onclick = () => editImage(image.id)

        container.appendChild(img)
        container.appendChild(btn)
        container.appendChild(editBtn)

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

async function editImage(id) {
    const newUrl = prompt('Enter new image URL:')

    if (!newUrl) return
    
    const res = await fetch(`http://localhost:5000/api/images/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: newUrl })
    })

    const data = await res.json()
    console.log(data)

    loadImages()
}