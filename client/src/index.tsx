// Vendors
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from "redux"
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

// Styles
import './index.css';
// Components
import App from './App';
// Reducers
import { LoginReducer } from './reducers/';
// Sagas
import { LoginSaga } from './sagas/';
// History
import { history } from './history'

const sagaMiddleware = createSagaMiddleware();
const STORE = createStore(
    LoginReducer,
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(LoginSaga)

ReactDOM.render(
    <Provider store={STORE}>
        <App store={STORE} history={history}/>
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
