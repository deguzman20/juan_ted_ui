import React, {  memo, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { ITEM_WIDTH, ITEM_HEIGHT  } from './../../actions/types';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

const AppSwiperScreen = ({ customer_id, tasker_id, navigation }) => {
  useEffect(() => {
    if(customer_id !== '' && tasker_id === ''){
      setTimeout(() => {
        navigation.navigate('CustomerDashBoardScreen')
      }, 2000)
    }
    else if(customer_id === '' && tasker_id !== ''){
      setTimeout(() => {
        navigation.navigate('TaskerDashBoardScreen')
      }, 2000)
    }
    else{
      setTimeout(() => {
        navigation.navigate('LoginScreen')
      }, 2000)
    }
  },[])

  return(
    <React.Fragment>
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
        >
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require('./../../assets/lokal.png')}
              resizeMode="center"
            />
          </View>
        </Swiper>
      </View>
    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: 'white'
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

const mapStateToProps = ({ customerReducer, taskerReducer }) => {
  return {
    customer_id: customerReducer.id,
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(AppSwiperScreen));