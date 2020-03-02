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
import { Text } from 'react-native';
import App from './App';
import { store, persistor } from './src/reducers/store';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

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