import Weather from './';

export default function OpenWeatherAPI(apiKey: string | undefined): Weather {
  if (!apiKey) throw new Error('[OpenWeatherAPI] No API key specified');

  return {
    async getByLatLng(lat: number, lng: number) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=ru&appid=${apiKey}`);
      const weatherData = await response.json();
      const description = weatherData.weather[0].description;
      return {
        title: weatherData.name,
        // Capitalize first letter
        description: description.charAt(0).toUpperCase() + description.slice(1),
        temp: Math.ceil(weatherData.main.temp),
        tempMax: Math.ceil(weatherData.main.temp_max),
        tempMin: Math.ceil(weatherData.main.temp_min),
        feelsLike: Math.ceil(weatherData.main.feels_like),
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
      };
    }
  }
}
