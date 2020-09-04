import React, {  memo, useEffect } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './../../styles/unauthorized/AppSwiperStyle';
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

const mapStateToProps = ({ customerReducer, taskerReducer }) => {
  return {
    customer_id: customerReducer.id,
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(AppSwiperScreen))