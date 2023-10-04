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

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Thu", "Wed", "Thi", "Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <ul class="weekcast">
              <li class="forecast-day">${day}</li>
              <li class="forecast-data">21/08</li>
              <li>
                <img
                  src="https://openweathermap.org/img/wn/02d.png"
                  alt=""
                  class="forecast-icon"
                />
              </li>
              <li>
                <span class="forecast-temperature-max"> 34°</span
                ><span class="forecast-temperature-min">18°</span>
              </li>
            </ul>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  showCelsiusTemp.classList.remove("active");
  showFarenheitTemp.classList.add("active");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemp);
}
function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  showFarenheitTemp.classList.remove("active");
  showCelsiusTemp.classList.add("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getLocation);

let searchingForm = document.querySelector("#search-city");
searchingForm.addEventListener("submit", showCity);

let showTime = document.querySelector("#curent-time");
showTime.innerHTML = formatDate();

let celsiusTemp = null;

let showFarenheitTemp = document.querySelector("#farenheit-temp");
showFarenheitTemp.addEventListener("click", convertToFarenheit);

let showCelsiusTemp = document.querySelector("#celsius-temp");
showCelsiusTemp.addEventListener("click", convertToCelsius);

searchCity("Kharkiv");
showForecast();
