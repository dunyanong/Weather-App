const weather = document.querySelector('.weather');
const searchBtn = document.querySelector('button[role="search"]');
const cityField = document.querySelector('input[type="search"]');

function renderForecast(forecast) {
  forecast.forEach((weatherData) =>{
    console.log(weatherData);
  });
}

function getForecast(city) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`;
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const forecastData = data.list.filter((obj) => obj.dt_txt.endsWith('06:00:00'));
    renderForecast(forecastData);
  })
}
function getCityWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const markup = `<h1 class="location">${data.name}, ${data.sys.country}</h1>
 <div class="weather__summary">
    <p><i class="wi wi-cloud weather-icon"></i> <span class="weather__celsius-value">${data.main.temp}°C</span></p>
    <p>${data.weather[0].main}</p>
    <ul class="weather__miscellaneous">
    <li><i class="wi wi-humidity"></i> Humidity  <span>${data.main.humidity}%</span></li>
    <li><i class="wi wi-small-craft-advisory"></i> Wind Speed <span>${data.wind.speed} m/s</span></li>
    </ul>
 </div>
 `;
      while (weather.firstChild) {
        weather.removeChild(weather.firstChild);
      }
      weather.insertAdjacentHTML('beforeend', markup);
    })
    .catch((error) => {
      console.log(error);
    });
}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getCityWeather(cityField.value);
});
