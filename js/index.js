//! Current day
let dayCurrent = document.getElementById("dayCurrent");
let dateCurrent = document.getElementById("dateCurrent");
let DaysCurrent = document.getElementById("DaysCurrent");
let CityCurrent = document.getElementById("CityCurrent");
let GradgeCurrent = document.getElementById("GradgeCurrent");
let ImageCurrent = document.getElementById("ImageCurrent");
let TextCurrent = document.getElementById("TextCurrent");
let PrecntageCurrent = document.getElementById("PrecntageCurrent");
let SpeedCurrent = document.getElementById("SpeedCurrent");
let SpreedCurrent = document.getElementById("SpreedCurrent");

//! Next     NodeList
let NextDay = document.querySelectorAll(".NextDay");
let NextImg = document.querySelectorAll(".NextImg");
let NextGradge_1 = document.querySelectorAll(".NextGradge_1");
let NextGradge_2 = document.querySelectorAll(".NextGradge_2");
let NextStatues = document.querySelectorAll(".NextStatues");

//! Feetch data
async function getWeather(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1dbc0ccd8a8f40918d9145341241506&q=${city}&days=3`
  );
  let data = await response.json();
  return data;
}

// ! display data Today
function displayTodayData(data) {
  let todaydate = new Date();
  dayCurrent.innerHTML = todaydate.toLocaleString("en-US", { weekday: "long" });
  dateCurrent.innerHTML = todaydate.getDate();
  DaysCurrent.innerHTML = todaydate.toLocaleString("en-US", { month: "long" });
  CityCurrent.innerHTML = data.location.name;
  GradgeCurrent.innerHTML = data.current.temp_c + `oC`;
  ImageCurrent.setAttribute("src", data.current.condition.icon);
  TextCurrent.innerHTML = data.current.condition.text;
  PrecntageCurrent.innerHTML = data.current.humidity + `%`;
  SpeedCurrent.innerHTML = data.current.wind_kph + `km/h`;
  SpreedCurrent.innerHTML = data.current.wind_dir;
}

// ! display data after days
function didplayAfterdays(data) {
  let forecastday = data.forecast.forecastday;
  for (var i = 0; i < 2; i++) {
    let todaydate = new Date(forecastday[i + 1].date);
    NextDay[i].innerHTML = todaydate.toLocaleString("en-US", {
      weekday: "long",
    });
    NextGradge_1[i].innerHTML = forecastday[i + 1].day.maxtemp_c;
    NextGradge_2[i].innerHTML = forecastday[i + 1].day.mintemp_c;
    NextStatues[i].innerHTML = forecastday[i + 1].day.condition.text;
    NextImg[i].setAttribute("src", forecastday[i + 1].day.condition.icon);
  }
}

//! start program
let inputSearch = document.getElementById("inputSearch");
let eror = document.getElementById("eror");

async function startApp(cityy) {
  let weather = await getWeather(cityy);     
  try {
    displayTodayData(weather);
    didplayAfterdays(weather);
  } catch (error) {
    eror.classList.remove("d-none");
  }
}

startApp('paris');

let BtnSearch = document.getElementById("BtnSearch");
BtnSearch.addEventListener("click", function () {
  let currentCity = inputSearch.value;
  startApp(currentCity); //!cairo
});



