import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/css/custom.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import requestReducer from './store/reducers/requestReducer';
import loginReducer from './store/reducers/loginReducer';
import userReducer from './store/reducers/userReducer';
import buildingReducer from './store/reducers/buildingReducer';
import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { PersistGate } from 'redux-persist/integration/react';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    request: requestReducer,
    login: loginReducer,
    user: userReducer,
    building: buildingReducer
});

const persistConfig={
    key:'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const pReducer= persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore (store);

const app = (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);


//asadad
ReactDOM.render( app , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();