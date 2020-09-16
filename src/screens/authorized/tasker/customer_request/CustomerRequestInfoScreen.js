import React, { memo, useState } from 'react';
import { View, FlatList, ScrollView, Platform } from 'react-native';
import { Text, ListItem, Avatar, Button, Divider } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/tasker/customer_request/CustomerRequestInfoStyle';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useNetInfo } from '@react-native-community/netinfo';
import { 
  PENDING_TRANSACTION_SERVICE_INFO, 
  UPDATE_TRANSACTION_STATUS, 
  SEND_MESSAGE } from '../../../../queries';
import { DEFAULT_URL, ITEM_WIDTH, ITEM_HEIGHT } from '../../../../actions/types';
import { formatMoney } from '../../../../core/utils';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import Loader from "react-native-modal-loader";
import _ from 'lodash';

const CustomerRequestInfoScreen = ({ navigation }) => {
  const ASPECT_RATIO = ITEM_WIDTH / ITEM_HEIGHT
  const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5)
  const LONGITUDE_DELTA = LATITUDE_DELTA / ASPECT_RATIO
  
  const total_cost_arr = []
  const netInfo = useNetInfo()
  const [isLoading, setLoading] = useState(false)

  const [approveRequest] = useMutation(UPDATE_TRANSACTION_STATUS)
  const [createRoom] = useMutation(SEND_MESSAGE)
  const { loading, error, data } = useQuery(PENDING_TRANSACTION_SERVICE_INFO, {
    variables: {
      transaction_id: parseInt(navigation.state.params.transaction_id)
    },
    pollInterval: 1000
  })

  _onApproveRequestPressed = () => { 
    if(netInfo.isConnected){
      setTimeout(() => {
        for(let i = 1; i <= 3; i++){
          setLoading(true)
          if(i == 3){
            approveRequest({ variables: { transaction_id: parseInt(navigation.state.params.transaction_id) } }).then(({ data }) => {
              if(data.updateTransactionStatus.response === 'Update was successfully') {
                createRoom({ 
                  variables: {
                    customer_id: navigation.state.params.customer_id,
                    tasker_id: navigation.state.params.tasker_id,
                    own_by_customer: false,
                    text: 'Hello'
                  } 
                })
                setLoading(false)
                navigation.navigate('CustomerRequestScreen')
                // Alert.alert("Approved")
              }
            })
          }
        }
      },3000)
    }
  }

  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
    const { name, price, image } = item.service;
    return(
      <ListItem
        title={    
          <View style={styles.serviceWrapper}>
            <Text>
              {name}
            </Text>
          </View>
        }
        subtitle={
          <View style={styles.priceWrapper}>
            <Text>
              ₱ {formatMoney(price)} X {item.quantity}
            </Text>
          </View>
        }
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${image}` } }}
        bottomDivider
      />
    )
  }

  console.log(error)


  if(loading || error) return null;
  const { firstName, lastName, image } = data.pendingTransactionServiceInfo.customer

  if([data.pendingTransactionServiceInfo].length >= 1){
    [data.pendingTransactionServiceInfo].map((ts) => {
      for(var i = 0; i <= ([ts.pendingTransactionServiceInfo].length); i++){
        console.log(ts.transactionServices)
        // total_cost_arr.push(ts.transactionServices[i].quantity * ts.transactionServices[i].service.price)
      }
    })

    return(
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.rectStackStack}>
              <View style={styles.rectStack}>
                <View style={styles.rect}/>
                <Avatar
                  source={{ 
                    uri: `${DEFAULT_URL}/${image}`
                  }}
                  xlarge
                  rounded
                  size={150}
                  containerStyle={styles.customerImage}
                />
                <Text style={styles.fullNameTxt}>
                  {firstName} {lastName} 
                </Text>
              </View>
            </View>
            <View style={styles.serviceTypeWrapper}>
              <FlatList
                keyExtractor={keyExtractor}
                data={data.pendingTransactionServiceInfo.transactionServices.filter(ts => ts.quantity >= 1)}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={styles.mapViewStack}>
            {
              Platform.OS === 'ios' ? 
              (
                <MapView
                  initialRegion={{
                    latitude: parseFloat(data.pendingTransactionServiceInfo.lat),
                    longitude: parseFloat(data.pendingTransactionServiceInfo.lng),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                  }}
                  customMapStyle={[]}
                  style={styles.mapView}
                  zoomEnabled = {true}
                  >
                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(data.pendingTransactionServiceInfo.lat),
                      longitude: parseFloat(data.pendingTransactionServiceInfo.lng)
                    }}
                    title={"title"}
                    description={"description"}
                  />
                </MapView>
              ) : (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: parseFloat(data.pendingTransactionServiceInfo.lat),
                    longitude: parseFloat(data.pendingTransactionServiceInfo.lng),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                  }}
                  customMapStyle={[]}
                  style={styles.mapView}
                  zoomEnabled = {true}
                  >
                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(data.pendingTransactionServiceInfo.lat),
                      longitude: parseFloat(data.pendingTransactionServiceInfo.lng)
                    }}
                    title={"title"}
                    description={"description"}
                  />
                </MapView>
              )
            }
          </View>
        </ScrollView>
        <View style={styles.totalCostWrapper}>
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
          <View style={styles.buttonContainer}>
            <Button title="Approve" 
              onPress={() => { _onApproveRequestPressed() }} 
              buttonStyle={{ backgroundColor: "#009C3C" }}
            />
          </View>
        </View>  
        <Loader loading={isLoading} color="#ff66be" />
        <InternetConnectionChecker />
      </React.Fragment>
    )
  }
}

export default memo(CustomerRequestInfoScreen)