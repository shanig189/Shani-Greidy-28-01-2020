import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getCurrentWeather } from '../../services/api';
import { getIconNumberFormat, updateFavoriteInFavorites } from '../../helpers/actions';
import DegreesWeather from '../degreesWeather';
import './style.css';

export default () => {
  const currentCityReducer = useSelector(state => state.currentCityReducer);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const cityName = currentCityReducer.name;
  const cityKey = currentCityReducer.key;
  const weatherIcon = currentCityReducer.weather.icon;
  const temperature = currentCityReducer.weather.temperature;
  const isInFavorite = currentCityReducer.isInFavorite;

  const setCurrentWeather = async () => {
    const fetchData = async () => {
      const currentWeatherData = await getCurrentWeather(cityKey);
      if (currentWeatherData.errorMessage) {
        addToast(currentWeatherData.errorMessage, {
          appearance: 'error',
        })
      } else if (currentWeatherData.length) {
        const { WeatherIcon, WeatherText, Temperature } = currentWeatherData[0];
        const currentWeather = {
          icon: `https://developer.accuweather.com/sites/default/files/${getIconNumberFormat(WeatherIcon)}-s.png`,
          text: WeatherText,
          temperature: Temperature
        }

        if (isInFavorite) {
          updateFavoriteInFavorites(cityName, "weather", currentWeather);
        }

        dispatch({ type: 'CHANGE_CITY_WEATHER', payload: currentWeather });
      }
    }

    await fetchData();
  }

  useEffect(() => {
    if (cityKey) {
      setCurrentWeather();
    }
  }, [cityKey]);

  const temperatureValue = temperature.Metric.Value || 0;
  const temperatureUnit = temperature.Metric.Unit || '';

  return (
    <div className="currentWeather_ctn">
      <img className="currentWeather_img" src={weatherIcon} alt="" />
      <div className="currentWeather_details_ctn">
        <span>{cityName}</span>
        <div>
          <DegreesWeather value={temperatureValue} unit={temperatureUnit} />
        </div>
      </div>
    </div>
  );
}