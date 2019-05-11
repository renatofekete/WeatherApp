window.onload = () => {
  // VARIABLES
  let lat
  let long
  const key = 'd4bf21aa78d1417f919046208837be54'
  const app = document.getElementById('app')
  // TEMPLATES
  const displayWeather = (weather, time) => {
    app.innerHTML = `
      <div class="title">
      <h1>${weather.data[0].city_name}, ${weather.data[0].country_code}</h1>
      <p class="date">${time.toLocaleString('hr-HR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' })}:00h</p>
      </div>
      <div class="main">
      <h2> ${Math.ceil(weather.data[0].temp)}° </h2>
      <div class="display">
      <div class="img"><img src='assets/icons/${weather.data[0].weather.icon}.png' alt="${weather.data[0].weather.description}" srcset=""></div> 
      <p>${weather.data[0].weather.description}</p>
      </div>
      </div>
      `
  }
  const noGeolocation = () => {
    app.innerHTML = `
      <div class="title">
      <h1>For this app to work, please allow location</h1>
      </div>
      `
  }
  // SINGLE CALL
  const singleCall = (lat, long) => {
    fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${key}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        let time = new Date(data.data[0].ts * 1000)
        displayWeather(data, time)
      })
  }

  /* const fiveDayCall = (lat, long) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?APPID=${key}&lat=${lat}&lon=${long}&cnt=5`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
      })
  } */
  // INITIAL CALL
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      long = position.coords.longitude
      singleCall(lat, long)
    }, noGeolocation)
  }
}
