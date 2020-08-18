import React, { memo, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { ITEM_WIDTH } from '../../../../actions/types';
import { connect } from 'react-redux';
import { FAVORATE_TASKER_BY_GEOLOCATION } from '../../../../queries';
import { useNetInfo } from "@react-native-community/netinfo";

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import DatePicker from 'react-native-datepicker';
import { useQuery } from 'react-apollo';

const ChooseDayScreen = ({ navigation, customer_id }) => {
  const today = new Date();
  const netInfo = useNetInfo();
  const dateToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const maxDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate() + 6);
  const [time, setTimeRange] = useState({ from: null, to: null });
  const [date, setDate] = useState({ date: dateToday });

  const [firstStyle, setFirstStyle] = useState({ color: 'black', backgroundColor: 'white' });
  const [secondStyle, setSecondStyle] = useState({ color: 'black', backgroundColor: 'white' });
  const [thirdStyle, setThirdStyle] = useState({ color: 'black', backgroundColor: 'white' });
  const [fourthStyle, setFourthStyle] = useState({ color: 'black', backgroundColor: 'white' });
  const [fifthStyle, setFifthStyle] = useState({ color: 'black', backgroundColor: 'white' });

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
        if(navigation.state.params.tasker_id === ""){
          navigation.navigate('TaskersScreen',{
            longitude: String(navigation.state.params.longitude), 
            latitude: String(navigation.state.params.latitude),
            start_from: `${date.date} ${time.from}`,
            start_to: `${date.date} ${time.to}`,
            service_type_id: navigation.state.params.service_type_id,
            services: navigation.state.params.services
          });
        }
        else{
          console.log(favorate_tasker_by_geolocation.data.favorateTaskerByGeolocation)
          if(favorate_tasker_by_geolocation.data.favorateTaskerByGeolocation.length !== 0){
            navigation.navigate('TaskerInfoScreen',{ 
              lng: String(navigation.state.params.longitude),
              lat: String(navigation.state.params.latitude),
              start_from: `${date.date} ${time.from}`,
              start_to: `${date.date} ${time.to}`,
              service_type_id: navigation.state.params.service_type_id,
              customer_id: parseInt(customer_id),
              tasker_id: parseInt(navigation.state.params.tasker_id),
              services: navigation.state.params.services
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
    if(data === 1){
      setFirstStyle({ color: 'white', backgroundColor: 'black' });
      setSecondStyle({ color: 'black', backgroundColor: 'white' });
      setThirdStyle({ color: 'black', backgroundColor: 'white' });
      setFourthStyle({ color: 'black', backgroundColor: 'white' });
      setFifthStyle({ color : 'black', backgroundColor: 'white' });
      setTimeRange({ from: '07:00:00', to: '10:00:00' })
    }
    else if(data === 2){
      setFirstStyle({ color: 'black', backgroundColor: 'white' });
      setSecondStyle({ color: 'white', backgroundColor: 'black' });
      setThirdStyle({ color: 'black', backgroundColor: 'white' });
      setFourthStyle({ color: 'black', backgroundColor: 'white' });
      setFifthStyle({ color: 'black', backgroundColor: 'white' });
      setTimeRange({ from: '10:00:00', to: '13:00:00' })
    }
    else if(data === 3){
      setFirstStyle({ color: 'black', backgroundColor: 'white' });
      setSecondStyle({ color: 'black', backgroundColor: 'white' });
      setThirdStyle({ color: 'white', backgroundColor: 'black' });
      setFourthStyle({ color: 'black', backgroundColor: 'white' });
      setFifthStyle({ color: 'black', backgroundColor: 'white' });
      setTimeRange({ from: '13:00:00', to: '16:00:00' })
    }
    else if(data === 4){
      setFirstStyle({ color: 'black', backgroundColor: 'white' });
      setSecondStyle({ color: 'black', backgroundColor: 'white' });
      setThirdStyle({ color: 'black', backgroundColor: 'white' });
      setFourthStyle({ color: 'white', backgroundColor: 'black' });
      setFifthStyle({ color: 'black', backgroundColor: 'white' });
      setTimeRange({ from: '16:00:00', to: '19:00:00' })
    }
    else if(data === 5){
      setFirstStyle({ color: 'black', backgroundColor: 'white' });
      setSecondStyle({ color: 'black', backgroundColor: 'white' });
      setThirdStyle({ color: 'black', backgroundColor: 'white' });
      setFourthStyle({ color: 'black', backgroundColor: 'white' });
      setFifthStyle({ color: 'white', backgroundColor: 'black' });
      setTimeRange({ from: '19:00:00', to: '22:00:00' })
    }
  }

  return(
    <React.Fragment>
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
      <View style={styles.buttonContainer}>
        <Button title="Next" 
          onPress={() => { _onNavigateToAvailableTaskerPressed() }} 
          buttonStyle={{ backgroundColor: "#009C3C" }}
        />
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

const styles = StyleSheet.create({
  containerRows: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
  },
  datePicker: {
    width: ITEM_WIDTH,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 20
  },
  buttonContainer: {
    width: ITEM_WIDTH,
    paddingLeft: '4%',
    paddingRight: '4s%',
    paddingTop: '5%'
  }
});

export default memo(connect(mapStateToProps, null)(ChooseDayScreen));