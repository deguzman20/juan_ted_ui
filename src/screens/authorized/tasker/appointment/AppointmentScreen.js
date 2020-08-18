import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { TASKER_APPOINTMENT_LIST } from '../../../../queries';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RNSchedule from 'rnschedule';
import TransactionInfoScreen from '../transaction_info/TransactionInfoScreen';
import CustomerRequestScreen from '../customer_request/CustomerRequestScreen';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

const AppointmentScreen = ({ tasker_id, navigation }) => {
  const arr = []
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(TASKER_APPOINTMENT_LIST, {
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 600
  });

  getParsedDate = (date) => {
    var date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
  }

  _onNavigateToTransactionInfoPressed = (id) => {
    if(netInfo.isConnected){
      navigation.navigate('TransactionInfoScreen', {
        transaction_id: parseInt(id)
      })
    }
  }

  if(loading || error) return null;
    data.taskerAppointmentList.map((ap) => {
      arr.push({
        title: `with ${ap.customer.firstName} ${ap.customer.lastName}`,
        subtitle: `${ap.done ? 'Completed' : 'Scheduled'}`,
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
            _onNavigateToTransactionInfoPressed(appt.id)
          }}
          accentColor="black"
        />
        <InternetConnectionChecker />
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
      title: 'Tasks',
      headerLeft: null
    }
  },
  TransactionInfoScreen: {
    screen: TransactionInfoScreen,
    navigationOptions: {
      title: ''
    }
  },
  CustomerRequestScreen: {
    screen:  CustomerRequestScreen,
    navigationOptions: {
      title: '',
      headerLeft: null
    }
  }
});

export default memo(createAppContainer(App));