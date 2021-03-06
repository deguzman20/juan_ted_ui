import React, { memo, useState } from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-elements';
import { useQuery } from 'react-apollo';
import { FAVORATE_TASKER_BY_GEOLOCATION } from '../../../../queries';
import { connect } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";

import { styles } from './../../../../styles/authorized/customer/date_time/ChooseDayStyle'
import { formatMoney } from '../../../../core/utils';

import isEqual from 'lodash/isEqual';

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import DatePicker from 'react-native-datepicker';

const ChooseDayScreen = ({ navigation, customer_id }) => {
  const today = new Date()
  const netInfo = useNetInfo()
  const dateToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
  const maxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate() + 6)
  const [time, setTimeRange] = useState({ from: null, to: null })
  const [date, setDate] = useState({ date: dateToday })

  const [firstStyle, setFirstStyle] = useState({ color: 'black', backgroundColor: 'white' })
  const [secondStyle, setSecondStyle] = useState({ color: 'black', backgroundColor: 'white' })
  const [thirdStyle, setThirdStyle] = useState({ color: 'black', backgroundColor: 'white' })
  const [fourthStyle, setFourthStyle] = useState({ color: 'black', backgroundColor: 'white' })
  const [fifthStyle, setFifthStyle] = useState({ color: 'black', backgroundColor: 'white' })

  const favorate_tasker_by_geolocation = useQuery(FAVORATE_TASKER_BY_GEOLOCATION, {
    variables: {
      tasker_id: parseInt(navigation.state.params.tasker_id),
      lng: String(navigation.state.params.longitude),
      lat: String(navigation.state.params.latitude),  
      service_type_id:  navigation.state.params.service_type_id,
      start_from: `${date.date} ${time.from}`,
      start_to: `${date.date} ${time.to}`
    },
    pollInterval: 700
  })

  const _onNavigateToAvailableTaskerPressed = () => {
    if(netInfo.isConnected){
      if(time.from !== null && time.to !== null){
        if(isEqual(navigation.state.params.tasker_id, "")){
          navigation.navigate('TaskersScreen',{
            formatted_address: navigation.state.params.formatted_address, 
            longitude: String(navigation.state.params.longitude),
            latitude: String(navigation.state.params.latitude),
            start_from: `${date.date} ${time.from}`,
            start_to: `${date.date} ${time.to}`,
            service_type_id: navigation.state.params.service_type_id,
            services: navigation.state.params.services,
            service_details: navigation.state.params.service_details,
            total_price: navigation.state.params["total_price"]
          });
        }
        else{
          if(favorate_tasker_by_geolocation.data.favorateTaskerByGeolocation.length !== 0){
            navigation.navigate('TaskerInfoScreen',{ 
              formatted_address: navigation.state.params.formatted_address, 
              lng: String(navigation.state.params.longitude),
              lat: String(navigation.state.params.latitude),
              start_from: `${date.date} ${time.from}`,
              start_to: `${date.date} ${time.to}`,
              service_type_id: navigation.state.params.service_type_id,
              customer_id: parseInt(customer_id),
              tasker_id: parseInt(navigation.state.params.tasker_id),
              services: navigation.state.params.services,
              service_details: navigation.state.params.service_details,
              total_price: navigation.state.params["total_price"]
            })
          }
          else{
            Alert.alert("Please select different date and time")
          }
        }
      }
      else{ 
        Alert.alert("Please select time");
      }
    }
  }

  const hoverizedCard = (data) => {
    if(isEqual(data, 1)){
      setFirstStyle({ color: 'white', backgroundColor: 'black' })
      setSecondStyle({ color: 'black', backgroundColor: 'white' })
      setThirdStyle({ color: 'black', backgroundColor: 'white' })
      setFourthStyle({ color: 'black', backgroundColor: 'white' })
      setFifthStyle({ color : 'black', backgroundColor: 'white' })
      setTimeRange({ from: '07:00:00', to: '10:00:00' })
    }
    else if(isEqual(data, 2)){
      setFirstStyle({ color: 'black', backgroundColor: 'white' })
      setSecondStyle({ color: 'white', backgroundColor: 'black' })
      setThirdStyle({ color: 'black', backgroundColor: 'white' })
      setFourthStyle({ color: 'black', backgroundColor: 'white' })
      setFifthStyle({ color: 'black', backgroundColor: 'white' })
      setTimeRange({ from: '10:00:00', to: '13:00:00' })
    }
    else if(isEqual(data, 3)){
      setFirstStyle({ color: 'black', backgroundColor: 'white' })
      setSecondStyle({ color: 'black', backgroundColor: 'white' })
      setThirdStyle({ color: 'white', backgroundColor: 'black' })
      setFourthStyle({ color: 'black', backgroundColor: 'white' })
      setFifthStyle({ color: 'black', backgroundColor: 'white' })
      setTimeRange({ from: '13:00:00', to: '16:00:00' })
    }
    else if(isEqual(data, 4)){
      setFirstStyle({ color: 'black', backgroundColor: 'white' })
      setSecondStyle({ color: 'black', backgroundColor: 'white' })
      setThirdStyle({ color: 'black', backgroundColor: 'white' })
      setFourthStyle({ color: 'white', backgroundColor: 'black' })
      setFifthStyle({ color: 'black', backgroundColor: 'white' })
      setTimeRange({ from: '16:00:00', to: '19:00:00' })
    }
    else if(isEqual(data, 5)){
      setFirstStyle({ color: 'black', backgroundColor: 'white' })
      setSecondStyle({ color: 'black', backgroundColor: 'white' })
      setThirdStyle({ color: 'black', backgroundColor: 'white' })
      setFourthStyle({ color: 'black', backgroundColor: 'white' })
      setFifthStyle({ color: 'white', backgroundColor: 'black' })
      setTimeRange({ from: '19:00:00', to: '22:00:00' })
    }
  }

  return(
    <React.Fragment>
      <View style={{ flex: 6.5 }}>
        <DatePicker
          style={styles.datePicker}
          date={date.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate={`${dateToday}`}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {setDate({ date: date })}}
        />
        <TouchableWithoutFeedback onPress={() => { hoverizedCard(1) }}>
          <Card 
            wrapperStyle={{ backgroundColor: firstStyle.backgroundColor }} 
            containerStyle={{ backgroundColor: firstStyle.backgroundColor }}
          >
            <View style={styles.containerRows}>
              <Text h4 style={{ color: firstStyle.color }}>7:00 AM - 10:00 AM</Text>
            </View>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { hoverizedCard(2) }}>
          <Card 
            wrapperStyle={{ backgroundColor: secondStyle.backgroundColor }}
            containerStyle={{ backgroundColor: secondStyle.backgroundColor }}
          >
            <View style={styles.containerRows}>
              <Text h4 style={{ color: secondStyle.color }}>10:00 AM - 01:00 PM</Text>
            </View>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { hoverizedCard(3) }}> 
          <Card 
            wrapperStyle={{ backgroundColor: thirdStyle.backgroundColor }}
            containerStyle={{ backgroundColor: thirdStyle.backgroundColor }}
          >
            <View style={styles.containerRows}>
              <Text h4 style={{ color: thirdStyle.color }}>01:00 PM - 04:00 PM</Text>
            </View>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { hoverizedCard(4) }}>
          <Card 
            wrapperStyle={{ backgroundColor: fourthStyle.backgroundColor }}
            containerStyle={{ backgroundColor: fourthStyle.backgroundColor }}
          >
            <View style={styles.containerRows}>
              <Text h4 style={{  color: fourthStyle.color }}>04:00 PM - 07:00 PM</Text>
            </View>
          </Card>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { hoverizedCard(5) }}>
          <Card 
            wrapperStyle={{ backgroundColor: fifthStyle.backgroundColor }}
            containerStyle={{ backgroundColor: fifthStyle.backgroundColor }}
          >
            <View style={styles.containerRows}>
              <Text h4 style={{  color: fifthStyle.color }}>07:00 PM : 10:00 PM</Text>
            </View>
          </Card>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.second_box_wrapper}>
          <View style={{ flexDirection: 'row' }}>
              <View style={styles.amount_wrapper}>
                <Text style={styles.total_amount_txt}>
                  Total Amount
                </Text>
              </View>
              <View style={styles.amount_value_wrapper}>
                <Text style={styles.total_amount_value_txt}>
                  ₱ {formatMoney(navigation.state.params["total_price"])}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
          <Button 
            style={styles.next_button} 
            title="Next" 
            onPress={() =>{  _onNavigateToAvailableTaskerPressed() }} 
            buttonStyle={styles.next_button_background_color} />
        </View>
      </View>
      <InternetConnectionChecker /> 
    </React.Fragment>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ChooseDayScreen))