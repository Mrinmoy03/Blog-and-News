import React from 'react';
import WeatherIcon from './WeatherIcons';
import '../styles/weather.css';

const WeatherData = ({ data }) => {
  return (
    <div className="weather-data">
      {data.weather && data.weather[0] &&  <WeatherIcon  type={data.weather[0].main}  /> }
      <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
      <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
    </div>
  );
};

export default WeatherData;



