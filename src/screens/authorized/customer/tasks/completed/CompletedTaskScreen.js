import React, { memo, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { _androidRequestPermissions, _iosRequestPermissions } from '../../../../../helpers/location';
import { 
  CUSTOMER_COMPLETED_TRANSACTION_LIST,
  UPDATE_CUSTOMER_GEOLOCATION  } from '../../../../../queries'

import RNSchedule from 'rnschedule';
import Loading from '../../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../../components/molecules/out_of_location_service/OutOfLocationService';
import InternetConnectionChecker from '../../../../../components/atoms/snackbar/InternetConnectionChecker';

const CompletedTaskScreen = ({ customer_id, navigation }) => {
  const arr = []
  const netInfo = useNetInfo()
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(CUSTOMER_COMPLETED_TRANSACTION_LIST, {
    variables: { customer_id: parseInt(customer_id) },
    pollInterval: 600
  })

  useEffect(() => {
    if(Platform.OS === 'ios'){
      _iosRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
    else {
      _androidRequestPermissions(customer_id, compoundCode, setCompoundCode, update_customer_geolocation)
    }
  },[])

  getParsedDate = (date) => {
    var date = String(date).split(' ')
    var days = String(date[0]).split('-')
    var hours = String(date[1]).split(':')
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])]
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
        subtitle: `${ap.done ? 'Completed' : 'Scheduled'}`,
        start: new Date(...getParsedDate(`${ap.from}`)), 
        end: new Date(...getParsedDate(`${ap.to}`)),
        color: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
        id: `${ap.id}`
      })
    })

  if(compoundCode !== ''){
    if(compoundCode.match(pattern) !== null){
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
    else{
      return <OutOfLocationService />
    }
  }
  else{
    return <Loading />
  }
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(CompletedTaskScreen))
