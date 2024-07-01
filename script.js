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
      console.log(result);
      displayWeatherInfo(result);
    } catch (error) {
      console.log(error);
    }
  }
  
  function displayWeatherInfo(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = '';

    const location = data.location;
    const locationInfo = `
      <p>${location.name}</p>
      <p>${location.country}</p>
      <p>${location.lat}</p>
      <p>${location.lon}</p>
      <p>${location.localtime}</p>
    `;
    weatherInfoDiv.innerHTML += locationInfo;
    const current = data.current;
    const condition = current.condition;
    const currentInfo = `
      <p>${current.temp_f}F</p>
      <p>Feels Like: ${current.feelslike_c}°C / ${current.feelslike_f}°F</p>
      <p>Wind Chill: ${current.windchill_c}°C / ${current.windchill_f}°F</p>
    `;
    weatherInfoDiv.innerHTML += currentInfo;
  }
  