import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SnackBar from 'rn-snackbar-component';

export default SnackBarMessage = ({ children, snackVisibility }) => {
  return(
    <SnackBar
      visible={snackVisibility}
      message={(
        <View style={styles.snackbar_container}>
          <Text style={styles.txt_message}>
            {children}
          </Text>
        </View>
      )}
      actionHandler={() => {
        console.log("snackbar button clicked!")
      }}
      autoHidingTime={0}
    />
  )
}

const styles = StyleSheet.create({
  snackbar_container: {
    flex: 1,
    flexDirection: 'column', 
    padding: 30,
    backgroundColor: 'black'
  },
  txt_message: {
    color: 'white',
    textAlign: 'center',
    marginTop: -10
  }
})