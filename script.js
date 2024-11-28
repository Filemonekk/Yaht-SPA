const input = document.querySelector('input')
const buttonWeather = document.querySelector('.button-weather')
const cityName = document.querySelector('.city-name')
const warningWeather = document.querySelector('.warning-weather')
const photo = document.querySelector('.photo-weather')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const windSpeed = document.querySelector('.wind-speed')
const showWeatherBtn = document.getElementById('show-weather-btn');
const closeWeatherBtn = document.querySelector('.close-weather');
const weatherWrapper = document.querySelector('.wrapper-weather');


const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=ac7733200d6b71c8c3e5a19ea9ed12f3'
const API_UNITS = '&units=metric'

const getWeather = () => {
    const city = input.value || 'London'
    const URL = API_LINK + city + API_KEY + API_UNITS

    axios.get(URL)
        .then(res => {
            const temp = res.data.main.temp
            const wind = res.data.wind.speed
            const status = Object.assign({}, ...res.data.weather)

            cityName.textContent = res.data.name
            temperature.textContent = Math.floor(temp) + '℃'
            windSpeed.textContent = wind + 'm/s'
            weather.textContent = status.main

            warningWeather.textContent = ''
            input.value = ''

            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', './img/thunderstorm.png')
            } else if (status.id >= 300 && status.id < 400) {
                photo.setAttribute('src', './img/drizzle.png')
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', './img/rain.png')
            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', './img/ice.png')
            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', './img/fog.png')
            } else if (status.id === 800) {
                photo.setAttribute('src', './img/sun.png')
            } else if (status.id >= 800 && status.id < 900) {
                photo.setAttribute('src', './img/cloud.png')
            } else {
                photo.setAttribute('src', './img/unknown.png')
            }
        })
        .catch(() => warningWeather.textContent = 'Wpisz poprawną nazwę miasta!')
}

const enterCheck = e => {
    if (e.key === 'Enter') {
        getWeather()
    }
}

showWeatherBtn.addEventListener('click', function () {
    weatherWrapper.style.display = 'block'
});

closeWeatherBtn.addEventListener('click', function() {
    weatherWrapper.style.display = 'none';
});

input.addEventListener('keyup', enterCheck)
buttonWeather.addEventListener('click', getWeather)
getWeather();