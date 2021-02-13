import React, { memo, useEffect, useState, useRef } from 'react';
import { SafeAreaView, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { DEFAULT_URL } from './../../../../actions/types';
import { connect } from 'react-redux';
import CookieManager from '@react-native-community/cookies';


import BackButton from '../../../../components/atoms/button/BackButton';

const ReportScreen = ({ customer_id, tasker_id, navigation }) => {

  const [status, setStatus] = useState('pending')
  const webViewRef = useRef()

  useEffect(() => {
    CookieManager.clearAll().then( () =>  console.log(`All Cookies cleared`) )

    console.log(status.title)
  },[status])

  handleResponse = (e) =>{
    if(e['canGoBack'] === true){
        navigation.navigate('MessageScreen')
    }
  }

  return(
    <>
      <BackButton goBack={() => navigation.navigate('MessageScreen')} />
      <SafeAreaView style={{ marginBottom: 50 }}/>
      { Platform.OS === 'ios' ? 
        (
          <WebView
            source={{ url: `${DEFAULT_URL}/customer/report/new?customer_id=${customer_id}?tasker_id=${tasker_id}` }}
            scalesPageToFit={true}
            incognito={true}
            onNavigationStateChange={e => handleResponse(e)}
            startInLoadingState={true}
          />
        ) :
        (
          <WebView
            source={{ uri: `${DEFAULT_URL}/customer/report/new?customer_id=${customer_id}?tasker_id=${tasker_id}` }}
            scalesPageToFit={true}
            incognito={true}
            onNavigationStateChange={e => handleResponse(e)}
            startInLoadingState={true}
            style={{
              marginTop: 20
            }}
          />
        )
      }
    </>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ReportScreen));