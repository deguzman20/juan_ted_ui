/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from 'react-redux';
import {name as appName} from './app.json';
import ApolloClient from "apollo-boost";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BASE_URL } from './src/actions/types';
import { store, persistor } from './src/reducers/store';
import AsyncStorage from '@react-native-community/async-storage';
import App from './App';


const client = new ApolloClient({
  uri: `${BASE_URL}`
  // headers: {
  //   authorization: `bearer ${AsyncStorage.getItem('customer_auth_token')}`
  // }
});

if(__DEV__) {
  import('./reactotron-config').then(() => console.log('Reactotron Configured'))
}

const Application = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
  );

AppRegistry.registerComponent(appName, () => Application);