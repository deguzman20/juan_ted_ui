import React, { memo, useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/tasker/profile/ProfileStyle';
import { TASKER_INFO, UPDATE_TASKER_GEOLOCATION } from '../../../../queries';
import { DEFAULT_URL, GOOGLE_PLACE_API_KEY } from './../../../../actions/types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { taskerLogoutAction } from './../../../../actions';
import { useNetInfo } from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';

import ChangePasswordScreen from './ChangePasswordScreen';
import EditProfileScreen from './EditProfileScreen';
import MySkillsScreen from './MySkillsScreen';

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import Background from '../../../../components/atoms/background/Background';
import Loading from '../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';

const ProfileScreen = ({ navigation, tasker_id, taskerLogoutAction }) => {
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_tasker_geolocation] = useMutation(UPDATE_TASKER_GEOLOCATION)
  const { loading, error, data } = useQuery(TASKER_INFO, {
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 500
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        update_tasker_geolocation({ 
          variables: {
            tasker_id: parseInt(tasker_id),
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
            taskerLogoutAction()
            navigation.navigate('LoginScreen');
          } 
        }
      ],
      { cancelable: false }
    )
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
                  source={{ uri: `${DEFAULT_URL}/${data.tasker[0].image }` }}
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
                  title={'My Skills'}
                  rightIcon={{ name: 'work' }}
                  bottomDivider
                  onPress={() => { netInfo.isConnected ? navigation.navigate('MySkillsScreen') : null } }
                />
                <ListItem
                  key={3}
                  title={'Change Password'}
                  rightIcon={{ name: 'ac-unit' }}
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

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

const App = createStackNavigator({
  ProfileScreen: {
    screen: connect(mapStateToProps, { taskerLogoutAction })(ProfileScreen),
    navigationOptions: {
      headerShown: false
    }
  },
  MySkillsScreen: { 
    screen: MySkillsScreen,
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