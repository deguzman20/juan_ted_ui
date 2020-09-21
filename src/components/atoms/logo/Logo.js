import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Logo = () => (
  <View style={styles.logo_container}>
    <Image
      source={require("../../../assets/lokal.png")}
      resizeMode="contain"
      style={styles.image}
    ></Image>
  </View>
)

const styles = StyleSheet.create({
  logo_container: {
    flex: 1,
    position: 'absolute',
    top: '10%',
    width: '136%',
    height: 300,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 307,
    height: 220
  }
})

export default memo(Logo)
