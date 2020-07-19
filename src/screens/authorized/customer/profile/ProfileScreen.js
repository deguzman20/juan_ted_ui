import React, { memo } from 'react';
import {  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView,
  Alert } from 'react-native';

import { ListItem, Avatar } from 'react-native-elements';
import { ITEM_WIDTH, ITEM_HEIGHT, BACKEND_ASSET_URL } from './../../../../actions/types';

import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { customerLogoutAction } from './../../../../actions';

import Background from '../../../../components/Background';
import ChangePasswordScreen from './ChangePasswordScreen';
import CurrentLocationScreen from '../map/CurrentLocationScreen';
import LoginScreen from '../../../unauthorized/LoginScreen';

const ProfileScreen = ({ navigation, image, first_name, last_name, customerLogoutAction }) => {
  const _onLogoutPressed = () => {
    Alert.alert(
      "Are you sure you want to logout",
      "",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => {
            // customerLogoutAction();
            navigation.navigate('LoginScreen');
          } }
      ],
      { cancelable: false }
    );  
  }

  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Background>
          <SafeAreaView style={{ marginBottom: 25 }}/>
            <View>
              <Avatar
                xlarge
                rounded
                source={{ uri: `${BACKEND_ASSET_URL}/${image}` }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                size={150}
              />
            </View>
            <View>
              <Text style={styles.fullName}>{first_name} {last_name}</Text>
            </View>
            <View style={styles.container}>
              <ListItem
                key={1}
                title={'Change Password'}
                rightIcon={{ name: 'ac-unit' }}
                bottomDivider
                onPress={() => navigation.navigate('ChangePasswordScreen')}
              />
              <ListItem
                key={2}
                title={'Location'}
                rightIcon={{ name: 'map' }}
                bottomDivider
                onPress={() => navigation.navigate('CurrentLocationScreen')}
              />
              <ListItem
                key={3}
                title={'Notifications'}
                rightIcon={{ name: 'notifications-none' }}
                bottomDivider
                onPress={() => navigation.navigate('ChangePasswordScreen')}
              />
              <ListItem
                key={4}
                title={'Logout'}
                rightIcon={{ name: 'arrow-drop-down' }}
                onPress={() => { _onLogoutPressed() }}
              />
            </View>
        </Background>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop:30,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  fullName: {
    fontSize: 30,
    paddingTop: 20
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
  ProfileScreen: { screen: connect(mapStateToProps, { customerLogoutAction })(ProfileScreen) },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
  CurrentLocationScreen: { 
    screen: CurrentLocationScreen,
    navigationOptions: {
      title: 'profile',
      headerStyle: {}
    }
  },
  LoginScreen: { screen: LoginScreen }

}, { headerMode:'none' });

export default memo(createAppContainer(App));