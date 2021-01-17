import React, { memo, useState } from 'react';
import { View, FlatList, ScrollView, Platform } from 'react-native';
import { Text, ListItem, Avatar, Button, Divider } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/tasker/transaction_info/TransactionInfoStyle';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { TRANSACTION_SERVICE, UPDATE_TRANSACTION_STATUS_TO_DONE, CREATE_NOTIFICATION } from '../../../../queries';
import { DEFAULT_URL, ITEM_WIDTH, ITEM_HEIGHT } from '../../../../actions/types';
import { formatMoney } from '../../../../core/utils';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Loader from "react-native-modal-loader";
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import isEqual from 'lodash/isEqual';

const TransactionInfoScreen = ({ navigation, tasker_id }) => {
  const total_cost_arr = []
  const netInfo = useNetInfo()
  const [isLoading, setLoading] = useState(false)
  const ASPECT_RATIO = ITEM_WIDTH / ITEM_HEIGHT
  const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5)
  const LONGITUDE_DELTA = LATITUDE_DELTA / ASPECT_RATIO
  const [update_transaction_status_to_done] = useMutation(UPDATE_TRANSACTION_STATUS_TO_DONE)
  const [create_notification] = useMutation(CREATE_NOTIFICATION)
  const { loading, error, data } = useQuery(TRANSACTION_SERVICE, {
    variables: {
      transaction_id: parseInt(navigation.state.params.transaction_id)
    }
  })

  if(loading || error) return null; 
  if([data.transactionService].length >= 1){
    const { firstName, lastName, image, id } = data.transactionService.customer;

    
    
    const _onMarkAsDonePressed = () => {
      if(netInfo.isConnected){
        setTimeout(() => {
          for(let i = 1; i <= 3; i++){
            setLoading(true)
            update_transaction_status_to_done({ 
              variables: {
                transaction_id: parseInt(navigation.state.params.transaction_id)
              }
            }).then(({ data }) => {
              if(i === 3 && data.updateTransactionStatusToDone.response === 'Update was successfully') {
                setLoading(false)
                create_notification({
                  variables: {
                    customer_id: parseInt(id),
                    tasker_id: tasker_id,
                    text: 'Your task was completed'
                  }
                }).then(({ data: { createNotification: { response } } }) => {
                  if(isEqual(response, "Successfuly updated")){
                    
                  }
                })
                // Alert.alert("Mark as completed");
                navigation.navigate('AppointmentScreen');
              }
            })
          }
        },3000)
      }
    } 

    const keyExtractor = (item, index) => index.toString()    
    const renderItem = ({ item }) => {
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
  
    [data.transactionService].map((ts) => {
      for(var i = 0; i <= (ts.transactionServices.length - 1); i++){
        total_cost_arr.push(ts.transactionServices[i].quantity * ts.transactionServices[i].service.price)
      }
    })
    return(
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.rectStackStack}>
              <View style={styles.rectStack}>
                <View style={styles.rect}/>
                <Text style={styles.fullNameTxt}>
                  {firstName} {lastName} 
                </Text>
                <Avatar
                  source={{ 
                    uri: `${DEFAULT_URL}/${image}`
                  }}
                  xlarge
                  rounded
                  size={150}
                  containerStyle={styles.customerImage}
                />
              </View>
            </View>
            <View style={styles.serviceTypeWrapper}>
              <FlatList
                keyExtractor={keyExtractor}
                data={data.transactionService.transactionServices.filter(ts => ts.quantity >= 1)}
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
                    latitude: parseFloat(data.transactionService.lat),
                    longitude: parseFloat(data.transactionService.lng),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  customMapStyle={[]}
                  style={styles.mapView}
                  zoomEnabled = {true}
                  >
                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(data.transactionService.lat),
                      longitude: parseFloat(data.transactionService.lng)
                    }}
                    title={"Info"}
                    description={"description"}
                  />
                </MapView>
              ) : (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: parseFloat(data.transactionService.lat),
                    longitude: parseFloat(data.transactionService.lng),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  customMapStyle={[]}
                  style={styles.mapView}
                  zoomEnabled = {true}
                  >
                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(data.transactionService.lat),
                      longitude: parseFloat(data.transactionService.lng)
                    }}
                    title={"Info"}
                    description={"description"}
                  />
                </MapView>
              )
            }
          </View>
        </ScrollView>
        {
          data.transactionService.done ?
          (
            <View style={styles.unDoneTotalCostWrapper}>
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
            </View>  
          ): 
          (
            <View style={styles.doneTotalCostWrapper}>
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
                <Button title="Mark as completed" 
                  onPress={() => { _onMarkAsDonePressed() }} 
                  buttonStyle={{ backgroundColor: "#009C3C" }}
                />
              </View>
            </View>  
          )
        }
        <Loader loading={isLoading} color="#ff66be" />
        <InternetConnectionChecker />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: parseInt(taskerReducer.id)
  }
}

export default memo(connect(mapStateToProps, null)(TransactionInfoScreen))