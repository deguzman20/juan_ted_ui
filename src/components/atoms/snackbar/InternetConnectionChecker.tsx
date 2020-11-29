import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NetworkConsumer } from 'react-native-offline';
import SnackBar from 'rn-snackbar-component';

const InternetConnectionChecker = () => {
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
            autoHidingTime={0}
          />
        ) : null
      )}
    </NetworkConsumer>
  )
};

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
});

export default InternetConnectionChecker;