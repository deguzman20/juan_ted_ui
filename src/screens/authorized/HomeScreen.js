import React, { memo, useState } from 'react';
import {  
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { FlatGrid } from 'react-native-super-grid';
import { useQuery } from '@apollo/react-hooks';
import { ALL_SERVICES } from './../../queries';
import { getAllServiceAction } from './../../actions';
import { connect } from 'react-redux';
import { Card, Text, Button, Icon } from 'react-native-elements';

import MyTodoListScreen from './MyTodoListScreen';
import ProfileScreen from './ProfileScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import HomeCleaningScreen from './services/HomeCleaningScreen';
import LaundryScreen from './services/LaundryScreen';
import HomeRepairScreen from './services/HomeRepairScreen';
import NailCareScreen from './services/NailCareScreen';

// import HeatMap from './map/HeatMap';

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(ALL_SERVICES)
  const [columnCount, setColumnCount] = useState(2)
  if (loading) return <Text>Loading.....</Text>;

  navigateToService = (id) => {
    if(id === 1){
      navigation.navigate('HomeCleaningScreen');
    }
    else if(id === 2){
      navigation.navigate('HomeRepairScreen');
    }
    else if(id === 3){
      navigation.navigate('LaundryScreen');
    }
    else{
      navigation.navigate("NailCareScreen");
    }
  }

  return(
    <View style={styles.container}>
      <SafeAreaView/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          <Text h4>My to-do list</Text>
        </View>
        <View style={styles.grid}>
          <Card>
            <Text style={{marginBottom: 10}}>
              Tell us what you need help with, and we'll connect you with Taskers to get the job done.
            </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Add to list'
              onPress={() => navigation.navigate('MyTodoListScreen')} />
          </Card> 
        </View>
        <FlatGrid
          itemDimension={130}
          items={data["allServices"]}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item, index, separators }) => (
            <View style={{ width: ITEM_WIDTH / columnCount}}>
              <TouchableWithoutFeedback onPress={() => { navigateToService(parseInt(item.id))}}>
                <Card
                  title={item.name} 
                  key={item.id}
                >
                  <Image style={{width: (ITEM_WIDTH / columnCount) - 60, height: 100}} source={{  uri: `file:///Users/andy/Desktop/juan-ted/juan-ted-api/public/${item.image}` }}  />
                </Card>
              </TouchableWithoutFeedback>
            </View>
          )}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 25
  },
  grid: {
      paddingLeft:30,
      paddingTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  gridItem: {
      margin:5,
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
  },
  gridItemImage: {
      width: 100,
      height: 100,
      borderWidth: 1.5,
      borderColor: 'white',
      borderRadius: 50,
  },
  gridItemText: {
      marginTop: 5,
      textAlign:'center',
  },
});

const mapStateToProps = ({ serviceReducer }) => {
  return {
    services: serviceReducer
  }
}

const App = createStackNavigator({
  Home: { 
    screen: connect(mapStateToProps, { getAllServiceAction })(HomeScreen),
    navigationOptions: {
      title: ''
    }
  },
  MyTodoListScreen: { 
    screen: MyTodoListScreen, 
    navigationOptions: {
      title: 'Todo List',
      headerStyle: { backgroundColor: 'white' }
    } 
  },
  ProfileScreen: {
    screen: ProfileScreen,
  },
  HomeCleaningScreen: {
    screen:  HomeCleaningScreen,
    navigationOptions: {
      title: 'Home Cleaning',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  LaundryScreen: {
    screen: LaundryScreen,
    navigationOptions: {
      title: 'Laundry',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  HomeRepairScreen: {
    screen: HomeRepairScreen,
    navigationOptions: {
      title: 'Home Repair',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  NailCareScreen: {
    screen: NailCareScreen,
    navigationOptions: {
      title: 'Nail Care',
      headerStyle: { backgroundColor: 'white' },
    }
  }
});


export default memo(createAppContainer(App));