import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { ToastProvider } from 'react-toast-notifications';
import rootReducer from './reducers/rootReducer';
import Header from './components/header';
import Routes from './routes';
import './App.css'

const store = createStore(rootReducer);
const history = createBrowserHistory();

// autoDismiss
// autoDismissTimeout={6000}
export default () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <ToastProvider
                    placement="top-center"
                >
                    <div className="app_ctn">
                        <div className="row">
                            <Header />
                        </div>
                        <div className="row">
                            {Routes}
                        </div>
                    </div>
                </ToastProvider>
            </Router>
        </Provider>
    );
}