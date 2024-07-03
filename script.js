const apiKey = '1320e55314msh15777ff17238aeap16183djsn77c0b1fa331a';

document.addEventListener("DOMContentLoaded", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not available in this browser.");
  }
});

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetchWeather(latitude, longitude);
}

function errorCallback(error) {
  if (error.code === error.PERMISSION_DENIED) {
    document.getElementById("error").style.visibility = "visible";
    document.getElementById("temp").style.visibility = "visible";
  }
  else {
    alert("Error getting location: " + error.message);
  }
}

async function fetchWeather(lat, lon) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat},${lon}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    document.getElementById("temp").style.visibility = "hidden";
    document.getElementById("error").style.visibility = "hidden";
    displayWeatherInfo(result);
  } 
  catch (error) {
    alert(error);
  }
}
  
function displayWeatherInfo(data) {
  const weatherIcon = document.getElementById("weatherIcon");
  const currentWeather = document.getElementById("currentWeather");
  const currentTemperature = document.getElementById("currentTemperature");
  const currentInfo = document.getElementById("currentInfo");
  const feelsLike = document.getElementById("feelsLike");

  const location = data.location;
  const current = data.current;
  const condition = current.condition;
  const currentTime = location.localtime.slice(-5);
  let hours = parseInt(currentTime.slice(0, 2));
  const minutes = currentTime.slice(3);
  let timeAbbreviation = "am";

  if (hours >= 12) {
    timeAbbreviation = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  } 
  else if (hours == 0) {
    hours = 12;
  }

  const standardTime = `${hours}:${minutes} ${timeAbbreviation}`;

  document.getElementById("weatherIcon").style.visibility = "visible";

  weatherIcon.src = `https:${condition.icon}`;
  weatherIcon.style.scale = "1.5";
  currentInfo.innerHTML = `The weather in ${location.name} at ${standardTime}`
  currentTemperature.innerHTML = `${current.temp_f}°F`;
  currentWeather.innerHTML = `${condition.text}`;
  feelsLike.innerHTML = `Feels like ${current.feelslike_f}°F`
  const body = document.body;
  if (current.is_day) {
    body.style.backgroundImage = `url('assets/dayImage.jpg')`;
    body.style.color = "black";
  }
  else {
    body.style.backgroundImage = `url('assets/nightImage.jpg')`;
    body.style.color = "white";
  }
}