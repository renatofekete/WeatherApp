window.onload = () => {
  let lat
  let long
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let key = '225fbbbcb8501c0acfbea4a81315fe4e'
      lat = position.coords.latitude
      long = position.coords.longitude
      fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=${key}&lat=${lat}&lon=${long}&units=metrics`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          let time = new Date(1557343800)
          console.log(time.getUTCFullYear())
          displayWeather(data, time)
        })
    })
  }
}
let displayWeather = (weather, time) => {
  const app = document.getElementById('app')
  app.innerHTML = `
  <h1>${weather.name}</h1>
  <p>${time.getFullYear()}</p>
  <h2> ${weather.main.temp}° </h2>
  <div class="img"><img src ='http://openweathermap.org/img/w/${weather.weather.icon}.png' alt="Prognoza" srcset=""></div>
  `
}
