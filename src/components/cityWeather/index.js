import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { getAutoCompleteValues } from '../../services/api';
import { getFavorites } from '../../services/favoritesStorage';
import { getCityKey } from '../../helpers/actions';
import { isCityExistsInFavorites } from '../../helpers/validations';
import CurrentWeather from '../currentWeather';
import AddToFavorites from '../addToFavorites';
import FiveDaysWeather from '../fiveDaysWeather';
import './style.css';

export default () => {
    const currentCityReducer = useSelector(state => state.currentCityReducer);
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const currentCityWeatherText = currentCityReducer.weather.text;
    const currentCityName = currentCityReducer.name;
    let currentCityKey = currentCityReducer.key;

    const setCurrentCityWeather = async () => {
        let currentCityData = [];

        if (isCityExistsInFavorites(currentCityName)) {
            currentCityData = getFavorites();
            dispatch({ type: 'CHANGE_IS_IN_FAVORITES', payload: true });
        } else if (!currentCityKey) {
            const fetchData = async () => {
                currentCityData = await getAutoCompleteValues(currentCityName);
                if (currentCityData.errorMessage) {
                    addToast(currentCityData.errorMessage, {
                        appearance: 'error',
                    })
                }
            }

            await fetchData();
        }

        if (!currentCityData.errorMessage && currentCityData.length) {
            const cityKey = getCityKey(currentCityName, currentCityData);
            dispatch({ type: 'CHANGE_CITY_KEY', payload: cityKey });
        }
    }

    useEffect(() => {
        setCurrentCityWeather();
    }, []);

    return (
        <div className="cityWeather_ctn">
            <div className="row currentWeather_addToFavorites_ctn">
                <CurrentWeather />
                <AddToFavorites />
            </div>
            <h3 className="row cityWeather_headline">{currentCityWeatherText}</h3>
            <div className="row">
                <FiveDaysWeather />
            </div>
        </div>
    );
}