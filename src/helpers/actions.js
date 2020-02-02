import { DAYS } from '../constant';
import { getFavorites, setFavorites } from '../services/favoritesStorage';
import { isCityExistsInFavorites } from '../helpers/validations';

export const getAutoCompleteDataByKey = (key, data) => {
    let autoCompleteData = {};

    if (data.length) {
        data.forEach((elem) => {
            const elemValue = elem[key];
            autoCompleteData[elemValue] = null;
        }, this);
    }

    return autoCompleteData;
}

export const getCityKey = (cityName, cities) => {
    const currentCity = cities.length ? cities.filter(city => (city.LocalizedName || city.name) === cityName) : [];

    return currentCity.length ? (currentCity[0].Key || currentCity[0].key) : 0;
}

export const getIconNumberFormat = (iconNumber) => {
    let iconNumberString = iconNumber.toString(10);

    iconNumberString = ('0' + iconNumber).slice(-2);

    return iconNumberString;
}

export const getDayNameByISOString = (dateStr) => {
    const date = new Date(dateStr);
    const dayIndex = date.getDay();

    return DAYS[dayIndex];
}

export const addToFavorites = (favorite) => {
    const favorites = getFavorites();
    let isAddToFavorites = true;

    if (favorites.length) {
        if (isCityExistsInFavorites(favorite.name, favorites)) {
            isAddToFavorites = false;
        }
    }

    if (isAddToFavorites) {
        favorites.push(favorite);
        setFavorites(favorites);
    }
}

const getFavoriteIndexFromFavorites = (name, favorites) => {
    const index = favorites.findIndex(favoriteElem => favoriteElem.name === name);

    return index;
}

export const removeFromFavorites = (name) => {
    const favorites = getFavorites();

    if (favorites.length) {
        if (isCityExistsInFavorites(name, favorites)) {
            const favoriteIndex = getFavoriteIndexFromFavorites(name, favorites);
            favorites.splice(favoriteIndex, 1);
            setFavorites(favorites);
        }
    }
}

export const updateFavoriteInFavorites = (cityName, key, value) => {
    const favorites = getFavorites();
    const favoriteIndex = getFavoriteIndexFromFavorites(cityName, favorites);

    if(favorites[favoriteIndex] && favorites[favoriteIndex][key]){
        favorites[favoriteIndex][key] = value;
        setFavorites(favorites);
    }
}