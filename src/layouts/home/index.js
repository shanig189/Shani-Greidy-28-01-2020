import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Search from '../../components/search';
import CityWeather from '../../components/cityWeather';
import './style.css';

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'CHANGE_LINK', payload: 'Home' });
    }, []);

    return (
        <div className="home_ctn">
            <Search />
            <CityWeather />
        </div>
    );
}