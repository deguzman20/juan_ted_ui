import React, { memo, useState, useEffect } from 'react';
import {  
  SafeAreaView, 
  View, 
  Text, 
  Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/customer/profile/ProfileStyle';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CUSTOMER_INFO, UPDATE_CUSTOMER_GEOLOCATION } from '../../../../queries';
import { DEFAULT_URL } from './../../../../actions/types';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { customerLogoutAction } from './../../../../actions';
import { useNetInfo } from "@react-native-community/netinfo";
import { _androidRequestPermissions, _iosRequestPermissions } from '../../../../helpers/location';
import * as OpenAnything from 'react-native-openanything';
import Loader from "react-native-modal-loader";
import Icon from 'react-native-vector-icons/Fontisto'

import isEqual from 'lodash/isEqual';

import ChangePasswordScreen from './ChangePasswordScreen';
import EditProfileScreen from './EditProfileScreen';
import CustomerImage from './CustomerImage';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import Background from '../../../../components/atoms/background/Background';
import OutOfLocationService from '../../../../components/molecules/out_of_location_service/OutOfLocationService';

const ProfileScreen = ({ navigation, customer_id, customerLogoutAction }) => {
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [isLoading, setLoading] = useState(false)
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(CUSTOMER_INFO, {
    variables: { customer_id: parseInt(customer_id) },
    pollInterval: 500
  });

  useEffect(() => {
    if(Platform.OS === 'ios'){
      _iosRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
    else {
      _androidRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
  },[]);
  
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
            setLoading(true)
            setTimeout(() => {
              for(let i = 1; i <= 3; i++){
                if(i === 3){
                  setLoading(false)
                  customerLogoutAction()
                  navigation.navigate('LoginScreen');
                }
              }
            },3000)
          } 
        }
      ],
      { cancelable: false }
    );  
  };

  if(loading || error) return null;
  const { image, firstName, lastName } = data.customer[0];
  // if(compoundCode !== ''){
  //   if(compoundCode.match(pattern) !== null){
      return (
        <>
          <Background>
            <SafeAreaView style={{ marginBottom: 25 }}/>
              <View>
                <Avatar
                  xlarge
                  rounded
                  // icon={{ name: 'account-circle' }}
                  source={{ uri: !isEqual(image, '') ?  `${DEFAULT_URL}/${image}` : require('../../../../assets/blank_photo.jpg') }}
                  onPress={() => {
                    navigation.navigate('CustomerImage')
                  }}
                  activeOpacity={0.7}
                  size={150}
                />
              </View>
              <View>
                <Text style={styles.fullName}>{firstName} {lastName}</Text>
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
                  title={'Contact Us'}
                  rightIcon={ 
                    <Icon 
                      name={"messenger"}
                      size={20}
                    />
                   }
                  onPress={() => { OpenAnything.Web('https://m.me/andy.dangas') }}
                />

                <ListItem
                  key={4}
                  title={'Logout'}
                  rightIcon={{ name: 'arrow-drop-down' }}
                  onPress={() => { _onLogoutPressed() }}
                />
              </View>
              <Loader loading={isLoading} color="#ff66be" />
          </Background>
          <InternetConnectionChecker />
        </>
      );
  //   }
  //   else{
  //     return <OutOfLocationService />
  //   }
  // }
  // else{
  //   return <Loading />
  // }
};

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id,
  }
};

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
  CustomerImage: { 
    screen: CustomerImage,
    navigationOptions: {
      headerShown: false
    }
  }
});

export default memo(createAppContainer(App));