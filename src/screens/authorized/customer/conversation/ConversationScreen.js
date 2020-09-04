import React, { memo, useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { 
  CUSTOMER_CONVERSATION_LIST, 
  UPDATE_CUSTOMER_GEOLOCATION } from './../../../../queries';
import { GOOGLE_PLACE_API_KEY } from './../../../../actions/types';
import Geolocation from '@react-native-community/geolocation';
import ConversationList from './ConversationList';
import MessageScreen from '../messages/MessageScreen';
import Loading from './../../../../components/atoms/loader/Loading';
import InternetConnectionChecker from './../../../../components/atoms/snackbar/InternetConnectionChecker';
import EmptyConversation from './../../../../components/molecules/empty_container/EmptyConversation';
import OutOfLocationService from './../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';

const ConversationScreen = ({ user_id, navigation }) => {
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(CUSTOMER_CONVERSATION_LIST, {
    variables: { user_id: parseInt(user_id) },
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
            customer_id: parseInt(user_id),
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

  if(loading || error) return null;
  // if(compoundCode !== ''){
  //   if(compoundCode.match(pattern)[0] === 'Parañaque'){
      if(data["conversationList"].length !== 0){
        return(
          <React.Fragment>
            <ScrollView>
              <ConversationList 
                data={data}
                loading={loading} 
                error={error}
                navigation={navigation}
              />
            </ScrollView>
            <InternetConnectionChecker />
          </React.Fragment>
        )
      }
      else{
        return <EmptyConversation />
      }
    // }
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
    user_id: customerReducer.id
  }
}

const App = createStackNavigator({
  ConversationScreen: { 
    screen: connect(mapStateToProps, null)(ConversationScreen),
    navigationOptions: {
      title: 'Messages',
      headerLeft: null
    }
  },
  MessageScreen: { 
    screen: MessageScreen
  }
})

export default memo(createAppContainer(App))
