import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;


class AppSwiperScreen extends Component {
  render(){
    return (
      <React.Fragment>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Swiper
            style={styles.wrapper}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,.3)',
                  width: 13,
                  height: 13,
                  borderRadius: 7,
                  marginLeft: 7,
                  marginRight: 7
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 20,
                  height: 20,
                  borderRadius: 7,
                  marginLeft: 7,
                  marginRight: 7
                }}
              />
            }
            paginationStyle={{
              bottom: 70
            }}
            loop={false}
          >
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require('./../../assets/house-cleaning.jpg')}
                resizeMode="cover"
              />
            </View>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require('./../../assets/repairing.jpg')}
                resizeMode="cover"
              />
            </View>
            <View style={styles.slide}>
              <Image style={styles.image} source={require('./../../assets/plumbing.jpg')} />
              <Button
                title="Next"
                style={styles.button}
                onPress={() => this.props.navigation.navigate('LoginScreen')}
              />
            </View>
          </Swiper>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1
  },

  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: 'transparent',
    position: 'absolute'
  },

  button: {
    padding:10,
    marginTop:ITEM_HEIGHT-175,
  }
})


export default AppSwiperScreen;