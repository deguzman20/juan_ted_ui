import React, { memo, useState } from 'react';
import { Card } from 'react-native-elements'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import { Button as ButtonElement } from 'react-native-elements';
import { formatMoney } from '../../../../core/utils';
import {  DEFAULT_URL } from './../../../../actions/types';
import { SERVICES } from '../../../../queries';
import { useQuery } from '@apollo/react-hooks';
import { useNetInfo } from "@react-native-community/netinfo";

import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';


const BarberScreen = ({ navigation }) => {
  const netInfo = useNetInfo();
  const { loading, error, data } = useQuery(SERVICES, {
    variables: { service_type_id: parseInt(navigation.state.params["service_type_id"]) },
    pollInterval: 500,
  });

  const [haircut, setHairCut] = useState({ quantity: 0, price: 200 });
  const [containerVisibility, setContainerVisibility] = useState("none");
  const totalPrice = (haircut.quantity * haircut.price);

  increaseQuantity = (item) => {
    if(netInfo.isConnected){
      item.setQuantity({ quantity: item.quantity += 1, price: item.price })
      setContainerVisibility("")
    }
  }

  decreaseQuantity = (item) => {
    if(netInfo.isConnected){
      if(item.quantity === 0) return false;
      item.setQuantity({ quantity: item.quantity -= 1, price: item.price })
      if(((haircut.quantity) - 1) >= 1) {
        setContainerVisibility("")
      }
      else{
        setContainerVisibility("none")
      }
    }
  }

  if(loading || error) return null; 
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[
            {
              key: data["service"][0]["name"], 
              id: data["service"][0]["id"], 
              price: data["service"][0]["price"], 
              description: data["service"][0]["description"],
              quantity: haircut.quantity,
              setQuantity: setHairCut,
              serviceInfo: haircut,
              image: data["service"][0]["image"]
            }
          ]}

          renderItem={({ item }) => 
            <Card>
              <View style={styles.containerRows}>
                <Image style={styles.imageServiceItem} 
                  source={{  uri: `${DEFAULT_URL}/${item.image}` }} 
                />
                <View style={styles.containerDetails}>
                  <View style={styles.containerRow}>
                    <Text style={styles.serviceItemName}>{item.key}</Text>
                    <Text style={styles.serviceItemPrice}>₱ {item.price}</Text>
                  </View>
                    <Text style={styles.serviceItemDesc}>{item.description}</Text>
                    <View style={styles.containerRow}> 
                      <View style={styles.quantityButton}>
                        <Button 
                          title="+"
                          onPress={() => increaseQuantity(item) } 
                        />
                      </View>
                      <TextInput
                        style={styles.quantityInput}
                        onChangeText={text => onChangeText(text)}
                        value={`${item.quantity}`}
                      />
                      <View style={styles.quantityButton}>
                        <Button
                          title="-"
                          onPress={() => decreaseQuantity(item) }
                        />
                      </View>
                    </View>
                  </View> 
              </View>
            </Card>
          }
        />
        <View style={{ 
          width: '100%', 
          height: 171,
          backgroundColor: "white", 
          display: `${containerVisibility}`,
          alignItems: 'stretch',
        }}>
          <Text style={styles.totalCost}>Total Cost</Text>
          <Text style={styles.cost}>₱ {formatMoney(totalPrice)}</Text>
          <ButtonElement 
            style={styles.next_button}
            buttonStyle={styles.next_button_background_color}
            title="Next" 
            onPress={() => { 
              navigation.navigate('GoogleMapScreen', { 
              totalPrice, 
              service_type_id: 1,
              tasker_id: navigation.state.params.tasker_id, 
              services: [
                { 
                  quantity: haircut.quantity,
                  service_id: 1
                }] 
              }) 
            }} 
          />
        </View>
      </SafeAreaView>
      <InternetConnectionChecker/>
    </React.Fragment>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300
  },
  containerDetails: {
    flex: 3,
    height: 150,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerRows: {
    flexDirection: 'row',
    height: 150,
    justifyContent: 'space-between',
  },
  imageServiceItem: {
    flex: 2,
    alignSelf: 'baseline',
    width: 150, 
    height: 150,
  },
  quantityButton: {
    width:50,
  },
  quantityInput: {
    height: 35,
    width: 40, 
    textAlign:'center',
    alignItems: 'flex-end', 
    borderColor: 'gray', 
    borderWidth: 1
  },
  serviceItemName: {
    fontWeight: 'bold',
    fontSize: 17
  },
  serviceItemPrice: {
    fontWeight: 'bold',
    fontSize: 14
  },
  serviceItemDesc: {
    top: -10,
    fontSize: 14
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }, 
  totalCost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginTop: 43,
    marginLeft: 42
  },
  cost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginLeft: '60%',
    marginTop: -30,
  },
  next_button: {
    width: '100%',
    height: 41,
    marginTop: 43,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
  },
  next_button_background_color: {
    backgroundColor: '#009C3C'
  }
});


export default memo(BarberScreen);