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
  ImageBackground,
} from 'react-native';
import { ITEM_WIDTH } from './../../../../actions/types';
import { Button as ButtonElement } from 'react-native-elements';

import BackButton from '../../../../components/BackButton';

const NailCareScreen = ({ navigation }) => {
  const [manicure, setManicure] = useState({ quantity: 0, price: 200 });
  const [pedicure, setPedicure] = useState({ quantity: 0, price: 150 });
  const [both, setBoth] = useState({ quantity: 0, price: 350 });
  const [containerVisibility, setContainerVisibility] = useState("none");
  const totalPrice = (manicure.quantity * manicure.price) + (pedicure.quantity * pedicure.price) + (both.quantity * both.price);

  increaseQuantity = (item) => {
    item.setQuantity({ quantity: item.quantity += 1, price: item.price })
    console.log(item.quantity)
    setContainerVisibility("")
  }

  decreaseQuantity = (item) => {
    item.setQuantity({ quantity: item.quantity -= 1, price: item.price  })
    console.log(item.quantity)
    setContainerVisibility("")
  }

  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[
            {
              key: 'Manicure', 
              id: '1', 
              price: 200, 
              description: 'Clean Hands Nails',
              quantity: manicure.quantity,
              setQuantity: setManicure,
              serviceInfo: manicure
            },
            {
              key: 'Pedicure', 
              id: '2', 
              price: 150, 
              description: 'Clean Foot Nails and othera asdasd dasdadasd akjsdhaiuld daklsdhaklsjdh',
              quantity: pedicure.quantity,
              setQuantity: setPedicure,
              serviceInfo: pedicure
            },
            {
              key: 'Both', 
              id: '3', 
              price: 350, 
              description: 'saamplesaamplesaamplesaamplesaamplesaample',
              quantity: both.quantity,
              setQuantity: setBoth,
              serviceInfo: both
            },
          ]}
          ListHeaderComponent={        
            <View style={styles.container}>
              <ImageBackground source={require('../../../../assets/banner2.jpg')} style={styles.image}>
                
              <BackButton goBack={() => {}} />
              </ImageBackground>
            </View>
          }

          renderItem={({ item }) => 
            <Card>
              <View style={styles.containerRows}>
                <Image style={styles.imageServiceItem} source={require('../../../../assets/nail2.png')} />
              
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
          width: ITEM_WIDTH, 
          height: 171, 
          backgroundColor: "white", 
          display: `${containerVisibility}` 
        }}>
          <Text style={styles.totalCost}>Total Cost</Text>
          <Text style={styles.cost}>₱ {totalPrice}</Text>
          <ButtonElement style={styles.rect2} title="Next" onPress={() => { navigation.navigate('GoogleMapScreen', { totalPrice }) }} />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );

};
const styles = StyleSheet.create({
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
    height: 150
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
    fontSize: 14
  },
  totalCost:{
    fontSize: 30,
    paddingLeft:52,
    paddingRight:52,
    paddingTop: 20,
    alignItems: 'center',
    height:70
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }, 
  container: {
    flex: 1,
    height: 300
  },
  rect: {
    width: ITEM_WIDTH,
    height: 171,
    backgroundColor: "white"
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
    marginLeft: 300,
    marginTop: -30,
  },
  rect2: {
    width: ITEM_WIDTH,
    height: 41,
    marginTop: 43,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
  }
});


export default memo(NailCareScreen);