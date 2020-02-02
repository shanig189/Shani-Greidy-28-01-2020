import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getFiveDaysWeather } from '../../services/api';
import DayWeather from '../dayWeather';
import './style.css';

let initialFiveDaysWeather = [];

export default () => {
  const currentCityReducer = useSelector(state => state.currentCityReducer);
  const { addToast } = useToasts();
  const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
  const cityKey = currentCityReducer.key;

  const getFiveDaysWeatherData = async () => {
    const fetchData = async () => {
      const fiveDaysWeatherData = await getFiveDaysWeather(cityKey);
      if (fiveDaysWeatherData.errorMessage) {
        addToast(fiveDaysWeatherData.errorMessage, {
          appearance: 'error',
        })
      } else if (fiveDaysWeatherData.DailyForecasts) {
        const { DailyForecasts } = fiveDaysWeatherData;
        if (DailyForecasts.length) {
          initialFiveDaysWeather = DailyForecasts.map((dayWeather, index) =>
            <DayWeather key={index} date={dayWeather.Date} day={dayWeather.Day} temperature={dayWeather.Temperature} />
          )
        }

        setFiveDaysWeather(initialFiveDaysWeather);
      }
    }

    await fetchData();
  }

  useEffect(() => {
    if (cityKey) {
      getFiveDaysWeatherData();
    }
  }, [cityKey]);

  return (
    <div className="fiveDaysWeather_ctn">
      {fiveDaysWeather}
    </div>
  );
}