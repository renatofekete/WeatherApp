window.onload = () => {
  // VARIABLES
  let lat
  let long
  const key = '225fbbbcb8501c0acfbea4a81315fe4e'
  const app = document.getElementById('app')
  // TEMPLATES
  const displayWeather = (weather, time) => {
    app.innerHTML = `
      <div class="title">
      <h1>${weather.name}, ${weather.sys.country}</h1>
      <p class="date">${time.toLocaleString('hr-HR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' })}:00h</p>
      </div>
      <div class="main">
      <h2> ${Math.round(weather.main.temp - 273.15)}° </h2>
      <div class="display">
      <div class="img"><img src ='https://openweathermap.org/img/w/${weather.weather[0].icon}.png' alt="${weather.weather[0].main}" srcset=""></div>
      <p>${weather.weather[0].description}</p>
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
  // INITIAL CALL
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      long = position.coords.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${key}&lat=${lat}&lon=${long}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          let time = new Date(data.dt * 1000)
          displayWeather(data, time)
        })
    }, noGeolocation)
  }
}
