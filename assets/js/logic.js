var cityInputEl = $('.textinput')
var searchEl = $('#search')
var recentCities = $('#recentCities')
var oneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall?appid=9b35244b1b7b8578e6c231fd7654c186'
var geocodeAPI = 'http://api.openweathermap.org/geo/1.0/direct?appid=38f3fd5cbf0a51883a0c1bfa964630af'
var currentWeatherList = $('#currentWeather')
var currentWeatherEl = $('#current-container')
var currentTitleList = $('#title-date')


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
    currentWeatherList.empty();
    currentTitleList.empty();
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
    currentConditions.push(conditions)

    var heading = $('<li>').addClass('display-4 list-inline-item list-unstyled')
    var dateLi = $('<li>').addClass('display-4 list-inline-item list-unstyled')
    var iconLi = $('<li>').addClass('display-4 list-inline-item list-unstyled')
    var iconImg = $('<img>').addClass('current-icon').attr('src', 'http://openweathermap.org/img/wn/'+ icon + '@2x.png')
    heading.text(`${city} `)
    dateLi.text(date)
    iconLi.append(iconImg)
    currentTitleList.append(heading, dateLi, iconLi)

    currentConditions.forEach(function (condition){
        
        var condLi = $('<li>').addClass('current-condition list-unstyled').attr('data-index', city)
        currentWeatherList.append(condLi)
        console.log(condition)
        if (condition = 'temp') {
            condLi.text(`Temperature is: ${conditions.temp}`)
        } else if (condition = 'humid') {
            condLi.text(`Humidity is: ${conditions.humid}`)
        } else if (condition = 'wind') {
            condLi.text(`Wind Speed is: ${conditions.wind}`)
        } else {
            condLi.text(`UV Index is: ${conditions.uv}`)
        }

        
    })
}

searchEl.on('click', '.btn', geoLatLon)