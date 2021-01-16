import React, { memo, useState } from 'react';
import { 
  View, 
  SafeAreaView, 
  FlatList, 
  Alert, 
  TouchableWithoutFeedback } from 'react-native';
import { Text, ListItem, Divider, Button, Overlay } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { styles } from '../../../../styles/authorized/customer/place_order/PlaceOrderStyle';
import { formatMoney } from './../../../../core/utils';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { BILLING_ADDRESSES_LIST } from './../../../../queries';
import { DEFAULT_URL, ITEM_WIDTH } from "./../../../../actions/types";
import { useNetInfo } from "@react-native-community/netinfo";

import Loader from "react-native-modal-loader";
import axios from 'axios';
import { isEqual } from 'apollo-utilities';

const PlaceOrderScreen = ({ navigation, customer_id }) => {
  const netInfo = useNetInfo()
  const total_cost_arr = []
  const billing_address_arr = []
  const shipping_address_arr = [navigation.state.params.formatted_address]
  const [payment_method, setPaymentMethod] = useState('')
  const [shipping_address, setShippingAddress] = useState('')
  const [billing_address, setBillingAddress] = useState({ value:'', id: null })
  const [isLoading, setLoading] = useState(false)


  const [billingAddressVisibility, setBillingAddressVisibility] = useState(false)
  const [paymentMethodVisibility, setPaymentMethodVisibility] = useState(false)

  const { loading, error, data } = useQuery(BILLING_ADDRESSES_LIST, {
    onCompleted: (data) => {
      billing_address_arr.push(data.billingAddressList)
    },
    variables: {
      customer_id: parseInt(customer_id)
    },
    pollInterval: 1000
  })

  billingAddressToggleOverlay = () => {
    if(billing_address_arr !== null){
      console.log(billing_address_arr)
    }
    setBillingAddressVisibility(!billingAddressVisibility)
  }

  paymentMethodToggleOverlay = () => {
    setPaymentMethodVisibility(!paymentMethodVisibility)
  }


  const _onCheckoutPressed = () => {
    if(netInfo.isConnected){
      if(!isEqual(payment_method, '') && !isEqual(billing_address.value, '')){
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
                          tasker_id: navigation.state.params.tasker_id,
                          billing_address_id: billing_address.id
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
                            if(payment_method === 'Paypal'){
                              navigation.navigate('PaypalScreen', {
                                tasker_id: navigation.state.params.tasker_id
                              })
                            }
                            else if(payment_method === 'Debit'){
                              navigation.navigate('DebitCardScreen', {
                                amount: total_cost_arr.reduce((a, b) => a + b),
                                billing_address_id: billing_address.id,
                                tasker_id: navigation.state.params.tasker_id
                              })
                            }
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
      else if(isEqual(payment_method, '') && !isEqual(billing_address.value, '')){
        Alert.alert("Please select payment method")
      }
      else if(!isEqual(payment_method, '') && isEqual(billing_address.value, '')){
        Alert.alert("Please select billing address")
      }
      else {
        Alert.alert("Please select billing address and payment method")
      }
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

  keyBillingExtractor = (item, index) => index.toString()
  
  renderBillingItem = ({ item }) => {
    return(
      <ListItem
        title={    
          <View style={styles.serviceWrapper}>
            <Text>
              {item.addressLineOne}
            </Text>
          </View>
        }
        subtitle={
          <View style={styles.priceWrapper}>
          </View>
        }
        // leftAvatar={{ source: { uri: `${DEFAULT_URL}/${item.image}` } }}
        rightElement={
          <Button title={"Select"} 
            buttonStyle={styles.bt_main_color}
            onPress={() => {
              setBillingAddress({ value: item.addressLineOne, id: parseInt(item.id) })
              billingAddressToggleOverlay()
            }}
          />
        }
        bottomDivider
      />
    )
  }

  navigation.state.params.service_details.map((ts, i) => {
    total_cost_arr.push(ts.price * ts.quantity)
  })


  if(loading || error) return null;
  if(data.billingAddressList.length >= 1){
    billing_address_arr.push(data.billingAddressList);
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
      <View style={styles.billing_address_and_amount_container}>
        <Text style={styles.billing_address_txt}>Billing Address</Text>
        <Text style={styles.bliing_address_content_txt}>
          {billing_address.value}
        </Text>
        <TouchableWithoutFeedback onPress={() => { billingAddressToggleOverlay() }}>
          <Text style={styles.change_txt}>
            {isEqual(billing_address.value, '') ? 'Select' : 'Change'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { navigation.navigate('NewBillingAddressScreen') }}>
          <Text style={styles.change_txt}>
            Add new billing address
          </Text>
        </TouchableWithoutFeedback>
        <Divider style={styles.divider} />
        <Text style={styles.payment_method_txt}>Payment Method</Text>
        <Text style={styles.payment_method_content_txt}>
          {payment_method}
        </Text>
        <TouchableWithoutFeedback onPress={() => { paymentMethodToggleOverlay() }}>
          <Text style={styles.change_txt}>
          {isEqual(payment_method, '') ? 'Select' : 'Change'}
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
      <Overlay isVisible={billingAddressVisibility} onBackdropPress={billingAddressToggleOverlay}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          width: ITEM_WIDTH
        }}>
          <SafeAreaView />
          <View style={{ width: ITEM_WIDTH, flex: 6, paddingLeft: '10%', paddingRight: '10%' }}>
            <View style={{ flex: 0.2 }}>
              <View style={styles.first_row_container}>
                <Text h4 style={styles.select_billing_txt}>
                  Select Billing Address
                </Text> 
              </View>
            </View>
            <FlatList
                keyExtractor={keyBillingExtractor}
                data={billing_address_arr[0]}
                renderItem={renderBillingItem}
              />
          </View>
          <View style={{ width: ITEM_WIDTH, flex: 1 }}>            
            <SafeAreaView />
            <Button title="Close" 
              onPress={() => { billingAddressToggleOverlay() }} 
              buttonStyle={styles.close_button_style}
            />
          </View>
        </View>
      </Overlay>
      <Overlay isVisible={paymentMethodVisibility} onBackdropPress={paymentMethodToggleOverlay}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          width: ITEM_WIDTH
        }}>
          <SafeAreaView />
          <View style={{ width: ITEM_WIDTH, flex: 6, paddingLeft: '10%', paddingRight: '10%' }}>
            <RadioButton.Group onValueChange={value => { setPaymentMethod(value) }} value={payment_method}>
                <>
                  <RadioButton.Item label={'Paypal'} value={'Paypal'} />
                  <Divider />
                  <RadioButton.Item label={'Debit'} value={'Debit'} />
                  <Divider />
                  {/* <RadioButton.Item label={'Gcash'} value={'Gcash'} /> */}
                  <Divider />
                </>
            </RadioButton.Group>
          </View>
          <View style={{ width: ITEM_WIDTH, flex: 1 }}>            
            <SafeAreaView />
            <Button title="Close" 
              onPress={() => { paymentMethodToggleOverlay() }} 
              buttonStyle={styles.close_button_style}
            />
          </View>
        </View>
      </Overlay>
    </View>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(PlaceOrderScreen))