const weather = document.querySelector(".js-weather");
const API_KEY = "abc";
const COORDS = 'coords';

function getWeather(lat, long) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`
        })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    console.log(coordsObj);
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can not access.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);

    if (loadedCords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
