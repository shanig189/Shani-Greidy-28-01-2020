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

export default () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <ToastProvider
                    autoDismiss
                    autoDismissTimeout={6000}
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