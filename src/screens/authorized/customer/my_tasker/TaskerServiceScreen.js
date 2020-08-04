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
import { CUSTOMER_SERVICE_TYPE_LIST } from '../../../../queries';
import { DEFAULT_URL } from '../../../../actions/types';
import { useQuery } from '@apollo/react-hooks';

const TaskerServiceScreen = ({ navigation }) =>{
  const { loading, error, data } = useQuery(CUSTOMER_SERVICE_TYPE_LIST, {
    variables: {
      tasker_id: navigation.state.params.tasker_id
    },
    pollInterval: 700
  });

  navigateToService = (id) => {
    if(id === 1){
      navigation.navigate('BarberScreen', 
      { 
        service_type_id: id,
        tasker_id: navigation.state.params.tasker_id
      });
    }
    else if(id === 2){
      navigation.navigate('HairSalonScreen', 
      { 
        service_type_id: id,
        tasker_id: navigation.state.params.tasker_id
      });
    }
  }

  if(loading || error) return null;

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
              data={[data['taskerServiceTypeList'][0]['serviceType']]}
              keyExtractor={(item) => item.id }
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => { navigateToService(parseInt(item.id))}}>
                  <Card
                    title={item.name} 
                    key={item.id}
                  >
                    <Image 
                      style={styles.image} 
                      source={{  uri: `${DEFAULT_URL}/${item.image}` }}  
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

export default memo(TaskerServiceScreen);