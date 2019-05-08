window.onload = () => {
  let lat
  let long
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let key = '225fbbbcb8501c0acfbea4a81315fe4e'
      lat = position.coords.latitude
      long = position.coords.longitude
      fetch(`https://api.openweathermap.org/data/2.5/weather?APPID=${key}&lat=${lat}&lon=${long}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          let time = new Date(1557349499 * 1000)
          displayWeather(data, time)
          console.log(data.weather[0].icon)
        })
    })
  }
}
let displayWeather = (weather, time) => {
  const app = document.getElementById('app')
  app.innerHTML = `
  <div class="title">
  <h1>${weather.name}, ${weather.sys.country}</h1>
  <p class="date">${time.toLocaleString('hr-HR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' })}:00h</p>
  </div>
  <h2> ${Math.round(weather.main.temp - 273.15)}° </h2>
  <div class="display">
  <div class="img"><img src ='http://openweathermap.org/img/w/${weather.weather[0].icon}.png' alt="${weather.weather[0].main}" srcset=""></div>
  <p>${weather.weather[0].description}</p>
  </div>
  `
}
