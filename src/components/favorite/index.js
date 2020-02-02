import React from 'react';
import DegreesWeather from '../degreesWeather';
import './style.css';

export default ({ cityName, cityKey, cityWeather, onDeleteFavoriteClick, onFavoriteClick }) => {
    const { icon, text, temperature } = cityWeather;
    const iconImg = icon || '';
    const temperatureValue = temperature.Metric.Value || 0;
    const temperatureUnit = temperature.Metric.Unit || '';
    const temperatureText = text || '';

    const handleOnDeleteFavoriteClick = (event, cityName) => {
        event.stopPropagation();
        onDeleteFavoriteClick(cityName);
    }

    return (
        <div className="favorite_ctn" onClick={() => onFavoriteClick(cityName, cityKey)}>
            <span className="favorite_name">{cityName}</span>
            <div className="favorite_degrees_ctn">
                <DegreesWeather value={temperatureValue} unit={temperatureUnit} />
            </div>
            <img className="favorite_img" src={iconImg} alt="" />
            <span className="favorite_temperatureText">{temperatureText}</span>
            <i className="material-icons favorite_deleteIcon" onClick={(event) => handleOnDeleteFavoriteClick(event, cityName)}>delete</i>
        </div>
    );
}