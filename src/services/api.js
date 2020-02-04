const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // for cors problem
const url = `${proxyUrl}http://dataservice.accuweather.com`;
const apiKey = 'LpR5wMyVyJWCKfSRlnzMaLGdQadcujxe';
const errorMessage = 'Server Error.';

const getReturnedData = (data) => {
    let returedData = data;

    if (data.fault) {
        returedData = { errorMessage };
    }else if(data.Message){
        returedData = { errorMessage: data.Message };
    }

    return returedData;
}

export const getAutoCompleteValues = async (val) => {
    try {
        const requestUrl = `${url}/locations/v1/cities/autocomplete`;
        const response = await fetch(`${requestUrl}?apikey=${apiKey}&q=${val}`);
        const data = await response.json();

        return getReturnedData(data);
    }
    catch (err) {
        return { errorMessage };
    }
}

export const getCurrentWeather = async (key) => {
    try {
        const requestUrl = `${url}/currentconditions/v1/${key}`;
        const response = await fetch(`${requestUrl}?apikey=${apiKey}`);
        const data = await response.json();

        return getReturnedData(data);
    }
    catch (err) {
        return { errorMessage };
    }
}

export const getFiveDaysWeather = async (key) => {
    try {
        const requestUrl = `${url}/forecasts/v1/daily/5day/${key}`;
        const response = await fetch(`${requestUrl}?apikey=${apiKey}&metric=true`);
        const data = await response.json();

        return getReturnedData(data);
    }
    catch (err) {
        return { errorMessage };
    }
}