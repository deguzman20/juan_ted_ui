import React, { memo } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import Background from '../components/Background';
import { Query } from 'react-apollo';
import { CONVERSATION_LIST } from '../queries';
import { connect } from 'react-redux';

const ConversationScreen = ({ itemWidth, data, user_id }) => {
  const list = [{
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman'
  }]

  return(
    <Background>
      <View style={styles.container}>
        <Query 
          query={CONVERSATION_LIST} 
          variables={{ user_id: parseInt(1), is_customer: true }}
        >
          {({ loading, data, error }) => {
            if(loading) return <Text>Loading</Text>;
            if(error) return <Text>Error</Text>;
            console.log(data)
            return(
              <Text>
                asa
              </Text>
            )
          }}
          {/* {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
                bottomDivider
              />
            ))
          } */}
        </Query>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop:30
  }
})

const mapStateToProps = ({ customerReducer }) => {
  return {
    user_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ConversationScreen))