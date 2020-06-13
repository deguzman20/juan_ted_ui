import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { StyleSheet, SafeAreaView, View, Dimensions, Text } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements'

import Background from '../components/Background';
import ChangePasswordScreen from './ChangePasswordScreen';

const ProfileScreen = ({ navigation, email, image, first_name, last_name }) => {
  const image_nil = image === null ? "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" : image
  return (
    <>
      <Background>
        <SafeAreaView style={{ marginBottom: 200 }}/>
          <View>
            <Avatar
              xlarge
              rounded
              source={{uri: image_nil}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          </View>
          <View>
            <Text style={{fontSize: 20}}>{first_name} {last_name}</Text>
          </View>
          <List style={styles.list}>
            <View style={styles.container}>
              <ListItem
                roundAvatar
                title={"Account"}
                subtitle={`${email}`}
                hideChevron={true}
              />
              <ListItem
                roundAvatar
                title={"Change Password"}
                onPress={() => navigation.navigate('ChangePasswordScreen')}
              />
              <ListItem
                roundAvatar
                title={"Location"}
              />
              {/* <ListItem
                roundAvatar
                title={"Promos"}
              />
              <ListItem
                roundAvatar
                title={"Notifications"}
              />
              <ListItem
                roundAvatar
                title={"Support"}
              /> */}
              <ListItem
                roundAvatar
                title={"Logout"}
              />
            </View>
          </List>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
});

const mapStateToProps = ({ customerReducer }) => {
  return {
    email: customerReducer.email,
    image: customerReducer.image,
    first_name: customerReducer.first_name,
    last_name: customerReducer.last_name
  }
}

const App = createStackNavigator({
  ProfileScreen: { screen: connect(mapStateToProps, null)(ProfileScreen) },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
}, { headerMode:'none' });

export default memo(createAppContainer(App));