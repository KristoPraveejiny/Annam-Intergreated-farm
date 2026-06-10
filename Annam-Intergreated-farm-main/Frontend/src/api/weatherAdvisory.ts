import axios from 'axios';

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  wind_speed: number;
  rain_prob: number;
  icon: string;
  last_updated: string;
}

export interface AdvisoryData {
  explanation: string;
  irrigation: string;
  fertilizer: string;
  pest_disease: string;
  activities: string;
  score: number;
  alerts: string[];
}

export interface WeatherAdvisoryResponse {
  weather: WeatherData;
  advisory: AdvisoryData;
}

export const fetchWeatherAdvisory = async (): Promise<WeatherAdvisoryResponse> => {
  const { data } = await axios.get<WeatherAdvisoryResponse>('/api/weather-advisory/');
  return data;
};
