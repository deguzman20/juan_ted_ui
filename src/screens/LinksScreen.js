import React, { Component, memo } from 'react';
import { Query } from 'react-apollo';
import { View, Text } from 'react-native';
import { LINKS, NEW_LINKS } from '../queries';
import LinkScreen from './LinkScreen';

class LinksScreen extends Component {
  _subscribeToNewLinks = subscribeToMore => {
    subscribeToMore({
      document: NEW_LINKS,
      // updateQuery: (prev, { subscriptionData }) => {
      //   if (!subscriptionData.data) return prev

      //   const newLink = subscriptionData.data.newLink

      //   return Object.assign({}, prev, {
      //     links: [newLink, ...prev.links],
      //     __typename: prev.links.__typename
      //   })
      // }
    })
  }

  render() {
    return (
      <Query query={LINKS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error</Text>

          this._subscribeToNewLinks(subscribeToMore)

          const linksToRender = data.links;

          return (
            <View>
              <Text>Neat Links</Text>
              <View>
                {linksToRender.map(link => <LinkScreen key={link.id} link={link} />)}
              </View>
            </View>
          )
        }}
      </Query>
    )
  }
}

export default memo(LinksScreen);