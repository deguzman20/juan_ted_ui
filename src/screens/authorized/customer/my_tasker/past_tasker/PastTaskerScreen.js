import React, { memo } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Text, ListItem, Button } from 'react-native-elements';
import { BACKEND_ASSET_URL } from '../../../../../actions/types';
import { 
  PAST_TASKER_LIST, 
  ADD_TO_FAVORATE_TASKER, 
  REMOVE_TO_FAVORATE_TASKER } from '../../../../../queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import _ from 'lodash';

const PastTaskerScreen = ({ customer_id }) => {
  const netInfo = useNetInfo();
  const [addToFavorateTasker] = useMutation(ADD_TO_FAVORATE_TASKER)
  const [removeToFavorateTasker] = useMutation(REMOVE_TO_FAVORATE_TASKER)
  const { loading, error, data } = useQuery(PAST_TASKER_LIST, {
    variables: {
      customer_id: parseInt(customer_id)
    },
    pollInterval: 300
  });
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    return(
      <ListItem
        title={
          <View style={styles.fullNameWrapper}>
            <Text>
              {item.tasker.firstName} {item.tasker.lastName}
            </Text>
          </View>
        }
        rightElement={
          <Button 
            buttonStyle={{ backgroundColor: '#009C3C' }}
            title={`${item.favorate ? 'Remove': 'Add'} to favorate`}
            onPress={() => { item.favorate ?  _onRemoveToFavorateTaskerPressed(item.id) :  _onAddToFavorateTaskerPressed(item.id) }}
          /> 
        }
        leftAvatar={{ source: { uri: `${BACKEND_ASSET_URL}/${item.tasker.image}` } }}
        bottomDivider
        chevron
      />
    )
  }

  if(loading || error) return null;
  _onAddToFavorateTaskerPressed = (id) => {
    if(netInfo.isConnected){
      Alert.alert(
        "Are you sure you want to add this tasker to your favorate tasker",
        "",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { 
            text: "Yes", 
            onPress: () => {
              addToFavorateTasker({ variables: { transaction_id: parseInt(id) } })
            } 
          }
        ],
        { cancelable: false }
      );  
    }
  }

  _onRemoveToFavorateTaskerPressed = (id) => {
    if(netInfo.isConnected){
      Alert.alert(
        "Are you sure you want to remove this tasker to your favorate tasker",
        "",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { 
            text: "Yes", 
            onPress: () => {
              removeToFavorateTasker({ variables: { transaction_id: parseInt(id) } })
            } 
          }
        ],
        { cancelable: false }
      );
    }
  }
  
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