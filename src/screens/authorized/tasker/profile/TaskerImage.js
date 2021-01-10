import React, { memo, useEffect, useState, useRef } from 'react';
import { SafeAreaView, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { DEFAULT_URL } from './../../../../actions/types';
import { connect } from 'react-redux';
import CookieManager from '@react-native-community/cookies';

import BackButton from '../../../../components/atoms/button/BackButton';

const TaskerImage = ({ tasker_id, navigation }) => {

  const [status, setStatus] = useState('pending')
  const webViewRef = useRef()

  useEffect(() => {
    CookieManager.clearAll().then( () =>  console.log(`All Cookies cleared`) )

    console.log(status.title)
  },[status])

  handleResponse = (e) =>{
    if(e['canGoBack'] === true){
        navigation.navigate('ProfileScreen')
    }
  }

  return(
    <>
      <BackButton goBack={() => navigation.navigate('ProfileScreen')} />
      <SafeAreaView style={{ marginBottom: 50 }}/>
      { Platform.OS === 'ios' ? 
        (
          <WebView
            source={{ url: `${DEFAULT_URL}/tasker/upload/edit?id=${tasker_id}` }}
            scalesPageToFit={true}
            incognito={true}
            onNavigationStateChange={e => handleResponse(e)}
            startInLoadingState={true}
          />
        ) :
        (
          <WebView
            source={{ uri: `${DEFAULT_URL}/tasker/upload/edit?id=${tasker_id}` }}
            scalesPageToFit={true}
            incognito={true}
            onNavigationStateChange={e => handleResponse(e)}
            startInLoadingState={true}
          />
        )
      }
    </>
  )
}

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(TaskerImage));