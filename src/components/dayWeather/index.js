import React from 'react';
import { getDayNameByISOString, getIconNumberFormat } from '../../helpers/actions';
import DegreesWeather from '../degreesWeather';
import './style.css';

export default ({ date, day, temperature }) => {
    const dayName = getDayNameByISOString(date);
    const iconNumber = getIconNumberFormat(day.Icon) || 0;  
    const minTemperatureValue = temperature.Minimum.Value || 0;
    const minTemperatureUnit = temperature.Minimum.Unit || '';
    const maxTemperatureValue = temperature.Maximum.Value || 0;
    const maxTemperaturUnit = temperature.Minimum.Unit || '';
    
    return (
        <div className="dayWeather_ctn">
            <span className="dayWeather_name">{dayName}</span>
            <img className="dayWeather_img" src={`https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`} alt="" />
            <div className="dayWeather_degrees_ctn">
                <DegreesWeather value={minTemperatureValue} unit={minTemperatureUnit} />
                <span>-</span>
                <DegreesWeather value={maxTemperatureValue} unit={maxTemperaturUnit} />
            </div>
        </div>
    );
}