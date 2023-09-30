function showWeather(response) {
  let currentPlace = document.querySelector("#new-city");
  currentPlace.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = response.data.weather[0].description;
  let iconWeather = document.querySelector("#icon-weather");
  iconWeather.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let currentWindSpeed = document.querySelector("#wind-speed");
  let wind = Math.round(response.data.wind.speed);
  currentWindSpeed.innerHTML = `Wind speed: ${wind} m/sec`;
}

function findPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5f472b7acba333cd8a035ea85a0d4d4c`;
  axios.get(url).then(showWeather);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f472b7acba333cd8a035ea85a0d4d4c&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input").value;
  searchCity(cityInput);
}

let searchingForm = document.querySelector("#search-city");
searchingForm.addEventListener("submit", showCity);

let now = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    hour = `0${minute}`;
  }
  let today = `Last updated: ${day}, ${hour}:${minute}`;
  return today;
}

let showTime = document.querySelector("#curent-time");
showTime.innerHTML = formatDate();

searchCity("Kharkiv");
