// app.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const weatherAPI = "4bfe1b27c0964b9ea5fe6fbdd27fa033";
const newsAPIKey = "3de2f2e1a5f74dfa8b5f8825ace9e42b";
const restCountriesAPI = "https://restcountries.com/v3.1/all"; 

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/weather', async (req, res) => {
  try {
    const { city } = req.query;
    const apiKey = '4bfe1b27c0964b9ea5fe6fbdd27fa033'; // Replace with your OpenWeatherAPI key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Extract relevant information from weatherData
    const formattedData = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      coordinates: {
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
      },
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      windSpeed: weatherData.wind.speed,
      countryCode: weatherData.sys.country,
      rainVolumeLast3Hours: (weatherData.rain && weatherData.rain['3h']) || 0,
      // Add other required weather information
    };

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/news', async (req, res) => {
  try {
    const { country } = req.query;
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsAPIKey}`;

    const response = await axios.get(newsUrl);
    const newsData = response.data;

    const formattedNews = newsData.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
    }));

    res.json(formattedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/interesting-facts', async (req, res) => {
  try {
    const response = await axios.get(restCountriesAPI);
    const countriesData = response.data;

    // Choose a random country and get its interesting facts
    const randomCountry = getRandomElement(countriesData);
    const interestingFacts = randomCountry.facts;
// public/front.js
async function getWeatherAndInterestingFacts() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
  
    // Get Weather Data
    const weatherResponse = await fetch(`/weather?city=${cityName}`);
    const weatherData = await weatherResponse.json();
  
    // Get Interesting Facts Data
    const factsResponse = await fetch(`/interesting-facts?city=${cityName}`);
    const factsData = await factsResponse.json();
  
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
      <p>Temperature: ${weatherData.temperature}</p>
      <p>Description: ${weatherData.description}</p>
      <!-- Add other weather information -->
    `;
  
    const interestingFactsDiv = document.getElementById('interestingFacts');
    interestingFactsDiv.innerHTML = `<h3>Interesting Facts</h3><p>${factsData.countryFacts}</p>`;
  }
  
    res.json({ interestingFacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

