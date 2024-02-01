const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'; 
const WEATHER_API_KEY = "b77d2011de0e553bb85df59d11584aad"; 

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function fetchWeatherData(lat, lon) {
  try {
    const [weatherPromise, forecastPromise] = await Promise.all([
      fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`),
      fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`),
    ]);

    if (!weatherPromise.ok) {
      throw new Error(`Weather API request failed with status ${weatherPromise.status}`);
    }
    
    if (!forecastPromise.ok) {
      throw new Error(`Forecast API request failed with status ${forecastPromise.status}`);
    }

    const weatherResponse = await weatherPromise.json();
    const forecastResponse = await forecastPromise.json();
    return [weatherResponse, forecastResponse];
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    if (!response.ok) {
      throw new Error(`Cities API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
