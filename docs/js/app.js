"use strict";window.onload=function(){var t,a,o=document.getElementById("app");navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(n){t=n.coords.latitude,a=n.coords.longitude,fetch("https://api.openweathermap.org/data/2.5/weather?APPID=".concat("225fbbbcb8501c0acfbea4a81315fe4e","&lat=").concat(t,"&lon=").concat(a)).then(function(n){return n.json()}).then(function(n){!function(n,t){o.innerHTML='\n      <div class="title">\n      <h1>'.concat(n.name,", ").concat(n.sys.country,'</h1>\n      <p class="date">').concat(t.toLocaleString("hr-HR",{year:"numeric",month:"long",day:"numeric",hour:"numeric"}),':00h</p>\n      </div>\n      <div class="main">\n      <h2> ').concat(Math.round(n.main.temp-273.15),'° </h2>\n      <div class="display">\n      <div class="img"><img src =\'https://openweathermap.org/img/w/').concat(n.weather[0].icon,".png' alt=\"").concat(n.weather[0].main,'" srcset=""></div>\n      <p>').concat(n.weather[0].description,"</p>\n      </div>\n      </div>\n      ")}(n,new Date(1e3*n.dt))})},function(){o.innerHTML='\n      <div class="title">\n      <h1>For this app to work, please allow location</h1>\n      </div>\n      '})};