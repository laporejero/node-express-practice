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