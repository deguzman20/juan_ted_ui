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
import { DEFAULT_URL, GOOGLE_PLACE_API_KEY } from './../../../../actions/types';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { customerLogoutAction } from './../../../../actions';
import { useNetInfo } from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';
import ChangePasswordScreen from './ChangePasswordScreen';
import EditProfileScreen from './EditProfileScreen';

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import Background from '../../../../components/atoms/background/Background';
import Loading from '../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';

const ProfileScreen = ({ navigation, customer_id, customerLogoutAction }) => {
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(CUSTOMER_INFO, {
    variables: { customer_id: parseInt(customer_id) },
    pollInterval: 500
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        update_customer_geolocation({ 
          variables: {
            customer_id: parseInt(customer_id),
            lng: currentLongitude,
            lat: currentLatitude,
            formatted_address: ''
          }
        }).then(({ data }) => {
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLatitude},${currentLongitude}&key=${GOOGLE_PLACE_API_KEY}`)
          .then((response) => {
            if(response.data.plus_code.compound_code !== ''){
              setCompoundCode(response.data.plus_code.compound_code)
            }
          })
        })
      },
      (error) => alert(error.message),
      { 
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
      }
    )
  },[])

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
            customerLogoutAction()
            navigation.navigate('LoginScreen')
          } 
        }
      ],
      { cancelable: false }
    );  
  }

  if(loading || error) return null;
  // if(compoundCode !== ""){
  //   if(compoundCode.match(pattern)[0] === 'Parañaque'){
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
                  title={'Logout'}
                  rightIcon={{ name: 'arrow-drop-down' }}
                  onPress={() => { _onLogoutPressed() }}
                />
              </View>
          </Background>
          <InternetConnectionChecker />
        </React.Fragment>
      )
  //   }
  //   else{
  //     return <OutOfLocationService />
  //   }
  // }
  // else{
  //   return <Loading />
  // }
}

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
  }
})

export default memo(createAppContainer(App))