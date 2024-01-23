// public/front.js
async function getWeatherAndNews() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
  
    // Get Weather Data
    const weatherResponse = await fetch(`/weather?city=${cityName}`);
    const weatherData = await weatherResponse.json();
  
    // Get News Data
    const newsResponse = await fetch(`/news?city=${cityName}`);
    const newsData = await newsResponse.json();
    
    
    // Update the UI with weather data
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
      <p>Temperature: ${weatherData.temperature}</p>
      <p>Description: ${weatherData.description}</p>
      <p>Icon: <img src="http://openweathermap.org/img/w/${weatherData.icon}.png" alt="Weather Icon"></p>
      <p>Coordinates: Latitude ${weatherData.coordinates.latitude}, Longitude ${weatherData.coordinates.longitude}</p>
      <p>Feels Like: ${weatherData.feelsLike}</p>
      <p>Humidity: ${weatherData.humidity}%</p>
      <p>Pressure: ${weatherData.pressure} hPa</p>
      <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
      <p>Country Code: ${weatherData.countryCode}</p>
      <p>Rain Volume (last 3 hours): ${weatherData.rainVolumeLast3Hours} mm</p>
      <!-- Add other weather information -->
    `;
  
    // Update the UI with news data
    const newsInfoDiv = document.getElementById('newsInfo');
    newsInfoDiv.innerHTML = '<h3>News</h3>';
    newsData.forEach(article => {
      newsInfoDiv.innerHTML += `
        <div>
          <h4>${article.title}</h4>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read More</a>
          <img src="${article.imageUrl}" alt="Article Image">
        </div>
      `;
    });
  
    // Create a Leaflet map centered on the entered city
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = ''; // Clear previous map
    mapContainer.style.height = '300px'; // Set the height explicitly
  
    const mymap = L.map('map').setView([weatherData.coordinates.latitude, weatherData.coordinates.longitude], 10);
  
    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
  
    // Add a marker to the map
    L.marker([weatherData.coordinates.latitude, weatherData.coordinates.longitude]).addTo(mymap)
      .bindPopup(`<b>${cityName}</b>`).openPopup();
  }
  