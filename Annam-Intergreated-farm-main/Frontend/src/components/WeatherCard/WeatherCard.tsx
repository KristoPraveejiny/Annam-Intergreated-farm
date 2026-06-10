import React from 'react';
import { WeatherData } from '../../api/weatherAdvisory';
import styles from './WeatherCard.module.css';

type Props = { data: WeatherData };

export const WeatherCard: React.FC<Props> = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Current Weather</h2>
      <div className={styles.main}>
        <img src={iconUrl} alt={data.condition} className={styles.icon} />
        <div>
          <p className={styles.temp}>{Math.round(data.temperature)}°C</p>
          <p className={styles.cond}>{data.condition}</p>
        </div>
      </div>
      <ul className={styles.list}>
        <li>💧 Humidity: {data.humidity}%</li>
        <li>🌬️ Wind: {data.wind_speed} m/s</li>
        <li>🌧️ Rain (1h): {data.rain_prob} mm</li>
        <li>🕒 Updated: {new Date(data.last_updated).toLocaleTimeString()}</li>
      </ul>
    </section>
  );
};
