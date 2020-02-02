import React, { useState, useCallback, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, Icon } from 'react-materialize';
import { getAutoCompleteValues } from '../../services/api';
import { getAutoCompleteDataByKey, getCityKey } from '../../helpers/actions';
import { isOnlyEnglishLetters, isCityExistsInFavorites } from '../../helpers/validations';
import { isCityExistsInAutoCompleteData } from '../../helpers/validations';
import './style.css';

export default () => {
  const currentCityReducer = useSelector(state => state.currentCityReducer);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [autoCompleteCitiesData, setAutoCompleteCitiesData] = useState({});
  const [inputValidationErr, setInputValidationErr] = useState('');
  const currentCityName = currentCityReducer.name;
  const autoCompleteRef = useRef();
  let citiesData = [];

  const fetchData = async (value) => {
    citiesData = await getAutoCompleteValues(value);
    if (citiesData.errorMessage) {
      addToast(citiesData.errorMessage, {
        appearance: 'error',
      })
    }
  }

  const handleOnKeyUp = useCallback(async (e) => {
    const value = e.target.value;
    if (isOnlyEnglishLetters(value)) {
      setInputValidationErr('');
      await fetchData(value);
      const cityNames = getAutoCompleteDataByKey("LocalizedName", citiesData);
      setAutoCompleteCitiesData(Object.assign(autoCompleteCitiesData, cityNames));
    } else {
      value !== '' && (setInputValidationErr('City name must only contain english characters'));
    }
  }, [])

  const updateAutoCompleteValue = (value) => {
    autoCompleteRef.current._autocomplete.defaultValue = value;
    autoCompleteRef.current.instance.el.value = value;
    autoCompleteRef.current.instance.$el.value = value;
    autoCompleteRef.current.state.value = value;
  }

  const handleOnAutoComplete = async (value) => {
    const cityName = value;
    if (citiesData.length) {
      if (!isCityExistsInAutoCompleteData(cityName, citiesData)) {
        await fetchData(value);
      }
      const cityKey = getCityKey(cityName, citiesData);
      const isCityInFavorites = isCityExistsInFavorites(cityName);

      dispatch({ type: 'CHANGE_IS_IN_FAVORITES', payload: isCityInFavorites });
      dispatch({ type: 'CHANGE_CITY_NAME', payload: cityName });
      dispatch({ type: 'CHANGE_CITY_KEY', payload: cityKey });
    }

    updateAutoCompleteValue(cityName);
  }

  return (
    <div className="search_ctn">
      <div className="input-field">
        <Autocomplete
          ref={autoCompleteRef}
          icon={<Icon className="search_icon">search</Icon>}
          value={currentCityName}
          className="autocomplete"
          options={{
            data: autoCompleteCitiesData,
            onAutocomplete: handleOnAutoComplete
          }}
          placeholder="City Name"
          onKeyUp={handleOnKeyUp}
        />
      </div>
      {
        inputValidationErr &&
        (<div className="search_input_err_ctn">
          <span className="search_input_err">
            {inputValidationErr}
          </span>
        </div>)
      }
    </div>
  );
}