export interface WeatherData {
  current_condition: {
    temp_C: string;
    temp_F: string;
    weatherDesc: { value: string }[];
    humidity: string;
    windspeedKmph: string;
    pressure: string;
    uvIndex: string;
    visibility: string;
    observation_time: string;
  }[];
  weather: {
    date: string;
    avgtempC: string;
    maxtempC: string;
    mintempC: string;
    hourly: {
      time: string;
      tempC: string;
      weatherDesc: { value: string }[];
    }[];
  }[];
  nearest_area: {
    areaName: { value: string }[];
    country: { value: string }[];
    region: { value: string }[];
  }[];
}

export interface FormattedWeather {
  city: string;
  country: string;
  temp: number;
  condition: string;
  humidity: string;
  windSpeed: string;
  pressure: string;
  uvIndex: string;
  visibility: string;
  alerts: {
    title: string;
    description: string;
    severity: 'moderate' | 'severe' | 'extreme';
  }[];
  forecast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
  }[];
}
