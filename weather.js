const weatherDiv = document.querySelector(".js-weather");
const weather = weatherDiv.querySelector("span");
const API_KEY = "06ec9d2b123353e193c0075134100f36";
const COORDS = "coords";

function getWeather(lng, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  //사용자가 위치허용 승락 했을 때
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(longitude, latitude);
}

function handleGeoError() {
  //사용자가 위치허용 거부 했을 때
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); //현재 위치 정보를 가져온다.
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.longitude, parsedCoords.latitude);
  }
}

function init() {
  loadCoords();
}

init();
