import React, { memo } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, ListItem, Rating, Button } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { DEFAULT_URL } from '../../../../../actions/types';
import { FAVORATE_TASKER_LIST } from '../../../../../queries';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaView } from 'react-navigation';

import TaskerServiceScreen from '../TaskerServiceScreen';
import MyTaskerInfoScreen from '../MyTaskerInfoScreen';
import GoogleMapScreen from '../../map/GoogleMapScreen';
import BarberScreen from '../../services/BarberScreen';
import HairSalonScreen from '../../services/HairSalonScreen';
import ChooseDayScreen from '../../date_time/ChooseDayScreen';
import TaskersScreen from '../../geocoded_taskers/TaskersScreen';
import TaskerInfoScreen from '../../geocoded_taskers/TaskerInfoScreen';
import ReviewsScreen from '../ReviewsScreen';

import InternetConnectionChecker from '../../../../../components/atoms/snackbar/InternetConnectionChecker';
import _ from 'lodash';

const FavoriteTaskerScreen = ({ customer_id, navigation }) => {
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(FAVORATE_TASKER_LIST, {
    variables: {
      customer_id: parseInt(customer_id)
    },
    pollInterval: 1000
  });
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        netInfo.isConnected ? navigation.navigate('MyTaskerInfoScreen', { tasker_id: parseInt(item.tasker.id) }) : null 
      }}
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
          title={'Select'}
          onPress={() => {  
            netInfo.isConnected ? navigation.navigate('TaskerServiceScreen', { tasker_id: parseInt(item.tasker.id) }) : null 
          }}
        /> 
      }
      subtitle={
        <View style={ styles.ratingWrapper }>
          <Rating
            type="star"
            imageSize={20}
            readonly
            startingValue={item.tasker.reviews.length >= 1 ? _.sumBy(item.tasker.reviews, 'rating') / item.tasker.reviews.length : 0 }       
          />
        </View>
      }
      leftAvatar={{ source: { uri: `${DEFAULT_URL}/${item.tasker.image}` } }}
      bottomDivider
      chevron
    />
  )

  if(loading || error) return null;
  
  if(data.favorateTaskerList.length >= 1){
    return(
      <React.Fragment>
        <SafeAreaView />
        <View style={styles.first_row_container}>
          <Text h4 style={styles.my_tasker_txt}>My Favorite Tasker</Text> 
        </View>
        <View style={styles.second_row_container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.taskerWrapper}>
                <FlatList
                  keyExtractor={keyExtractor}
                  data={data.favorateTaskerList}
                  renderItem={renderItem}
                />
              </View>
            </View>
          </ScrollView>
          <InternetConnectionChecker />
        </View>  
      </React.Fragment>
    )
  }
  else {
    return(
      <View style={styles.empty_tasker_container}>
        <Image source={require('../../../../../assets/tasker.png')} />
        <Text h4 style={styles.empty_tasker_txt}>No Favorate Tasker yet</Text>
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
  FavoriteTaskerScreen: { 
    screen: connect(mapStateToProps, null)(FavoriteTaskerScreen),
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
  TaskerServiceScreen: {
    screen: TaskerServiceScreen,
    navigationOptions: {
      title: 'Tasker Available Service'
    } 
  },
  ReviewsScreen: {
    screen: ReviewsScreen,
    navigationOptions: {
      title: 'Reviews',
      headerShown: true
    } 
  },
  BarberScreen: {
    screen: BarberScreen,
    navigationOptions: {
      title: 'Barber'
    }
  },
  HairSalonScreen: {
    screen: HairSalonScreen,
    navigationOptions: {
      title: 'Hair Salon'
    }
  },
  GoogleMapScreen: {
    screen: GoogleMapScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  ChooseDayScreen: {
    screen: ChooseDayScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  TaskersScreen: {
    screen: TaskersScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  TaskerInfoScreen: {
    screen: TaskerInfoScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  }
});

export default memo(createAppContainer(App));