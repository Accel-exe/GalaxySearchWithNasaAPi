// Image Day
const imageDay = async () => {
    const imgDayCont = document.querySelector('#imgDayCont');
    const loading = document.createElement('div');
    loading.classList.add('loading');
    imgDayCont.appendChild(loading);

    const imgDayCopright = document.querySelector('#imgDayCopright');
    const imgDayDate = document.querySelector('#imgDayDate');
    const imgDayName = document.querySelector('#imgDayName');
    const imgDayTitle = document.querySelector('#imgDayTitle');
    const imgDayExplanation = document.querySelector('#imgDayExplanation');
    const imgDayMedia = document.querySelector('#imgDayMedia');

    const url = "https://api.nasa.gov/planetary/apod?api_key=6TlcJaSvx4mNYluxGaTvPg7HVDiaMqI51Cv5lPu5";
    const response = await fetch(url);
    const data = await response.json();

    loading.remove();

    if (data['media_type'] === 'image') {
        const img = document.createElement('img');
        img.setAttribute('src', data.hdurl);
        imgDayMedia.prepend(img);
    } else if (data['media_type'] === 'video') {
        const video = document.createElement('video');
        video.setAttribute('controls');
        video.innerHTML =
            `
        <source src="${data.hdurl}" type="video/mp4">
        `
        imgDayMedia.prepend(video);
    }

    imgDayCopright.innerHTML = `Copyright: ${data.copyright}`;
    imgDayDate.innerHTML = `Data: ${data.date}`;
    imgDayName.innerHTML = data.title;
    imgDayExplanation.innerHTML = data.explanation;
    imgDayTitle.innerHTML = data.title;
}

imageDay();

// Library
const nasaLibrary = async (search) => {
    const form = document.querySelector('#form');
    form.remove();

    const footer = document.querySelector('#footer')
    const btnSearch = document.createElement('button');
    btnSearch.classList.add('btnSearch')
    btnSearch.id = 'btnPrev'
    btnSearch.innerHTML = 'VOLTAR';
    btnSearch.addEventListener('click', searchHud);
    footer.appendChild(btnSearch);

    const container = document.querySelector('#container');
    const loading = document.createElement('div');
    loading.classList.add('loadingLibrary');
    container.appendChild(loading);

    const url = `https://images-api.nasa.gov/search?q=${search}`
    const response = await fetch(url);
    const data = await response.json();
    const libraryArray = data['collection']['items'];
    loading.remove();

    libraryArray.map((el) => {
        if (el['links'][0]['render'] === 'image') {
            const cards = document.createElement('div');
            cards.classList.add('cards');
            cards.innerHTML =
                `
                <img src="${el.links[0]['href']}" alt="">
                <span id="cardsTitle">${el.data[0]['title']}</span>
            `
            container.appendChild(cards);
        } else if (el['links'][0]['render'] === 'video') {
            const cards = document.createElement('div');
            cards.classList.add('cards');
            cards.innerHTML =
                `
                <video controls>
                <source src="${el.links[0]['href']}" type="video/mp4">
                </video>
                <span id="cardsTitle">${el.data[0]['title']}</span>
            `
            container.appendChild(cards);
        }
    })
}

const searchBtn = () => {
    const input = document.querySelector('#search');

    if (!input.value == '') {
        nasaLibrary(input.value);
    }
}

const searchHud = () => {
    const container = document.querySelector('#container');
    container.innerHTML = "";
    container.innerHTML =
        `
        <div id="form" class="form">
                <h2>Bliblioteca da NASA</h2>
                <label for="search">Pesquise sobre a Galaxia</label>
                <input id="search" type="text" placeholder="Digite em english" form="search">
                <button id="btnSearch" type="button" class="fromBtn">Pesquisar</button>
        </div>
    `
    const btnSearch = document.querySelector('#btnSearch');
    btnSearch.addEventListener('click', searchBtn);
    const btnPrev = document.querySelector('#btnPrev');
    btnPrev.remove();
};

const btnSearch = document.querySelector('#btnSearch');
btnSearch.addEventListener('click', searchBtn);


