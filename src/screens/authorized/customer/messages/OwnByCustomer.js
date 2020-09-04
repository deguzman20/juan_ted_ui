import React, { memo } from 'react';
import { View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Svg, { Path } from 'react-native-svg';
import { styles } from './../../../../styles/authorized/customer/messages/OwnByCustomerStyle';
import MessageItem from './MessageItem';

const OwnByCustomer = ({ message }) => {
  return(
    <View style={[styles.item, styles.itemOut]}>
      <View style={[styles.balloon, {backgroundColor: '#009C3C'}]}>
        <MessageItem 
          id={message.id} 
          text={message.text}
        />
        <View style={[ styles.arrowContainer,styles.arrowRightContainer,]}>
          <Svg style={styles.arrowRight} 
            width={moderateScale(15.5, 0.6)} 
            height={moderateScale(17.5, 0.6)} 
            viewBox="32.485 17.5 15.515 17.5"  
            enable-background="new 32.485 17.5 15.515 17.5"
          >
            <Path
              d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
              fill="#009C3C"
              x="0"
              y="0"
            />
          </Svg>
        </View>
      </View>
    </View>
  )
}

export default memo(OwnByCustomer)