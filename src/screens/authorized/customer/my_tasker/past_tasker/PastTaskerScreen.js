import React, { memo } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, ListItem, Rating } from 'react-native-elements';
import { BACKEND_ASSET_URL } from '../../../../../actions/types';
import { PAST_TASKER_LIST } from '../../../../../queries';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import _ from 'lodash';

const PastTaskerScreen = ({ customer_id }) => {
  const { loading, error, data } = useQuery(PAST_TASKER_LIST, {
    variables: {
      customer_id: parseInt(customer_id)
    },
    pollInterval: 1000
  });
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={
        <View style={styles.fullNameWrapper}>
          <Text>
            {item.tasker.firstName} {item.tasker.lastName}
          </Text>
        </View>
      }
      subtitle={
        <View style={ styles.ratingWrapper }>
          <Rating
            type="star"
            imageSize={20}
            readonly
            startingValue={_.sumBy(item.tasker.reviews, 'rating') / item.tasker.reviews.length }
          />
        </View>
      }
      leftAvatar={{ source: { uri: `${BACKEND_ASSET_URL}/${item.tasker.image}` } }}
      bottomDivider
      chevron
    />
  )

  if(loading || error) return null;
  if(data.pastTaskerList.length >= 1){
    return(
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <FlatList
              keyExtractor={keyExtractor}
              data={data.pastTaskerList}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }
  else {
    return(
      <View style={styles.empty_tasker_container}>
        <Image source={require('../../../../../assets/tasker.png')} />
        <Text h4 style={styles.empty_tasker_txt}>No Past Tasker Available yet</Text>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -20
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 5
  },
  empty_tasker_txt: {
    textAlign: 'center',
    color: 'black'
  },
  empty_tasker_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(PastTaskerScreen));