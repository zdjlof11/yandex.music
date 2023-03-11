let container = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);

let album = albums[i];

if (!album) {
    renderError()
} else {
    renderAlbum()
    renderTracks()
    setupAudio();
    
}


function renderError(){
    container.innerHTML = `ОШИБКА`;
    window.location.pathname = `index.html`
    setTimeout()
}
function renderAlbum(){
    container.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${album.img}" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="cart-title">${album.title}</h5>
                        <p class="card-text">${album.description}</p>
                        <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></p>
                    </div>
                </div>
            </div>
        </div>`
}
function renderTracks(){
    let playlsit = document.querySelector(`.playlist`);
    let tracks = album.tracks;

    for (let j = 0; j < tracks.length; j++) {
        let track = tracks[j];
        playlsit.innerHTML +=
        `<li class="track list-group-item d-flex align-items-center">
            <img src="assets/play-button_318-409368.avif" alt="" class="me-3 img-play" height="30px">
            <img src="assets/pause.png" alt="" class="me-3 img-pause d-none" height="30px">
            <div>
                <div>${track.title}</div>
                <div class="text-secondary">${track.author}</div>
            </div>
            <div class="progress ms-2" style="width: 400px">
                <div class="progress-bar" role="progressbar" style="width: 0%"></div>
            </div>
            <div class="time ms-auto">${track.time}</div>
            <audio class="audio" src="${track.src}"></audio>
        </li>`
    }
}

function setupAudio() {
    // Найди коллекцию с треками
    let tracks = album.tracks;
    let trackNodes = document.querySelectorAll(`.track`);
    for (let i = 0; i < trackNodes.length; i++) {
        // Один элемент
        let track = tracks[i];
        let node = trackNodes[i];
        let timeNode = node.querySelector(`.time`)
        let imgPause = node.querySelector(`.img-pause`);
        let imgPlay = node.querySelector(`.img-play`)
        let progressBar = node.querySelector(`.progress-bar`)
        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`);
        let isPlaying = track.isPlaying;
        node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (isPlaying) {
                isPlaying = false;
                // Поставить на паузу
                audio.pause();
                imgPause.classList.add(`d-none`);
                imgPlay.classList.remove(`d-none`);

                // Если трек сейчас не играет...
            } else {
                isPlaying = true;
                // Включить проигрывание
                audio.play();
                imgPause.classList.remove(`d-none`);
                imgPlay.classList.add(`d-none`);
                updateProgress()
            }
        });
        function updateProgress() {
            let time = getTime(audio.currentTime);
            if (timeNode.innerHTML != time) {
                timeNode.innerHTML = time;
                progressBar.style.width = audio.currentTime * 100 / audio.duration + `%`;
            }
            // Нужно ли вызвать её ещё раз?
            if(isPlaying){
                requestAnimationFrame(updateProgress);
            }
           
        }

        // продолжи самостоятельно
    }
}

function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    if (minutes < 10) {
        minutes = `0` + minutes;
    }
    if (seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`
}


