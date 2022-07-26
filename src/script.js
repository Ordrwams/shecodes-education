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

// Date + time
let now = new Date();
let Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDays = document.querySelector("#weekDays");
weekDays.innerHTML = Days[now.getDay()];
let day = 0;
let month = 0;
let minute = 0;
if (now.getDate() < 10) {
  day = `0${now.getDate()}`;
} else {
  day = now.getDate();
}
if (now.getMonth() + 1 < 10) {
  month = `0${now.getMonth() + 1}`;
} else {
  month = now.getMonth() + 1;
}
if (now.getMinutes() < 10) {
  minute = `0${now.getMinutes()}`;
} else {
  minute = now.getMinutes();
}

let fullDate = document.querySelector("#fullDate");
fullDate.innerHTML = `${day} : ${month} : ${now.getFullYear()}`;

let time = document.querySelector("#time");
time.innerHTML = `${now.getHours()} : ${minute}`;
/*let buttoncurrent = document.querySelector("#buttonCurrentLocation");
buttoncurrent.addEventListener("click", like);*/
let F = 0;
let C = 0;
let count = true;
function ctoF() {
  count = false;
  let temp = document.querySelector(".valueOfTemp");
  F = temp.textContent * (9 / 5) + 32;
  temp.innerHTML = Math.round(F);
}
function ctoC() {
  if (count === true) {
  } else {
    let temp = document.querySelector(".valueOfTemp");
    console.log(temp.textContent);
    C = ((temp.textContent - 32) * 5) / 9;
    console.log(C);
    temp.innerHTML = Math.round(C);
  }
}

let degreeF = document.querySelector(".degreeF");
degreeF.addEventListener("click", ctoF);

let degreeC = document.querySelector(".degreeC");
degreeC.addEventListener("click", ctoC);

/*degreeF.addEventListener("click", () => {
  console.log("degreeF clicked");
  ctoF(temp);
});*/

//City in search
function showTemp(response) {
  let temp = document.querySelector(".valueOfTemp");
  temp.innerHTML = Math.round(response.data.main.temp);
  //console.log(response.data.main.temp);
}
//Geo location
let tempCur = 0; //temparature in current location
let nameCur; // city in current location
function currentTemp(response) {
  tempCur = Math.round(response.data.main.temp);
  nameCur = response.data.name;
}
function clickBut() {
  let temp = document.querySelector(".valueOfTemp");
  temp.innerHTML = tempCur;
  let nameCity = document.querySelector("#cityName");
  nameCity.innerHTML = nameCur;
}

function showPosition(position) {
  let apiKey = "a74e7a13cd82e24a3df382b1ea681a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentTemp);
}

let buttonCurrent = document.querySelector("#buttonCurrentLocation");
buttonCurrent.addEventListener("click", clickBut);

navigator.geolocation.getCurrentPosition(showPosition);
