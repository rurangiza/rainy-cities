require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function getCityWeather(lat: string, lon: string) {
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    
    try {
        const result = await fetch(api_url)
        if (!result.ok) {
            console.log(result.status, result.statusText)
            throw new Error('Network response was not ok');
        }
        const data = await result.json();
        console.log(data)
        return {
            id: Number(data.id),
            city_name: data.name,
            weather_condition: data.weather[0].description,
            timestamp: Number(data.dt),
            code: Number(data.weather[0].id)
        }
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        return 'Failed to fetch weather data';
    }
}

export async function getCityCoordinates(city_name: string): Promise<{ lat: string; lon: string; } | null> {
    const api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${WEATHER_API_KEY}`

    try {
        const result = await fetch(api_url)
        if (!result.ok) {
            console.log(result.status, result.statusText)
            throw new Error('Network response was not ok');
        }
        const data = await result.json();
        return {
            lat: data[0].lat,
            lon: data[0].lon
        }
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        return null
    }
}
