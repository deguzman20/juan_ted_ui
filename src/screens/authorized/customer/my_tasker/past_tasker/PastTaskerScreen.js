import React, { memo } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Text, ListItem, Button, Rating } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { DEFAULT_URL } from '../../../../../actions/types';
import { 
  PAST_TASKER_LIST, 
  ADD_TO_FAVORATE_TASKER, 
  REMOVE_TO_FAVORATE_TASKER } from '../../../../../queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaView } from 'react-navigation';
import InternetConnectionChecker from '../../../../../components/InternetConnectionChecker';
import MyTaskerInfoScreen from '../../my_tasker/MyTaskerInfoScreen';
import ReviewsScreen from '../../my_tasker/ReviewsScreen';
import _ from 'lodash';

const PastTaskerScreen = ({ customer_id, navigation }) => {
  const netInfo = useNetInfo();
  const [addToFavorateTasker] = useMutation(ADD_TO_FAVORATE_TASKER)
  const [removeToFavorateTasker] = useMutation(REMOVE_TO_FAVORATE_TASKER)
  const { loading, error, data } = useQuery(PAST_TASKER_LIST, {
    variables: {
      customer_id: parseInt(customer_id)
    },
    pollInterval: 300
  });

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

  _onNavigateToTaskerInfoPressed = (tasker_id) => {
    if(netInfo.isConnected){
      navigation.navigate('MyTaskerInfoScreen', { tasker_id: parseInt(tasker_id) })  
    }
  }
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => {
    return(
      <ListItem
        onPress={() => { _onNavigateToTaskerInfoPressed(item.tasker.id)} }
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
              startingValue={item.tasker.reviews.length >= 1 ?  _.sumBy(item.tasker.reviews, 'rating') / item.tasker.reviews.length : 0 }       
            />
          </View>
        }
        rightElement={
          <Button 
            buttonStyle={{ backgroundColor: '#009C3C' }}
            title={`${item.favorate ? 'Remove': 'Add'} to favorate`}
            onPress={() => { item.favorate ?  _onRemoveToFavorateTaskerPressed(item.id) :  _onAddToFavorateTaskerPressed(item.id) }}
          /> 
        }
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${item.tasker.image}` } }}
        bottomDivider
      />
    )
  }

  if(loading || error) return null;
  
  if(data.pastTaskerList.length >= 1){
    return(
      <React.Fragment>
        <SafeAreaView />
        <View style={styles.first_row_container}>
          <Text h4 style={styles.my_tasker_txt}>My Past Tasker</Text> 
        </View>
        <View style={styles.second_row_container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <FlatList
                keyExtractor={keyExtractor}
                data={data.pastTaskerList}
                renderItem={renderItem}
              />
            </View>
          </ScrollView>
        </View>  
        <InternetConnectionChecker />
      </React.Fragment>
    )
  }
  else {
    return(
      <View style={styles.empty_tasker_container}>
        <Image source={require('../../../../../assets/tasker.png')} />
        <Text h4 style={styles.empty_tasker_txt}>No Past Tasker Available yet</Text>
        <InternetConnectionChecker />
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
  },
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  second_row_container: {
    flex: 2, 
    flexDirection: 'row'
  },
  my_tasker_txt: {
    paddingLeft: 30,
    paddingTop: 20
  }
});

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

const App = createStackNavigator({
  PastTaskerScreen: { 
    screen: connect(mapStateToProps, null)(PastTaskerScreen),
    navigationOptions: {
      header: null
    }
  },
  MyTaskerInfoScreen: { 
    screen: MyTaskerInfoScreen, 
    navigationOptions: {
      header: null
    } 
  },
  ReviewsScreen: {
    screen: ReviewsScreen,
    navigationOptions: {
      title: 'Reviews'
    }
  }
});

export default memo(createAppContainer(App));

