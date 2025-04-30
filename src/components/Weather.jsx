import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/weather.css';
import SearchBar from '../components/SearchBar'
import WeatherData from '../components/WeatherData';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = 'West Bengal';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=6a6bee0675ed62f02a10903bcc80c0b9`;
      const response = await axios.get(url);
      setData(response.data);
    };
    fetchDefaultLocation();
  }, []);

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=6a6bee0675ed62f02a10903bcc80c0b9`;
    try {
      const response = await axios.get(url);
      if (response.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(response.data);
        setLocation('');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("An unexpected error occurred", error);
      }
    }
  };

  const handleInputChange = (e) => setLocation(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="weather">
      <SearchBar 
        location={location} 
        handleInputChange={handleInputChange} 
        handleKeyDown={handleKeyDown} 
        search={search} 
        cityName={data.name}
      />
      {data.notFound ? (
        <div className="not-found">Not Found 🤷‍♀️</div>
      ) : (
        <WeatherData data={data} />
      )}
    </div>
  );
};

export default Weather;
