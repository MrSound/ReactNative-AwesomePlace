import { createStore, combineReducers, compose } from 'redux';

import placesReducer from './reducers/places';

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const rootReducer = combineReducers({
    places: placesReducer
});

const configStore = () => {
    return createStore(rootReducer,composeEnhancers());
};

export default configStore;