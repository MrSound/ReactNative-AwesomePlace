import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import React from 'react';

import App from './App';
import configStore from './src/store/configStore';

const store = configStore();

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('rncourse', () => RNRedux);
