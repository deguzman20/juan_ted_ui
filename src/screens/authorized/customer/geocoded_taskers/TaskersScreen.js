import React, { memo } from 'react';
import { 
  View, 
  Image, 
  ScrollView, 
  FlatList, 
  TouchableWithoutFeedback } from 'react-native';
import { Text, Rating, ListItem } from 'react-native-elements';
import { TASKER_BY_GEOLOCATION } from '../../../../queries';
import { DEFAULT_URL } from '../../../../actions/types';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { styles } from './../../../../styles/authorized/customer/geocoded_taskers/TaskersStyle';
import _ from 'lodash';

import { useNetInfo } from "@react-native-community/netinfo";

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

const TaskersScreen = ({ navigation, customer_id }) => {
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(TASKER_BY_GEOLOCATION, {
    variables: { 
      lng: String(navigation.state.params.longitude), 
      lat: String(navigation.state.params.latitude),
      service_type_id: navigation.state.params.service_type_id,
      start_from: navigation.state.params.start_from,
      start_to: navigation.state.params.start_to,
    },
    pollInterval: 500
  })

  const _onNavigateToTaskerInfoPressed = (tasker_id) => {
    if(netInfo.isConnected){
      navigation.navigate('TaskerInfoScreen',{ 
        lng: navigation.state.params.longitude,
        lat: navigation.state.params.latitude,
        formatted_address: navigation.state.params.formatted_address,
        service_type_id: navigation.state.params.service_type_id,
        start_from: navigation.state.params.start_from,
        start_to: navigation.state.params.start_to,
        customer_id: parseInt(customer_id),
        tasker_id: parseInt(tasker_id),
        services: navigation.state.params.services,
        service_details: navigation.state.params.service_details,
        total_price: navigation.state.params["total_price"]
      })
    }
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => { _onNavigateToTaskerInfoPressed(item.id) }}>
      <ListItem
        title={
          <View style={styles.fullNameWrapper}>
            <Text>{item.firstName} {item.lastName}</Text>
          </View>
        }
        subtitle={ 
          <View style={ styles.ratingWrapper }>
            <Rating
              type="star"
              imageSize={20}
              readonly
              startingValue={(_.sumBy(item['reviews'], 'rating')) / 5}
              
            />
          </View>
        }
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${item.image}` } }}
        bottomDivider
        chevron
      />
    </TouchableWithoutFeedback>
  )

  if(loading || error) return null;
  if(data['taskerByGeolocation'].length >= 1){
    return(
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            keyExtractor={keyExtractor}
            data={data['taskerByGeolocation']}
            renderItem={renderItem}
          />
        </ScrollView>
        <InternetConnectionChecker />
      </React.Fragment>
    )
  }
  else{
    return(
      <View style={styles.empty_tasker_list_container}>
        <Image source={require('../../../../assets/tasker.png')} />
        <Text h3 style={styles.empty_tasker_txt}>No available tasker</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(TaskersScreen))