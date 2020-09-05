import React, { memo } from 'react';
import { 
  View, 
  FlatList,
  Platform, 
  ScrollView, 
  TouchableWithoutFeedback } from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/customer/transaction_info/ScheduledTransactionInfoStyle';
import { useQuery } from '@apollo/react-hooks';
import { TRANSACTION_SERVICE } from '../../../../queries';
import { DEFAULT_URL, ITEM_WIDTH, ITEM_HEIGHT } from '../../../../actions/types';
import { formatMoney } from '../../../../core/utils';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import _ from 'lodash';

const ScheduledTransactionInfoScreen = ({ navigation }) => {
  const total_cost_arr = []
  const ASPECT_RATIO = ITEM_WIDTH / ITEM_HEIGHT
  const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5)
  const LONGITUDE_DELTA = LATITUDE_DELTA / ASPECT_RATIO
  const { loading, error, data } = useQuery(TRANSACTION_SERVICE, {
    variables: {
      transaction_id: parseInt(navigation.state.params.transaction_id)
    }
  })

  if(loading || error) return null; 
  if([data.transactionService].length >= 1){
    const { firstName, lastName, image } = data.transactionService.tasker;
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
                <View style={styles.rect}>
                  <TouchableWithoutFeedback 
                    onPress={() => { navigation.goBack() }}
                  >
                    <Icon
                      name="arrow-left"
                      size={20}
                      style={styles.back}
                    />
                  </TouchableWithoutFeedback>
                </View>
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
        <InternetConnectionChecker />
      </React.Fragment>
    )
  }
}

export default memo(ScheduledTransactionInfoScreen)