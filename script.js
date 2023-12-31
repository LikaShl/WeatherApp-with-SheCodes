function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekday = date.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[weekday];
}
function formatData(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let monthes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let future = `${day}/${monthes[month]}`;
  return future;
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <ul class="weekcast">
              <li class="forecast-day">${formatDay(forecastDay.dt)}</li>
              <li class="forecast-data">${formatData(forecastDay.dt)}</li>
              <li>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }.png"
                  alt="${forecastDay.weather[0].description}"
                  class="forecast-icon"
                />
              </li>
              <li>
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span
                >/<span class="forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </li>
            </ul>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=5f472b7acba333cd8a035ea85a0d4d4c`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let currentPlace = document.querySelector("#new-city");
  let currentTemp = document.querySelector("#current-temp");
  let currentWeather = document.querySelector("#current-weather");
  let iconWeather = document.querySelector("#icon-weather");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let wind = Math.round(response.data.wind.speed);

  celsiusTemp = response.data.main.temp;

  currentPlace.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(celsiusTemp);
  currentWeather.innerHTML = response.data.weather[0].description;
  iconWeather.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconWeather.setAttribute("alt", response.data.weather[0].description);
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  currentWindSpeed.innerHTML = `Wind speed: ${wind} m/sec`;

  getForecast(response.data.coord);
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

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f472b7acba333cd8a035ea85a0d4d4c&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input").value;
  searchCity(cityInput);
}

function formatDate() {
  let now = new Date();
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

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

let searchingForm = document.querySelector("#search-city");
searchingForm.addEventListener("submit", showCity);

let showTime = document.querySelector("#curent-time");
showTime.innerHTML = formatDate();

searchCity("Kharkiv");
