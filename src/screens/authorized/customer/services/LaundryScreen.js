import React, { memo } from 'react';
import { Card, } from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { SERVICES } from '../../../../queries';
import { useQuery } from '@apollo/react-hooks';

const LaundryScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(SERVICES, {
    variables: { service_type_id: parseInt(navigation.state.params["service_type_id"]) },
    pollInterval: 500,
  });

  if(loading || error) return null;

  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.header6}>How much laundry?</Text>
          <Text style={styles.p}>Just Estimate</Text>
        </View>
        <View>
          <FlatList
            data={[
              {
                key: data['service'][0]["name"], 
                id: data['service'][0]["id"], 
                price: `${data['service'][0]["price"]}` 
              },
              {
                key: data['service'][1]["name"], 
                id: data['service'][1]["id"], 
                price: `${data['service'][1]["price"]}`
              },
              {
                key: data['service'][2]["name"], 
                id: data['service'][2]["id"], 
                price: `${data['service'][2]["price"]}`
              },
            ]}
            renderItem={({item}) => 
              <TouchableWithoutFeedback onPress={() => { navigation.navigate('GoogleMapScreen', { totalPrice: item.price }) }}>
                <Card>
                  <View style={styles.cardRow}>
                    <View style={styles.row}> 
                      <Image style={styles.iconMd} source={require('../../../../assets/nail2.png')} />
                      <Text style={styles.header3}>{item.key}</Text>
                    </View>
                    <Text style={styles.header6}>₱ {item.price}</Text>
                  </View>
                </Card>
              </TouchableWithoutFeedback>
            }
          />
        </View>

        <View style={styles.panel}>
          <Text style={styles.header6}>Additional Info</Text>
          <View style={styles.row}> 
            <Image style={styles.iconSm} source={require('../../../../assets/arrow_back2.png')} />
            <Text style={styles.p}>Free Pickup</Text>
          </View>
          <View style={styles.row}> 
            <Image style={styles.iconSm} source={require('../../../../assets/nail2.png')} />
            <Text style={styles.p}>Quality Cleaning</Text>
          </View>
          <View style={styles.row}> 
            <Image style={styles.iconSm} source={require('../../../../assets/arrow_back2.png')} />
            <Text style={styles.p}>Paywhen</Text>
          </View>
          <View style={styles.row}> 
            <Image style={styles.iconSm} source={require('../../../../assets/nail2.png')} />
            <Text style={styles.link}>See scope of work</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={styles.row}> 
            <Image style={styles.iconMd} source={require('../../../../assets/logo.png')} />
            <Text style={styles.header3}>Learn More About Our Safety</Text>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );

};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  cardRow:{
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  panel:{
      marginHorizontal:15,
      marginVertical:10,
  },
  header6:{
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical:5
  },
  header3:{
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical:2,
    marginHorizontal:5
  },
  header2:{
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal:5
  },
  
  link:{
    fontWeight: 'bold',
    fontSize: 12,
    marginVertical:2,
    color:"#5eb8ff",
    marginHorizontal:5
  },
  p:{
    color:"#8d8d8d",
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical:2,
    marginHorizontal:5
  },
  iconMd:{
    width: 30,
    height: 30,
    marginRight:5
  },
  iconSm:{
    width: 25,
    height: 25,
    marginRight:5
  }
});


export default memo(LaundryScreen);