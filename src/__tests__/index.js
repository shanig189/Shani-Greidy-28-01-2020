import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { isValidPinCode } from '../helpers/validations';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});