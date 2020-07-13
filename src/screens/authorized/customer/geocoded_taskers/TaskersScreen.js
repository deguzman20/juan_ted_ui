import React, { memo } from 'react';
import { StyleSheet, View, Image, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Text, Rating, ListItem } from 'react-native-elements';
import { TASKER_BY_GEOLOCATION } from '../../../../queries';
import { BACKEND_ASSET_URL } from '../../../../actions/types';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import _ from 'lodash';

const TaskersScreen = ({ navigation, customer_id }) => {
  const { loading, error, data } = useQuery(TASKER_BY_GEOLOCATION, {
    variables: { 
      lng: String(navigation.state.params["longitude"]), 
      lat: String(navigation.state.params["latitude"]),
      service_type_id: navigation.state.params["service_type_id"],
      start_from: navigation.state.params["start_from"],
      start_to: navigation.state.params["start_to"],
    },
    pollInterval: 500
  });

  const _onNavigateToTaskerInfoPressed = (tasker_id) => {
    navigation.navigate('TaskerInfoScreen',{
      lng: navigation.state.params["longitude"],
      lat: navigation.state.params["latitude"],
      service_type_id: navigation.state.params["service_type_id"],
      start_from: navigation.state.params["start_from"],
      start_to: navigation.state.params["start_to"],
      customer_id: parseInt(customer_id),
      tasker_id: parseInt(tasker_id)
    })
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
        leftAvatar={{ source: { uri: `${BACKEND_ASSET_URL}/${item.image}` } }}
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

const styles = StyleSheet.create({
  empty_tasker_txt: {
    textAlign: 'center',
    color: 'black'
  },
  empty_tasker_list_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -20
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 0
  }
});

export default memo(connect(mapStateToProps, null)(TaskersScreen))