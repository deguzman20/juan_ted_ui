import React, { memo, useEffect, useState, useRef } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { DEFAULT_URL } from './../../../../actions/types';
import { connect } from 'react-redux';
import CookieManager from '@react-native-community/cookies';

const PaypalScreen = ({ customer_id, navigation }) => {

  const [status, setStatus] = useState('pending')
  const webViewRef = useRef()

  useEffect(() => {
    CookieManager.clearAll().then( () =>  console.log(`All Cookies cleared`) )

    console.log(status.title)
  },[status])

  handleResponse = (e) =>{
    if(e["canGoBack"]=== true){
      Alert.alert('Successful')
      // navigation.navigate('Home')
    }
  }

  return(
    <>
      <SafeAreaView/>
      <WebView
        source={{ url: `${DEFAULT_URL}/redirect_to_paypal?customer_id=${customer_id}` }}
        scalesPageToFit={true}
        onLoad={
          e => {
            // Update the state so url changes could be detected by React and we could load the mainUrl.
            `${DEFAULT_URL}/redirect_to_paypal?customer_id=${customer_id}` 
          }
        }
        incognito={true}
        onNavigationStateChange={e => handleResponse(e)}
        startInLoadingState={true}
      />
    </>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(PaypalScreen));