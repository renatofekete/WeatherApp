window.onload = () => {
  // VARIABLES
  let weatherData = {}
  let lat
  let long
  const key = 'd4bf21aa78d1417f919046208837be54'
  const app = document.getElementById('app')
  const searchBar = document.querySelector('.search--bar')
  const search = document.querySelector('.search')
  let term
  // TEMPLATES
  const displayWeather = (weather) => {
    let time = new Date(weather.current.data[0].ts * 1000)
    app.innerHTML = `
      <div class="top">
      <h1 class="top--title">${weather.current.data[0].city_name}</h1>
      <p class="top--date">${time.toLocaleString('hr-HR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' })}:00h</p>
      </div>
      <div class="current">
      <h2 class="current--temperature"> ${Math.ceil(weather.current.data[0].temp)}° </h2>
      <div class="current--display">
      <div class="img"><img src='assets/icons/${weather.current.data[0].weather.icon}.png' alt="${weather.current.data[0].weather.description}" srcset=""></div>
      <p>${weather.current.data[0].weather.description}</p>
      </div>
      </div>
      <div class="days"></div>
      `
    const main = document.querySelector('.days')
    const days = weather.forecast.data.map(day => {
      let time = new Date(day.ts * 1000)
      main.innerHTML += `
      <div class="card">
        <h3 class="card--date">${time.toLocaleString('hr-HR', { month: 'numeric', day: 'numeric' })}</h3>
        <div class="img"><img src='assets/icons/${day.weather.icon}.png'></div>
        <h4 class="card--temperature">${Math.ceil(day.min_temp)}° / ${Math.ceil(day.max_temp)}°</h4>
      </div>`
    })
  }

  const noGeolocation = () => {
    app.innerHTML = `
      <div class="title">
      <h1>Use searchbar to find cities</h1>
      </div>
      `
  }
  // SINGLE CALL
  const callWeather = (term) => {
    fetch(`https://api.weatherbit.io/v2.0/current?${term}&key=${key}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        weatherData.current = data
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?${term}&key=${key}&days=5`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            weatherData.forecast = data
            displayWeather(weatherData)
          })
          .catch(() => {
            console.log('test')
          })
      })
      .catch(() => {
        app.innerHTML = `
        <div class="top">
        <h1 class="top--title">Please enter valid term</h1>
        </div>
        `
      })
  }

  let searchWeather = () => {
    let searchValue = searchBar.value.split(' ').join('-').toLowerCase()
    term = `city=${searchValue}`
    callWeather(term)
  }

  // INITIAL CALL
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      long = position.coords.longitude
      term = `lat=${lat}&lon=${long}`
      callWeather(term)
    }, noGeolocation)
  }
  // SEARCH
  search.addEventListener('submit', (e) => {
    e.preventDefault()
    searchWeather()
    search.reset()
  })
}
