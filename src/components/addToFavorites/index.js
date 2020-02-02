import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../helpers/actions';
import { isCityExistsInFavorites } from '../../helpers/validations';
import './style.css';

let isAddToFavorites = false;

export default () => {
    const currentCityReducer = useSelector(state => state.currentCityReducer);
    const [isInFavorites, setIsInFavorites] = useState(false);
    const currentCityName = currentCityReducer.name;
    const addToFavoritesIconRef = useRef();
    const addToFavoritesBtnRef = useRef();

    useEffect(() => {
        if (isCityExistsInFavorites(currentCityName)) {
            isAddToFavorites = true;
            setIsInFavorites(true);
        }
    }, []);

    useEffect(() => {
        if (isCityExistsInFavorites(currentCityName)) {
            isAddToFavorites = true;
            setIsInFavorites(true);
        } else {
            isAddToFavorites = false;
            setIsInFavorites(false);
        }
    }, [currentCityName]);

    useEffect(() => {
        if (isInFavorites) {
            addToFavoritesIconRef.current.innerHTML = 'favorite';
            addToFavoritesBtnRef.current.innerHTML = 'Remove from favorites';
        } else {
            addToFavoritesIconRef.current.innerHTML = 'favorite_border';
            addToFavoritesBtnRef.current.innerHTML = 'Add to favorites';
        }
    }, [isInFavorites]);
    
    const handleAddToFavoritesBtnClick = () => {
        isAddToFavorites = !isAddToFavorites;

        if (isAddToFavorites) {
            addToFavorites(currentCityReducer);
        } else {
            removeFromFavorites(currentCityName);
        }

        setIsInFavorites(isAddToFavorites);
    }

    return (
        <div className="addToFavorites_ctn">
            <i className="material-icons addToFavorites_favorite_icon" ref={addToFavoritesIconRef}>favorite_border</i>
            <a className="waves-effect waves-light btn-small addToFavorites_favorites_btn"
                ref={addToFavoritesBtnRef}
                onClick={() => { handleAddToFavoritesBtnClick() }}
            >
                Add to favorites
            </a>
        </div>
    );
}