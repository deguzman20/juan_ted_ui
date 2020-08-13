import React, { memo } from 'react';
import {  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView,
  Alert } from 'react-native';

import { ListItem, Avatar } from 'react-native-elements';
import { CUSTOMER_INFO } from '../../../../queries';
import { 
  ITEM_WIDTH, 
  ITEM_HEIGHT, 
  DEFAULT_URL } from './../../../../actions/types';

import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { customerLogoutAction } from './../../../../actions';
import { useNetInfo } from "@react-native-community/netinfo";

import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';
import Background from '../../../../components/Background';
import ChangePasswordScreen from './ChangePasswordScreen';
import EditProfileScreen from './EditProfileScreen';
import CurrentLocationScreen from '../map/CurrentLocationScreen';
import EditProfilePicScreen from './EditProfilePicScreen';

const ProfileScreen = ({ navigation, customer_id, customerLogoutAction }) => {
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(CUSTOMER_INFO, {
    variables: { customer_id: parseInt(customer_id) },
    pollInterval: 500
  });

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
            customerLogoutAction();
            navigation.navigate('LoginScreen');
          } 
        }
      ],
      { cancelable: false }
    );  
  }

  if(loading || error) return null;

  return (
    <React.Fragment>
      <Background>
        <SafeAreaView style={{ marginBottom: 25 }}/>
          <View>
            <Avatar
              xlarge
              rounded
              source={{ uri: `${DEFAULT_URL}/${data.customer[0].image}` }}
              onPress={() => {
                navigation.navigate('EditProfilePicScreen')
              }}
              activeOpacity={0.7}
              size={150}
            />
          </View>
          <View>
            <Text style={styles.fullName}>{data.customer[0].firstName} {data.customer[0].lastName}</Text>
          </View>
          <View style={styles.container}>
            <ListItem
              key={1}
              title={'Change Password'}
              rightIcon={{ name: 'ac-unit' }}
              bottomDivider
              onPress={() => netInfo.isConnected ? navigation.navigate('ChangePasswordScreen') : null }
            />
            <ListItem
              key={2}
              title={'Edit Profile'}
              rightIcon={{ name: 'account-circle' }}
              bottomDivider
              onPress={() => netInfo.isConnected ? navigation.navigate('EditProfileScreen') : null }
            />
            <ListItem
              key={3}
              title={'Location'}
              rightIcon={{ name: 'map' }}
              bottomDivider
              onPress={() => netInfo.isConnected ? navigation.navigate('CurrentLocationScreen') : null }
            />
            <ListItem
              key={4}
              title={'Logout'}
              rightIcon={{ name: 'arrow-drop-down' }}
              onPress={() => { _onLogoutPressed() }}
            />
          </View>
      </Background>
      <InternetConnectionChecker />
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
    customer_id: customerReducer.id,
  }
}

const App = createStackNavigator({
  ProfileScreen: { 
    screen: connect(mapStateToProps, { customerLogoutAction })(ProfileScreen),
    navigationOptions: {
      headerShown: false
    }
  },
  EditProfileScreen: {  
    screen: EditProfileScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  ChangePasswordScreen: { 
    screen: ChangePasswordScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  CurrentLocationScreen: { 
    screen: CurrentLocationScreen,
    navigationOptions: {
      headerTitle: 'My Current Location'
    }
  },
  EditProfilePicScreen: {
    screen: EditProfilePicScreen
  }
});

export default memo(createAppContainer(App));