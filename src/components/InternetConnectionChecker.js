import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { NetworkConsumer } from 'react-native-offline';
import SnackBar from 'rn-snackbar-component';

export default InternetConnectionChecker = ({ navigation }) => {
  return(
    <NetworkConsumer>
      {({ isConnected }) => ( 
        !isConnected ? (
          <SnackBar
            visible={!isConnected ? true : false}
            message={(
              <View style={styles.snackbar_container}>
                <Text style={styles.txt_connection}>You are currently offline, some features may be disabled</Text>
              </View>
            )}
            action={(
              <TouchableWithoutFeedback onPress={() => { }}>
                <Text 
                  style={styles.txt_retry}
                >
                  Retry
                </Text>
              </TouchableWithoutFeedback>
            )}
            autoHidingTime={0}
            
          />
        ) : null
      )}
    </NetworkConsumer>
  )
}

const styles = StyleSheet.create({
  snackbar_container: {
    flex: 1,
    flexDirection: 'column', 
    padding: 20,
    backgroundColor: 'black'
  },
  txt_connection: {
    color: 'white'
  },
  txt_retry: {
    color: 'white'
  }
})