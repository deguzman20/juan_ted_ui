import React, { memo } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { TASKER_APPOINTMENT_LIST } from '../../../queries';
import RNSchedule from 'rnschedule';
import { createAppContainer } from 'react-navigation';
import TransactionInfoScreen from './transaction_info/TransactionInfoScreen';


const AppointmentScreen = ({ tasker_id, navigation }) => {
  const arr = []
  const { loading, error, data } = useQuery(TASKER_APPOINTMENT_LIST, {
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 500,
  });

  const getParsedDate = (date) => {
    var date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
  }

  if(loading || error) return null;

  data.taskerAppointmentList.map((ap) => {  
    arr.push({
      title: 'Appointment',
      subtitle: `with ${ap.customer.firstName} ${ap.customer.lastName}`,
      start: new Date(...getParsedDate(`${ap.from}`)), 
      end: new Date(...getParsedDate(`${ap.to}`)),
      color: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
      id: `${ap.id}`
    })
  })


  return(
    <React.Fragment>
      <SafeAreaView/>
      <RNSchedule
        dataArray={arr}
        onEventPress={(appt) => {
          navigation.navigate('TransactionInfoScreen', {
            transaction_id: parseInt(appt.id)
          })
        }}
        accentColor="black"
      />
    </React.Fragment>
  )
}

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

const App = createStackNavigator({
  AppointmentScreen: { 
    screen: connect(mapStateToProps, null)(AppointmentScreen),
    navigationOptions: {
      title: ''
    }
  },
  TransactionInfoScreen: {
    screen: TransactionInfoScreen,
    navigationOptions: {
      title: ''
    }
  }
});

export default memo(createAppContainer(App));