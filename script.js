document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('getWeather').addEventListener('click', async function() {
    const coordinates = document.getElementById('coordinates').value;
    if (coordinates) {
      await fetchWeather(coordinates);
    } else {
      alert("Invalid coordinates");
    }
  });
});
  
async function fetchWeather(coordinates) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${coordinates}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '1320e55314msh15777ff17238aeap16183djsn77c0b1fa331a',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    displayWeatherInfo(result);
  } catch (error) {
    console.log(error);
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
  } else if (hours === 0) {
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
  }
  else {
    body.style.backgroundImage = `url('assets/nightImage.jpg')`;
  }
}