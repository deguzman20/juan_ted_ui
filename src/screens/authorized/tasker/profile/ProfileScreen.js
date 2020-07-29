import React, { memo } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView,
  Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { TASKER_INFO } from '../../../../queries';
import {
  ITEM_WIDTH, 
  ITEM_HEIGHT, 
  BACKEND_ASSET_URL } from './../../../../actions/types';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { taskerLogoutAction } from './../../../../actions';
import { useNetInfo } from "@react-native-community/netinfo";

import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';
import Background from '../../../../components/Background';
import ChangePasswordScreen from './ChangePasswordScreen';
import EditProfileScreen from './EditProfileScreen';
import LoginScreen from '../../../unauthorized/LoginScreen';

const ProfileScreen = ({ navigation, tasker_id, customerLogoutAction }) => {
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(TASKER_INFO, {
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 500
  });

  _onLogoutPressed = () => {
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

  if(loading || error) return null;

  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Background>
          <SafeAreaView style={{ marginBottom: 25 }}/>
            <View>
              <Avatar
                xlarge
                rounded
                source={{ uri: `${BACKEND_ASSET_URL}/${data.tasker[0].image }` }}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                size={150}
              />
            </View>
            <View>
              <Text style={styles.fullName}>{data.tasker[0].firstName } {data.tasker[0].lastName }</Text>
            </View>
            <View style={styles.container}>
              <ListItem
                key={1}
                title={'Edit Profile'}
                rightIcon={{ name: 'account-circle' }}
                bottomDivider
                onPress={() => { netInfo.isConnected ? navigation.navigate('EditProfileScreen') : null } }
              />
              <ListItem
                key={2}
                title={'Change Password'}
                rightIcon={{ name: 'ac-unit' }}
                bottomDivider
                onPress={() => { netInfo.isConnected ? navigation.navigate('ChangePasswordScreen') : null }}
              />
              <ListItem
                key={3}
                title={'Notifications'}
                rightIcon={{ name: 'notifications-none' }}
                bottomDivider
                onPress={() => { netInfo.isConnected ? navigation.navigate('ChangePasswordScreen') : null }}
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


const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
    // image: taskerReducer.image,
    // first_name: taskerReducer.first_name,
    // last_name: taskerReducer.last_name
  }
}


const App = createStackNavigator({
  ProfileScreen: { screen: connect(mapStateToProps, { taskerLogoutAction })(ProfileScreen) },
  EditProfileScreen: { screen: EditProfileScreen },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
  LoginScreen: { screen: LoginScreen }

}, { headerMode:'none' });

export default memo(createAppContainer(App));