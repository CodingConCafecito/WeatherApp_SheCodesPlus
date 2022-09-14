// show current date feature
function currentFormat(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let localTime = now.toLocaleTimeString("en", {
    timeStyle: "short",
  }); // short was used to remove the seconds , US was removed from en in hopes of making it more internationally friendly
  return `${day} ${month}/${date}, ${localTime}`;
}
let now = new Date();
let current = document.querySelector("#current-day-date-time"); // connects to date html element
current.innerHTML = currentFormat(now);

// translate data from api to a date for the forecast
function formatForecastDate(timestamp) {
  let forecastDateFormat = new Date(timestamp * 1000);
  let forecastDays = forecastDateFormat.getDay();
  let abbreviatedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return abbreviatedDays[forecastDays];
}

function getForecast(coordinates) {
  let apiKey = "fa6fc9be1dc833cd64b6553617169ea5";
  // note: API keys need to be hidden in future projects 😅 + avoid uploading hardcoded API keys to github in the future
  let excludedData = "current,minutely,hourly,alerts";
  let units = "imperial";
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${excludedData}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(displayForecast); //calls forecast display function
}

// search engine and gps feature
function showWeather(response) {
  document.querySelector("#current-cityName").innerHTML = response.data.name; // here the ID is connected to the city name html element

  apiTemperature = Math.round(response.data.main.temp);

  document.querySelector("#current-temp-value").innerHTML = apiTemperature;

  document.querySelector("#humidity").innerHTML =
    "Humidity: " + response.data.main.humidity + "%";
  document.querySelector("#windSpeed").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " mph";

  document.querySelector("#cityWeatherDescriptionElem").innerHTML =
    response.data.weather[0].description;

  getForecast(response.data.coord); // calling forecast function

  // updating main weather icon feature
  let iconDescription = response.data.weather[0].main;
  let weatherIcon = document.querySelector("#weather-icon");

  if (iconDescription == `Clear`) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-solid fa-sun`); // I am essentially replacing which font awesome icon is assigned
  } else if (iconDescription == `Clouds`) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-solid fa-cloud`);
  } else if (iconDescription == `Drizzle`) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-solid fa-cloud-rain`);
  } else if (iconDescription == `Rain`) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-solid fa-cloud-showers-heavy`);
  } else if (iconDescription == `Snow`) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-regular fa-snowflake`);
  } else if (
    iconDescription == `Fog` ||
    iconDescription == `Smoke` ||
    iconDescription == `Mist` ||
    iconDescription == `Haze` ||
    iconDescription == `Dust` ||
    iconDescription == `Ash` ||
    iconDescription == `Sand`
  ) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-solid fa-smog`);
  } else if (iconDescription == `Tornado`) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-solid fa-wind`);
  } else if (iconDescription == `Thunderstorm`) {
    weatherIcon.removeAttribute(`class`);
    weatherIcon.setAttribute(`class`, `fa-solid fa-bolt-lightning`);
  }

  // updating emoji decoration
  let emojiDescription = response.data.weather[0].main;
  let emojiType = document.querySelector("#emoji");

  if (emojiDescription == `Clear`) {
    emojiType.innerHTML = `🕶`;
  } else if (emojiDescription == `Snow`) {
    emojiType.innerHTML = `🧤`;
  } else if (
    emojiDescription == `Rain` ||
    emojiDescription == `Drizzle` ||
    emojiDescription == `Thunderstorm`
  ) {
    emojiType.innerHTML = `☂️`;
  } else if (
    emojiDescription == `Clouds` ||
    emojiDescription == `Fog` ||
    emojiDescription == `Mist` ||
    emojiDescription == `Haze`
  ) {
    emojiType.innerHTML = `🧣`;
  } else if (
    emojiDescription == `Dust` ||
    emojiDescription == `Ash` ||
    emojiDescription == `Sand`
  ) {
    emojiType.innerHTML = `🥽`;
  } else if (emojiDescription == `Tornado` || emojiDescription == `Smoke`) {
    emojiType.innerHTML = `⛑`;
  }

  // updating quote
  let quoteDescription = response.data.weather[0].main;
  let quoteType = document.querySelector("#quote");
  let quoteAuthor = document.querySelector("#author");
  let quoteImage = document.querySelector("#instagram-pic");

  if (
    quoteDescription == `Clear` ||
    quoteDescription == `Dust` ||
    quoteDescription == `Sand`
  ) {
    quoteType.innerHTML = `If there is a sun, I would want to dream.`;
    quoteAuthor.innerHTML = `- J-Hope`;
    quoteImage.removeAttribute(`src`);
    quoteImage.setAttribute(
      `src`,
      `instaImages/yellow-flower-friconcafecito-2.png`
    );
  } else if (
    quoteDescription == `Rain` ||
    quoteDescription == `Drizzle` ||
    quoteDescription == `Thunderstorm` ||
    quoteDescription == `Smoke` ||
    quoteDescription == `Ash`
  ) {
    quoteType.innerHTML = `Dream, may the trials end in full bloom.`;
    quoteAuthor.innerHTML = `- Agust D`;
    quoteImage.removeAttribute(`src`);
    quoteImage.setAttribute(
      `src`,
      `instaImages/pink-flower-friconcafecito-2.png`
    );
  } else if (
    quoteDescription == `Clouds` ||
    quoteDescription == `Snow` ||
    quoteDescription == `Fog` ||
    quoteDescription == `Mist` ||
    quoteDescription == `Haze`
  ) {
    quoteType.innerHTML = `Life is a wave that sometimes you cannot see.`;
    quoteAuthor.innerHTML = `- RM`;
    quoteImage.removeAttribute(`src`);
    quoteImage.setAttribute(
      `src`,
      `instaImages/blue-waves-friconcafecito-2.png`
    );
  }
}

function searchCity(searchInput) {
  let city = searchInput; // no .value needed here
  let apiKey = "fa6fc9be1dc833cd64b6553617169ea5";
  let units = "imperial"; //default to Fahrenheit
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather); // calls a  function that updates all current weather info
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "fa6fc9be1dc833cd64b6553617169ea5";
  let units = "imperial";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather); // calls a  function that updates all current weather info for that current location
}

function searchSubmission(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input").value;
  searchCity(searchInput); // connect to api for searched city
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition); // connect to api for current location
}

let searchEngine = document.querySelector("#citySearch-form"); // here the ID is connected to the FORM (the search engine)
searchEngine.addEventListener("submit", searchSubmission);

let currentLocationButton = document.querySelector("#gpsLocationButton");
currentLocationButton.addEventListener("click", getCurrentPosition); //connect to geolocation

//forecast display
function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      // custom forecast icons
      let forecastIcon = `fa-solid fa-cloud-rain`;
      let forecastIconDescription = forecastDay.weather[0].main;
      //
      if (forecastIconDescription == `Clear`) {
        forecastIcon = `fa-solid fa-sun`;
      } else if (forecastIconDescription == `Clouds`) {
        forecastIcon = `fa-solid fa-cloud`;
      } else if (forecastIconDescription == `Drizzle`) {
        forecastIcon = `fa-solid fa-cloud-rain`;
      } else if (forecastIconDescription == `Rain`) {
        forecastIcon = `fa-solid fa-cloud-showers-heavy`;
      } else if (forecastIconDescription == `Snow`) {
        forecastIcon = `fa-regular fa-snowflake`;
      } else if (
        forecastIconDescription == `Fog` ||
        forecastIconDescription == `Smoke` ||
        forecastIconDescription == `Mist` ||
        forecastIconDescription == `Haze` ||
        forecastIconDescription == `Dust` ||
        forecastIconDescription == `Ash` ||
        forecastIconDescription == `Sand`
      ) {
        forecastIcon = `fa-solid fa-smog`;
      } else if (forecastIconDescription == `Tornado`) {
        forecastIcon = `fa-solid fa-wind`;
      } else if (forecastIconDescription == `Thunderstorm`) {
        forecastIcon = `fa-solid fa-bolt-lightning`;
      }
      //
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weekday-icons"><i class="${forecastIcon}"></i></div>
      <div class="weekday-titles">${formatForecastDate(forecastDay.dt)}</div>
      <div class="weekday-temperatures"><span class="forecast-temp-max">${Math.round(
        forecastDay.temp.max
      )}</span><span class="forecast-unit"> °F</span></div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`; // this closed the row class div

  forecastElement.innerHTML = forecastHTML;
}

// conversion feature
function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-value");
  let tempValue = Math.round((apiTemperature - 32) * (5 / 9));
  temperatureElement.innerHTML = tempValue;
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-value");
  temperatureElement.innerHTML = apiTemperature;
}

let apiTemperature = null; // allows us to get temperature gathered from the showWeather function
// ^ this is a global variable accessible by the functions

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
//
searchCity("Los Angeles"); // updates to current weather for this city when user initially opens it
getCurrentPosition();
