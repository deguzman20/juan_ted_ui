import React, { memo } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { CUSTOMER_COMPLETED_TRANSACTION_LIST  } from '../../../../../queries'
import RNSchedule from 'rnschedule';
import InternetConnectionChecker from '../../../../../components/InternetConnectionChecker';

const CompletedTaskScreen = ({ customer_id, navigation }) => {
  const arr = []
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(CUSTOMER_COMPLETED_TRANSACTION_LIST, {
    variables: { customer_id: parseInt(customer_id) },
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
      navigation.navigate('CompletedTransactionInfoScreen', {
        transaction_id: parseInt(id)
      })
    }
  }

  if(error || loading) return null;
    data.customerCompletedTransactionList.map((ap) => {
      arr.push({
        title: `with ${ap.tasker.firstName} ${ap.tasker.lastName}`,
        subtitle: `${ap.done ? 'Done' : 'Undone'}`,
        start: new Date(...getParsedDate(`${ap.from}`)), 
        end: new Date(...getParsedDate(`${ap.to}`)),
        color: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
        id: `${ap.id}`
      })
    })

  return(
    <React.Fragment>
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

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(CompletedTaskScreen));
