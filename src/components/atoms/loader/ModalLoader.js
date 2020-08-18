import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Loader from "react-native-modal-loader";

const ModalLoader = ({ isLoading }) => (
  <View style={styles.container}>
    <Loader loading={isLoading} color="#ff66be" />
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
})


export default memo(ModalLoader);