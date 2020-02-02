import { getFavorites } from '../services/favoritesStorage';

export const isOnlyEnglishLetters = (str) => {
    const regexPattern = /^[a-zA-Z\s]+$/;
    let isEnglishLetters = false;

    if(regexPattern.test(str)){
        isEnglishLetters = true;
    }

    return isEnglishLetters;
}

const isElementExistsInDataArr = (name, dataArr) => {
    let isExists = false;

    if (dataArr.some(elem => elem.name === name)) {
        isExists = true;
    }

    return isExists;
}

export const isCityExistsInFavorites = (cityName, favorites) => {
    let favoritesArr = favorites ? favorites : getFavorites();

    return isElementExistsInDataArr(cityName, favoritesArr);
}

export const isCityExistsInAutoCompleteData = (cityName, autoCompleteDataArr) => {
    return isElementExistsInDataArr(cityName, autoCompleteDataArr);
}