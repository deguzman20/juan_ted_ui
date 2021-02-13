import React, { memo, useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import EmptyNotification from '../../../../components/molecules/empty_container/EmptyNotification';

import { DEFAULT_URL } from '../../../../actions/types';


import { 
  GET_ALL_NOTIFICATION, 
} from '../../../../queries';

const NotificationScreen = ({ customer_id }) => {
  const { loading, error, data } = useQuery(GET_ALL_NOTIFICATION, {
    pollInterval: 1000,
    variables: {
      customer_id: parseInt(customer_id)
    }
  });

  if(loading || error) null;
  const keyExtractor = (item, index) => index.toString()
 
  const renderItem = ({ item }) => {
    let timestamp = item.createdDate;
 
    const { firstName, lastName, image } = item.tasker
    return(
      <ListItem
        title={    
          <View>
            <Text>
              {firstName} {lastName}
            </Text>
          </View>
        }
        subtitle={
          <Text>{item.text}</Text>
        }
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${image}` } }}
        rightElement={
          <TimeAgo time={timestamp} />
        }
        bottomDivider
        chevron
      />
    )
  }
 
  if (loading || error) return null;
  if(data.allNotificationsPerCustomer.length >= 1){
    return(
      <>
        <SafeAreaView/>
        <ScrollView>
          <FlatList
            keyExtractor={keyExtractor}
            data={data.allNotificationsPerCustomer}
            renderItem={renderItem}
          />
        </ScrollView>
      </>
    )
  }
  else{
    return <EmptyNotification />
  }
}

const mapStateToProps = ( { customerReducer } ) => {
  return {
    customer_id: customerReducer.id
  }
}   

export default memo(connect(mapStateToProps, null)(NotificationScreen))