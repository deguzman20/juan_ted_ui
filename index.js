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
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { NetworkProvider } from 'react-native-offline';
import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/dist/subscriptions/ActionCableLink';

import App from './App';

const httpLink = createHttpLink({
  uri: BASE_URL
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: {
    reconnect: true
  }
});

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
  // wsLink
)
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

if(__DEV__) {
  import('./reactotron-config').then(() => console.log('Reactotron Configured'))
}

const Application = () => {
  console.disableYellowBox = true;
  return(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate 
          loading={null} 
          persistor={persistor}
        >
          <NetworkProvider>
            <App/>
          </NetworkProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

AppRegistry.registerComponent(appName, () => Application);