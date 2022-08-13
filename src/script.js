// Change name of the city
function typeName() {
  let inputNameOfCity = document.querySelector("#nameOfCity");
  let nameCity = document.querySelector("#cityName");
  nameCity.innerHTML = inputNameOfCity.value;
  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputNameOfCity.value}&units=metric`;
  //console.log(inputNameOfCity.value);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let formNameOfCity = document.querySelector("#form-name-of-city");
formNameOfCity.addEventListener("submit", typeName);

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

//F -> C
let F = null;
let C = null;
let count = true;
function ctoF() {
  if (count === true) {
    let temp = document.querySelector(".valueOfTemp");
    F = temp.textContent * (9 / 5) + 32;
    temp.innerHTML = Math.round(F);
    count = false;
  } else {
  }
}
function ctoC() {
  if (count === false) {
    let temp = document.querySelector(".valueOfTemp");
    console.log(temp.textContent);
    C = ((temp.textContent - 32) * 5) / 9;
    console.log(C);
    temp.innerHTML = Math.round(C);
    count = true;
  } else {
  }
}

/*function degreeF() {
  let temp = document.querySelector(".valueOfTemp");
  F = temeratureElement * (9 / 5) + 32;
  temp.innerHTML = Math.round(F);
}
function degreeC() {
  let temp = document.querySelector(".valueOfTemp");
  C = ((temeratureElement - 32) * 5) / 9;
  temp.innerHTML = Math.round(C);
}


let temeratureElement = 0;*/
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
}

function nowTemp(response) {
  nameCur = response.data.name;
  tempCur = Math.round(response.data.main.temp);
  humidityValue = response.data.main.humidity;
  windValue = Math.round(response.data.wind.speed);
  iconValue = response.data.weather[0].icon;
  descriptionValue = response.data.weather[0].description;
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
  console.log("Show Position!");
}

let degreeF = document.querySelector(".degreeF");
degreeF.addEventListener("click", ctoF);

let degreeC = document.querySelector(".degreeC");
degreeC.addEventListener("click", ctoC);

let buttonCurrent = document.querySelector("#buttonCurrentLocation");
buttonCurrent.addEventListener("click", clickBut);
navigator.geolocation.getCurrentPosition(showPosition);

showPosition();
