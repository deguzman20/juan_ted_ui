import React, { memo, useState, useEffect } from 'react';
import {  
  View,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';
import { Card, Text } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/customer/my_tasker/TaskerServiceStyle';
import { connect } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { 
  CUSTOMER_SERVICE_TYPE_LIST, 
  UPDATE_CUSTOMER_GEOLOCATION } from '../../../../queries';
import { DEFAULT_URL, GOOGLE_PLACE_API_KEY } from '../../../../actions/types';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import Loading from '../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';


const TaskerServiceScreen = ({ navigation, customer_id }) =>{
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(CUSTOMER_SERVICE_TYPE_LIST, {
    variables: {
      tasker_id: navigation.state.params.tasker_id
    },
    pollInterval: 700
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        console.log(currentLatitude)
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

  navigateToService = (id) => {
    if(id === 1){
      if(netInfo.isConnected){
        navigation.navigate('BarberScreen', 
        { 
          service_type_id: id,
          tasker_id: navigation.state.params.tasker_id
        })
      }
    }
    else if(id === 2){
      if(netInfo.isConnected){
        navigation.navigate('HairSalonScreen', 
        { 
          service_type_id: id,
          tasker_id: navigation.state.params.tasker_id
        })
      }
    }
  }

  if(loading || error) return null;

  // if(compoundCode !== ""){
  //   if(compoundCode.match(pattern)[0] === 'Parañaque'){
      return(
        <React.Fragment>
          <SafeAreaView />
          <View style={styles.container}>
            <View style={styles.container_row}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text h4 style={styles.txt_services_txt}>Services</Text>
                </View>
                <FlatList style={{ margin:5 }}
                  numColumns={1}
                  data={[data['taskerServiceTypeList'][0]['serviceType']]}
                  keyExtractor={(item) => item.id }
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => { navigateToService(parseInt(item.id))}}>
                      <Card
                        title={item.name} 
                        key={item.id}
                      >
                        <Image 
                          style={styles.image} 
                          source={{  uri: `${DEFAULT_URL}/${item.image}` }}  
                        />
                      </Card>
                    </TouchableWithoutFeedback>
                  )}
                />       
              </ScrollView>
              <InternetConnectionChecker />
            </View>
          </View>
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
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(TaskerServiceScreen))