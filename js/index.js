let container = document.querySelector(`.albums`);


for (let i = 0; i < albums.length; i++) {
    let album = albums[i];
    container.innerHTML += 
    `<div class="col">
        <a href="album.html?i=${i}" style="text-decoration: none" alt="albums">
            <div class="card">
                <img src="${album.img}" alt="" class="card-image-top">
                <div class="cart-body">
                    <p class="card-text">${album.title}</p>
                </div>
            </div>
        </a>
    </div>`
}