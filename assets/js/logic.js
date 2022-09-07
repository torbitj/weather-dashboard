var cityInputEl = $('.textinput')
var searchEl = $('#search')
var recentCities = $('#recentCities')
var oneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?appid=9b35244b1b7b8578e6c231fd7654c186'
var geocodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?appid=38f3fd5cbf0a51883a0c1bfa964630af'
var currentWeatherList = $('#currentWeather')

var currentConditions = []

function geoLatLon(event) {
    event.stopPropagation();
    var cityInput = cityInputEl.val()
    console.log(cityInput)
    fetch (geocodeAPI + "&q=" + cityInput).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                localStorage.setItem(JSON.stringify(data[0].name), JSON.stringify(`${data[0].lat} ${data[0].lon}`))
                weatherRetrieve(data)
            })
        }
    })
}

function weatherRetrieve (data) {
    var lat = `&lat=${data[0].lat}`
    var lon = `&lon=${data[0].lon}`
    fetch (oneCallAPI + lat + lon + '&exclude=hourly,minutely,daily,alerts&units=imperial').then(function (response) {
        if (response.ok) {
            response.json().then(function (weather) {
                console.log(weather)
                currentWeather(data,weather);
            })
        }
    })
}

function currentWeather (data,weather) {
    currentConditions = []

    var date = moment().format('MM/DD/YYYY')
    var city = data[0].name
    var icon = weather.current.weather[0].icon
    var conditions = {
        temp: weather.current.temp,
        humid: weather.current.humidity,
        wind: weather.current.wind_speed,
        uv: weather.current.uvi
    }
    console.log(conditions)
    // currentConditions.push(conditions)

    // conditions.forEach(function (condition){
    //     var condLi = $()
    // })
}

searchEl.on('click', '.btn', geoLatLon)