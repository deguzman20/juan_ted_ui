/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BASE_URL, API_WS_ROOT } from './src/actions/types';
import { store, persistor } from './src/reducers/store';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/dist/subscriptions/ActionCableLink';
import { ApolloLink } from 'apollo-link';
import App from './App';

const httpLink = createHttpLink({
  uri: BASE_URL
})

const cable = ActionCable.createConsumer(API_WS_ROOT)

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription',
  )
}

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  httpLink
)
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

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