/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import {name as appName} from './app.json';
import ApolloClient from "apollo-boost";
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './src/reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Text } from 'react-native';
import App from './App';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const composeStoreWithMiddleware = applyMiddleware(promiseMiddleware)
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools(composeStoreWithMiddleware))
const persistor = persistStore(store)

const Application = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
  );

AppRegistry.registerComponent(appName, () => Application);
