import React, { memo } from 'react';
import {  
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Card, Text } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { CUSTOMER_SERVICE_TYPE_LIST } from '../../../../queries';
import { BACKEND_ASSET_URL } from '../../../../actions/types';
import { useQuery } from '@apollo/react-hooks';

import GoogleMapScreen from '../map/GoogleMapScreen';
import BarberScreen from '../services/BarberScreen';
import ChooseDayScreen from '../date_time/ChooseDayScreen';
import TaskersScreen from '../geocoded_taskers/TaskersScreen';
import TaskerInfoScreen from '../geocoded_taskers/TaskerInfoScreen';

const TaskerServiceTypeScreen = () => {
  const { loading, error, data } = useQuery(CUSTOMER_SERVICE_TYPE_LIST, {
    variables: {
      tasker_id: 1
    },
    pollInterval: 700
  });

  if(loading || error) return null;


  navigateToService = (id) => {
    if(id === 1){
      navigation.navigate('BarberScreen', { service_type_id: id });
    }
    else if(id === 2){
      navigation.navigate('HairSalonScreen', { service_type_id: id });
    }
  }

  return(
    <React.Fragment>
      <SafeAreaView />
      <View style={styles.container}>
        <View style={styles.container_row}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text h4 style={styles.txt_services_txt}>Services</Text>
            </View>
            <FlatList style={{ margin:5 }}
              numColumns={1}
              // columnWrapperStyle={styles.row}            
              data={[data['customerServiceTypeList'][0]['serviceType']]}
              keyExtractor={(item) => item.id }
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => { navigateToService(parseInt(item.id))}}>
                  <Card
                    title={item.name} 
                    key={item.id}
                  >
                    <Image 
                      style={styles.image} 
                      source={{  uri: `${BACKEND_ASSET_URL}/${item.image}` }}  
                    />
                  </Card>
                </TouchableWithoutFeedback>
              )}
            />       
          </ScrollView>
        </View>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  container_row: {
    height: 100, 
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  txt_services_txt: {
    left: 20, 
    marginTop: 20
  },
  image: {
    width: '100%',
    height: 200
  }
});

const App = createStackNavigator({
  TaskerServiceTypeScreen: {
    screen: TaskerServiceTypeScreen,
    navigationOptions: {
      title: 'Lokal',
      headerLeft: null,
      headerStyle: {}
    }
  },
  BarberScreen: {
    screen: BarberScreen,
    navigationOptions: {
      title: 'Barber'
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
  },
});

export default memo(createAppContainer(App));