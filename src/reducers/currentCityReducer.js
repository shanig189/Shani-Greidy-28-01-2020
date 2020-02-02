import defaultCityName from '../config/defaultCityName';

const initState = {
    name: defaultCityName,
    key: 0,
    weather: {
        icon: 0,
        text: '',
        temperature: {
            Metric: {
                Value: 0,
                Unit: "C",
            },
            Imperial: {
                Value: 0,
                Unit: "F",
            }
        }
    },
    isInFavorite: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_CITY_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'CHANGE_CITY_KEY':
            return {
                ...state,
                key: action.payload
            }
        case 'CHANGE_CITY_WEATHER':
            return {
                ...state,
                weather: {
                    ...state.weather,
                    icon: action.payload.icon,
                    text: action.payload.text,
                    temperature: {
                        ...state.weather.temperature,
                        Metric: {
                            ...state.weather.temperature.Metric,
                            Value: action.payload.temperature.Metric.Value,
                            Unit: action.payload.temperature.Metric.Unit
                        },
                        Imperial: {
                            ...state.weather.temperature.Imperial,
                            Value: action.payload.temperature.Imperial.Value,
                            Unit: action.payload.temperature.Imperial.Unit
                        }
                    }
                }
            }
        case 'CHANGE_IS_IN_FAVORITES':
            return {
                ...state,
                isInFavorite: action.payload
            }
        default:
            return state
    }
}