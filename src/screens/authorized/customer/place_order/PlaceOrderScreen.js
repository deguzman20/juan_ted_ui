import React, { memo, useState } from 'react';
import { 
  View, 
  SafeAreaView, 
  FlatList, 
  StyleSheet, 
  Alert, 
  TouchableWithoutFeedback } from 'react-native';
import { Text, ListItem, Divider, Button, Overlay } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { formatMoney } from './../../../../core/utils';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { CUSTOMER_SHIPPING_ADDRESS } from './../../../../queries';
import { DEFAULT_URL, ITEM_WIDTH } from "./../../../../actions/types";
import { useNetInfo } from "@react-native-community/netinfo";
import Loader from "react-native-modal-loader";
import axios from 'axios';

const PlaceOrderScreen = ({ navigation, customer_id }) => {
  const netInfo = useNetInfo()
  const total_cost_arr = []
  const shipping_address_arr = [navigation.state.params.formatted_address]
  const [shipping_address, setShippingAddress] = useState(navigation.state.params.formatted_address)
  const [isLoading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { loading, error, data } = useQuery(CUSTOMER_SHIPPING_ADDRESS, {
    variables: {
      customer_id: parseInt(customer_id)
    },
    pollInterval: 1000
  })

  toggleOverlay = () => {
    setVisible(!visible)
  }

  const _onCheckoutPressed = () => {
    if(netInfo.isConnected){
      Alert.alert(
        "Are you sure you want to checkout your order",
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
              setTimeout(() => {
                for(let i = 1; i <= 3; i++){
                  setLoading(true)
                  if(i === 3){
                    axios.get(`${DEFAULT_URL}/customer/create_transaction`,{
                      params: {
                        lng: navigation.state.params.lng,
                        lat: navigation.state.params.lat,
                        formatted_address: shipping_address,
                        service_type_id: navigation.state.params.service_type_id,
                        from: navigation.state.params.from,
                        to: navigation.state.params.to,
                        customer_id: navigation.state.params.customer_id,
                        tasker_id: navigation.state.params.tasker_id
                      }
                    })
                    .then((response) => {
                      axios.get(`${DEFAULT_URL}/customer/create_bulk_of_transaction_service`,{
                        params: {
                          services: JSON.stringify(navigation.state.params.services.map((service) => {
                            return {
                              ...service, 
                              transaction_id: parseInt(response.data)
                            }
                          }))
                        }
                      })
                      .then((transaction_service_response) => {
                        if(transaction_service_response.data === 'Transaction service was created successfuly'){
                          setLoading(false)
                          Alert.alert(transaction_service_response.data)
                          navigation.navigate('Home')
                        }
                      })
                    })
                  }
                }
              },3000)
            } 
          }
        ],
        { cancelable: false }
      )
    }
  }

  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
    return(
      <ListItem
        title={    
          <View style={styles.serviceWrapper}>
            <Text>
              {item.service_name}
            </Text>
          </View>
        }
        subtitle={
          <View style={styles.priceWrapper}>
            <Text>
              ₱ {formatMoney(item.price)} X {item.quantity}
            </Text>
          </View>
        }
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${item.image}` } }}
        bottomDivider
      />
    )
  }

  navigation.state.params.service_details.map((ts, i) => {
    total_cost_arr.push(ts.price * ts.quantity)
  })


  if(loading || error) return null;
  if(data.customerShippingAddressList.length >= 1){
    data.customerShippingAddressList.map((sa) => {
      shipping_address_arr.push(sa.formattedAddress)
    })
  }

  return(
    <View style={{ flex: 1 }}>
      <SafeAreaView/>
      <View style={{ flex: 0.5 }}>
        <View style={styles.first_row_container}>
          <Text h4 style={styles.my_order_txt}>
            Order Details
          </Text> 
        </View>
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.second_row_container}>
          <View style={styles.serviceTypeWrapper}>
            <FlatList
              keyExtractor={keyExtractor}
              data={navigation.state.params.service_details.filter(item => item.quantity >= 1)}
              renderItem={renderItem}
            />
          </View>
        </View> 
      </View>
      <View style={styles.shipping_address_and_amount_container}>
        <Text style={styles.shipping_address_txt}>Shipping Address</Text>
        <Text style={styles.shipping_address_content_txt}>
          {shipping_address}
        </Text>
        <TouchableWithoutFeedback onPress={() => { toggleOverlay() }}>
          <Text style={styles.change_txt}>
            change
          </Text>
        </TouchableWithoutFeedback>
        <Divider style={styles.divider} />
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.amount_wrapper}>
            <Text style={styles.total_amount_txt}>
              Total Amount
            </Text>
          </View>
          <View style={styles.amount_value_wrapper}>
            <Text style={styles.total_amount_value_txt}>
              ₱ {formatMoney(total_cost_arr.reduce((a, b) => a + b))}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Divider style={styles.divider} />
        <Button 
          style={styles.select_button} 
          title="Checkout" 
          onPress={() => { _onCheckoutPressed() }}
          buttonStyle={styles.select_button_background_style} />
      </View>
      <Loader loading={isLoading} color="#ff66be" />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          width: ITEM_WIDTH
        }}>
          <View style={{ width: ITEM_WIDTH, flex: 6, paddingLeft: '10%', paddingRight: '10%' }}>
            <RadioButton.Group onValueChange={value => { setShippingAddress(value) }} value={shipping_address}>
              {
                shipping_address_arr.map(sa => {
                  return(
                    <React.Fragment>
                      <RadioButton.Item label={sa} value={sa} />
                      <Divider />
                    </React.Fragment>
                  )
                })
              }
            </RadioButton.Group>
          </View>
          <View style={{ width: ITEM_WIDTH, flex: 1 }}>            
            <SafeAreaView />
            <Button title="Close" 
              onPress={() => { toggleOverlay() }} 
              buttonStyle={styles.close_button_style}
            />
          </View>
        </View>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  first_row_container: {
    flexDirection: 'row',
    height: 70,
  },
  second_row_container: {
    flex: 2, 
    flexDirection: 'row'
  },
  my_order_txt: {
    paddingLeft: 30,
    paddingTop: 20
  },
  serviceWrapper: {
    position: 'absolute', 
    top: -10
  },
  priceWrapper: {
    position: 'relative',
    top: 10
  },
  serviceTypeWrapper: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  shipping_address_and_amount_container: {
    flex: 1.7, 
    backgroundColor: 'white'
  },
  shipping_address_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 20,
    color: 'gray'
  },
  shipping_address_content_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15,
  },
  shipping_address_content_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15
  },
  change_txt: {
    marginLeft: '5%',
    marginTop: 10,
    fontSize: 15,
    color: '#009C3C'
  },
  divider: {
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%'
  },
  amount_wrapper: {
    marginLeft: '5%',
    width: '45%',
    alignItems: 'flex-start'
  },
  amount_value_wrapper: {
    marginLeft: '5%',
    width: '40%',
    alignItems: 'flex-end'
  },
  total_amount_txt: {
    marginTop: 10,
    fontSize: 25
  },
  total_amount_value_txt: {
    marginTop: 10,
    fontSize: 25
  },
  select_button: {
    width: '100%',
    height: 150,
    marginTop: 0,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
  },
  select_button_background_style: {
    backgroundColor: '#009C3C'
  },
  close_button_style: {
    backgroundColor: "black", 
    marginLeft: '5%', 
    marginRight: '5%',
    marginTop: '5%'
  }
}) 

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}


export default memo(connect(mapStateToProps, null)(PlaceOrderScreen))