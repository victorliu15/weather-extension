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

  const location = data.location;
  const current = data.current;
  const condition = current.condition;

  weatherIcon.src = `https:${condition.icon}`;
  currentWeather.innerHTML = `The weather in ${location.name} at ${location.localtime} is currently ${condition.text}`;
  currentTemperature.innerHTML = `The current temperature is ${current.temp_f} degrees Fahrenheit although it feels like ${current.feelslike_f} and it is ${current.is_day} daytime`;
  const body = document.body;
  if (current.is_day) {
    body.style.backgroundImage = `url('assets/dayImage.png')`;
    body.style.color = "black";
  }
  else {
    body.style.backgroundImage = `url('assets/nightImage.png')`;
    body.style.color = "white";
  }
}