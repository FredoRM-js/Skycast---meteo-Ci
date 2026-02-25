import { FormattedWeather, WeatherData } from './types';

function generateAlerts(condition: string, temp: number, windSpeed: string): FormattedWeather['alerts'] {
  const alerts: FormattedWeather['alerts'] = [];
  const lower = condition.toLowerCase();
  const wind = parseInt(windSpeed);

  if (lower.includes('thunder') || lower.includes('lightning')) {
    alerts.push({
      title: 'Severe Thunderstorm Warning',
      description: 'Severe thunderstorms are expected in your area. Seek shelter immediately.',
      severity: 'severe'
    });
  }

  if (lower.includes('heavy rain') || lower.includes('flood')) {
    alerts.push({
      title: 'Flash Flood Watch',
      description: 'Heavy rainfall may lead to flash flooding in low-lying areas.',
      severity: 'moderate'
    });
  }

  if (wind > 60) {
    alerts.push({
      title: 'High Wind Advisory',
      description: `Strong winds of ${wind} km/h detected. Secure loose outdoor objects.`,
      severity: 'moderate'
    });
  }

  if (temp > 35) {
    alerts.push({
      title: 'Excessive Heat Warning',
      description: 'Dangerous heat levels expected. Stay hydrated and avoid outdoor activities.',
      severity: 'extreme'
    });
  }

  if (temp < -10) {
    alerts.push({
      title: 'Freeze Warning',
      description: 'Sub-freezing temperatures expected. Protect sensitive plants and pipes.',
      severity: 'moderate'
    });
  }

  return alerts;
}

export async function fetchWeather(query: string): Promise<FormattedWeather> {
  // wttr.in returns a nice JSON format if we append ?format=j1
  const response = await fetch(`https://wttr.in/${encodeURIComponent(query)}?format=j1`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data: WeatherData = await response.json();
  const current = data.current_condition[0];
  const area = data.nearest_area[0];
  const condition = current.weatherDesc[0].value;
  const temp = parseInt(current.temp_C);
  const windSpeed = current.windspeedKmph;

  return {
    city: area.areaName[0].value,
    country: area.country[0].value,
    temp,
    condition,
    humidity: current.humidity,
    windSpeed,
    pressure: current.pressure,
    uvIndex: current.uvIndex,
    visibility: current.visibility,
    alerts: generateAlerts(condition, temp, windSpeed),
    forecast: data.weather.map(day => ({
      date: day.date,
      maxTemp: parseInt(day.maxtempC),
      minTemp: parseInt(day.mintempC),
      condition: day.hourly[4].weatherDesc[0].value, // Mid-day condition
    })),
  };
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<FormattedWeather> {
  return fetchWeather(`${lat},${lon}`);
}
