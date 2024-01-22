const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

const openWeatherApiKey = '4bfe1b27c0964b9ea5fe6fbdd27fa033';

const api1Endpoint = 'API_ENDPOINT_1'; 
const api2Endpoint = 'API_ENDPOINT_2'; 

const openWeatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather';

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(openWeatherEndpoint, {
      params: {
        q: city,
        appid: openWeatherApiKey,
      },
    });

    const weatherData = response.data;
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// Your additional APIs
app.get('/api1', async (req, res) => {
  try {
    const response = await axios.get(api1Endpoint);
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch data from API 1' });
  }
});

app.get('/api2', async (req, res) => {
  try {
    const response = await axios.get(api2Endpoint);
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch data from API 2' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
