import React from 'react';
import './style.css';

export default ({ value, unit }) => {
    return (
        <div className="degreesWeather_ctn">
            <span>{value}</span>
            <span>&#176;</span>
            <span>{unit}</span>
        </div>
    );
}