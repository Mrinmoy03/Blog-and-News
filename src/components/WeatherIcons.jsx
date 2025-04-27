import React from 'react';
import '../styles/weather.css';
const WeatherIcon = ({ type }) => {
  const getIcon = (weatherType) => {
    switch (weatherType.toLowerCase()) {
      case 'clear':
        return <i className="bx bxs-sun"></i>;
      case 'clouds':
        return <i className="bx bxs-cloud"></i>;
      case 'rain':
        return <i className="bx bxs-cloud-rain"></i>;
      case 'drizzle':
        return <i className="bx bx-cloud-drizzle"></i>;
      case 'thunderstorm':
        return <i className="bx bxs-cloud-lightning"></i>;
      case 'snow':
        return <i className="bx bxs-cloud-snow"></i>;
      case 'mist':
      case 'haze':
        return <i className="bx bx-cloud"></i>;
      case 'fog':
        return <i className="bx bx-cloud-fog"></i>;
      case 'smoke':
        return <i className="bx bx-smoke"></i>;
      case 'dust':
      case 'sand':
      case 'ash':
      case 'squall':
        return <i className="bx bx-wind"></i>;
      case 'tornado':
        return <i className="bx bx-tornado"></i>;
      default:
        return <i className="bx bx-question-mark"></i>;
    }
  };

  return getIcon(type);
};

export default WeatherIcon;
