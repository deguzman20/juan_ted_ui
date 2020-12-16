import React, { memo, useState } from 'react';
import { Card } from 'react-native-elements'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button as ButtonElement, Divider } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/customer/services/BarberStyle';
import { formatMoney } from '../../../../core/utils';
import {  DEFAULT_URL } from './../../../../actions/types';
import { SERVICE_DETAILS } from '../../../../queries';
import { useQuery } from '@apollo/react-hooks';
import { useNetInfo } from "@react-native-community/netinfo";
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

const BarberScreen = ({ navigation }) => {
  const netInfo = useNetInfo()
  const { loading, error, data } = useQuery(SERVICE_DETAILS, {
    variables: { service_type_id: parseInt(navigation.state.params["service_type_id"]) },
    pollInterval: 500,
  })

  const [haircut, setHairCut] = useState({ quantity: 0, price: 200 })
  const [containerVisibility, setContainerVisibility] = useState("none")
  const totalPrice = (haircut.quantity * haircut.price)

  increaseQuantity = (item) => {
    if(netInfo.isConnected){
      item.setQuantity({ quantity: item.quantity += 1, price: item.price })
    }
  }

  decreaseQuantity = (item) => {
    if(netInfo.isConnected){
      if(item.quantity === 0) return false;
      item.setQuantity({ quantity: item.quantity -= 1, price: item.price })
    }
  }

  if(loading || error) return null;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={[
            {
              key: data["service"][0]["name"],
              id: data["service"][0]["id"],
              price: data["service"][0]["price"],
              quantity: haircut.quantity,
              setQuantity: setHairCut,
              serviceInfo: haircut,
              image: data["service"][0]["image"],
              why_this_service: data["service"][0]["whyThisServices"],
              equipment_use: data["service"][0]["equipmentUses"],
              what_is_included: data["service"][0]["whatIsIncludeds"]
            }
          ]}

          renderItem={({ item }) =>
            <TouchableWithoutFeedback onPress={() => {
              navigation.navigate('DetailsScreen', {
                service_name: item.key,
                id: item.id,
                image: item.image,
                why_this_service: item.why_this_service,
                equipment_use: item.equipment_use,
                what_is_included: item.what_is_included
              })
            }}>
              <Card>
                <View style={styles.containerRows}>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('DetailsScreen', {
                      service_name: item.key,
                      id: item.id,
                      image: item.image,
                      why_this_service: item.why_this_service,
                      equipment_use: item.equipment_use,
                      what_is_included: item.what_is_included
                    })
                  }}>
                    <Image style={styles.imageServiceItem}
                      source={{  uri: `${DEFAULT_URL}/${item.image}` }}
                    />
                  </TouchableWithoutFeedback>
                  <View style={styles.containerDetails}>
                    <View style={styles.containerRow}>
                      <Text style={styles.serviceItemName}>{item.key}</Text>
                      <Text style={styles.serviceItemPrice}>₱ {item.price}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                      navigation.navigate('DetailsScreen', {
                        service_name: item.key,
                        id: item.id,
                        image: item.image,
                        why_this_service: item.why_this_service,
                        equipment_use: item.equipment_use,
                        what_is_included: item.what_is_included
                      })
                    }}>
                      <Text style={styles.viewDetails}>View Details</Text>
                    </TouchableWithoutFeedback>
                    <Icon
                      name='chevron-right'
                      color='black'
                      style={styles.chevron}
                      size={15}
                    />
                    <View style={styles.containerRow}>
                    <View style={styles.quantityButton}>
                        <Button
                          title="-"
                          onPress={() => decreaseQuantity(item) }
                        />
                      </View>
                      <TextInput
                        editable={false}
                        style={styles.quantityInput}
                        onChangeText={text => onChangeText(text)}
                        value={`${item.quantity}`}
                      />
                    <View style={styles.quantityButton}>
                        <Button
                          title="+"
                          onPress={() => increaseQuantity(item) }
                        />
                    </View>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableWithoutFeedback>  
          }
        />
        <View style={{
          width: '100%',
          height: 171,
          backgroundColor: "white",
          // display: ''
          // display: `${containerVisibility}`,
          alignItems: 'stretch',
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.amount_wrapper}>
              <Text style={styles.total_amount_txt}>
                Total Amount
              </Text>
            </View>
            <View style={styles.amount_value_wrapper}>
              <Text style={styles.total_amount_value_txt}>
                ₱ {formatMoney(totalPrice)}
              </Text>
            </View>
          </View>
          <Divider style={styles.divider} />        
          <ButtonElement
            style={styles.next_button}
            buttonStyle={styles.next_button_background_color}
            title="Next"
            onPress={() => {
              if(haircut.quantity < 1){
                Alert.alert('No selected service')
              }
              else{
                navigation.navigate('GoogleMapScreen', {
                totalPrice,
                service_type_id: parseInt(navigation.state.params.service_type_id),
                tasker_id: navigation.state.params.tasker_id,
                services: [
                  {
                    service_id: 1,
                    quantity: haircut.quantity,
                  }],
                service_details: [
                  {
                    service_id: 1,
                    service_name: data["service"][0]["name"],
                    image: data["service"][0]["image"],
                    quantity: haircut.quantity,
                    price: data["service"][0]["price"]
                  }]
                })
              }
            }}
          />
        </View>
      </SafeAreaView>
      <InternetConnectionChecker/>
    </>
  )
}
 
export default memo(BarberScreen)