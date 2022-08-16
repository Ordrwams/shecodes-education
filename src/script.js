// Change name of the city

function typeName() {
  let inputNameOfCity = document.querySelector("#nameOfCity");
  let nameCity = document.querySelector("#cityName");
  nameCity.innerHTML = inputNameOfCity.value;
  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputNameOfCity.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let formNameOfCity = document.querySelector("#form-name-of-city");
formNameOfCity.addEventListener("submit", typeName);

formNameOfCity.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("buttonSearch").click();
  }
});

let buttonSearchCity = document.querySelector("#buttonSearch");
if (buttonSearchCity) {
  buttonSearchCity.addEventListener("click", () => {
    console.log(" buttonSearchCity clicked");
  });
}

buttonSearchCity.addEventListener("click", typeName);

let weekDays = document.querySelector("#weekDays");
let fullDate = document.querySelector("#fullDate");
let time = document.querySelector("#time");

let day = null;
let month = null;
let minute = null;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else {
    day = date.getDate();
  }
  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
    console.log(month);
  } else {
    month = date.getMonth() + 1;
    console.log(month);
  }
  let year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDay(timestamp) {
  let date = new Date(timestamp);
  return Days[date.getDay()];
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  if (date.getMinutes() < 10) {
    minute = `0${date.getMinutes()}`;
  } else {
    minute = date.getMinutes();
  }
  return `${date.getHours()} : ${minute}`;
}

let tempCur = null; //temparature in current location
let nameCur = null; // city in current location
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let description = document.querySelector(".description");
let temp = document.querySelector(".valueOfTemp");
let nameCity = document.querySelector("#cityName");
let iconWeather = document.querySelector("#icon-weather");
let humidityValue = null;
let windValue = null;
let descriptionValue = null;
let iconValue = null;

//City in search
function showTemp(response) {
  console.log(response.data);
  temp.innerHTML = Math.round(response.data.main.temp);
  temeratureC = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  fullDate.innerHTML = formatDate(response.data.dt * 1000);
  weekDays.innerHTML = formatDay(response.data.dt * 1000);
  time.innerHTML = formatTime(response.data.dt * 1000);
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecastInput(response.data.coord);
}

function nowTemp(response) {
  nameCur = response.data.name;
  tempCur = Math.round(response.data.main.temp);
  humidityValue = response.data.main.humidity;
  windValue = Math.round(response.data.wind.speed);
  iconValue = response.data.weather[0].icon;
  descriptionValue = response.data.weather[0].description;

  clickBut();
}

function clickBut() {
  temp.innerHTML = tempCur;
  nameCity.innerHTML = nameCur;
  humidity.innerHTML = humidityValue;
  wind.innerHTML = windValue;
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconValue}@2x.png`
  );
  description.innerHTML = descriptionValue;
}

function showPosition(position) {
  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(nowTemp);

  getForecast(position.coords);
}

let latitude = null;
let longitude = null;

function getForecastInput(coordinates) {
  latitude = coordinates.lat;
  longitude = coordinates.lon;

  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getForecast(coordinates) {
  latitude = coordinates.latitude;
  longitude = coordinates.longitude;

  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[day.getDay()];
}

function displayForecast(response) {
  forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row cardsWeather">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2"> 
        <div class="card weatherCard"> 
          <div class="card-body"> 
            <h5 class="card-title dayOfWeekCard"> ${formatForecastDay(
              forecastDay.dt
            )} </h5>
            <div class="emojiCard">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="icon"
              class = "forecastIcon"
            /></div>
            <p class="card-text temperatureCard forecastTempMax"> ${Math.round(
              forecastDay.temp.min
            )}° <span class = "forecastTempMin">  ${Math.round(
          forecastDay.temp.max
        )}° </span></p>
          </div>
         </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let tempF = document.querySelector(".degreeF");
let tempC = document.querySelector(".degreeC");

function ctoF() {
  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);

  F = temp.textContent * (9 / 5) + 32;
  temp.innerHTML = Math.round(F);
  tempF.innerHTML = "";
  tempC.innerHTML = "C";
}

function ftoC() {
  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  C = ((temp.textContent - 32) * 5) / 9;
  temp.innerHTML = Math.round(C);
  tempF.innerHTML = "F";
  tempC.innerHTML = "";
}

let degreeF = document.querySelector(".degreeF");
degreeF.addEventListener("click", ctoF);

let degreeC = document.querySelector(".degreeC");
degreeC.addEventListener("click", ftoC);

let buttonCurrent = document.querySelector("#buttonCurrentLocation");
buttonCurrent.addEventListener("click", clickBut);

navigator.geolocation.getCurrentPosition(showPosition);
//showPosition();
