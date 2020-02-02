import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFavorites } from '../../services/favoritesStorage';
import { removeFromFavorites } from '../../helpers/actions';
import Favorite from '../../components/favorite';
import './style.css';

export default () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [favoritesData, setFavoritesData] = useState(getFavorites());

    useEffect(() => {
        dispatch({ type: 'CHANGE_LINK', payload: 'Favorites' });
    }, []);

    const handleOnDeleteFavoriteClick = (cityName) => {
        removeFromFavorites(cityName);
        const updatedFavorites = getFavorites();
        setFavoritesData(updatedFavorites);
    }

    const handleOnFavoriteClick = (cityName, cityKey) => {
        dispatch({ type: 'CHANGE_CITY_NAME', payload: cityName });
        dispatch({ type: 'CHANGE_CITY_KEY', payload: cityKey });
        history.push('/');
    }

    const favorites = favoritesData.map((favorite, index) =>
        <Favorite key={index}
            cityName={favorite.name}
            cityKey={favorite.key}
            cityWeather={favorite.weather}
            onDeleteFavoriteClick={handleOnDeleteFavoriteClick}
            onFavoriteClick={handleOnFavoriteClick}
        />
    )

    return (
        <div className="favorites_ctn">
            {
                favorites.length
                    ?
                    favorites
                    :
                    <h4>No favorites</h4>
            }
        </div>
    );
}