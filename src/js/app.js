window.onload = () => {
  // VARIABLES
  let lat
  let long
  const key = 'd4bf21aa78d1417f919046208837be54'
  const app = document.getElementById('app')
  let isSingle = true
  const showOne = document.querySelector('.show-one')
  const showFive = document.querySelector('.show-five')
  // TEMPLATES
  const displayWeather = (weather) => {
    let time = new Date(weather.data[0].ts * 1000)
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
  const displayFiveDayWeather = (weather) => {
    app.innerHTML = `
    <div class="title">
    <h1>${weather.city_name}, ${weather.country_code}</h1>
    <h3>5 days weather</h3>
    </div>
    <div class="main"><div class="days"></div></div>
    `
    const main = document.querySelector('.days')
    const days = weather.data.map(day => {
      let time = new Date(day.ts * 1000)
      main.innerHTML += `
      <div class="card">
        <h3>${time.toLocaleString('hr-HR', { month: 'numeric', day: 'numeric' })}</h3>
        <div class="img"><img src='assets/icons/${day.weather.icon}.png'></div>
        <h4>${Math.ceil(day.min_temp)}° / ${Math.ceil(day.max_temp)}°</h4> 
      </div>
      `
    })
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
        displayWeather(data)
      })
  }

  const fiveDayCall = (lat, long) => {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=${key}&days=5`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        displayFiveDayWeather(data)
      })
  }
  // INITIAL CALL
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      long = position.coords.longitude
      singleCall(lat, long)

      showOne.addEventListener('click', () => {
        if (!isSingle) {
          showOne.classList.remove('active')
          showFive.classList.add('active')
          singleCall(lat, long)
          isSingle = !isSingle
        } else {

        }
      })
      showFive.addEventListener('click', () => {
        if (isSingle) {
          showFive.classList.remove('active')
          showOne.classList.add('active')
          fiveDayCall(lat, long)
          isSingle = !isSingle
        } else {

        }
      })
    }, noGeolocation)
  }
}
