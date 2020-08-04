import React, { memo } from 'react';
import { View, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, ListItem, Avatar, Button } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useNetInfo } from '@react-native-community/netinfo';
import { 
  PENDING_TRANSACTION_SERVICE_INFO, 
  UPDATE_TRANSACTION_STATUS, 
  SEND_MESSAGE } from '../../../../queries';
import { DEFAULT_URL, ITEM_WIDTH, ITEM_HEIGHT } from '../../../../actions/types';
import { formatMoney } from '../../../../core/utils';
import MapView from 'react-native-maps';
import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';
import _ from 'lodash';


const CustomerRequestInfoScreen = ({ navigation }) => {
  const total_cost_arr = [];
  const netInfo = useNetInfo();
  const ASPECT_RATIO = ITEM_WIDTH / ITEM_HEIGHT;
  const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
  const LONGITUDE_DELTA = LATITUDE_DELTA / ASPECT_RATIO;
  const [approveRequest] = useMutation(UPDATE_TRANSACTION_STATUS)
  const [createRoom] = useMutation(SEND_MESSAGE)
  const { loading, error, data } = useQuery(PENDING_TRANSACTION_SERVICE_INFO, {
    variables: {
      transaction_id: parseInt(navigation.state.params.transaction_id)
    },
    pollInterval: 1000
  });

  _onApproveRequestPressed = () => { 
    if(netInfo.isConnected){
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
          navigation.navigate('CustomerRequestScreen')
          Alert.alert("Approved")
        }
      })
    }
  }

  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
    const { name, price, image } = item.service;
    console.log(item.service)
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


  if(loading || error) return null;
  const { firstName, lastName, image } = data.pendingTransactionServiceInfo.customer;

  if([data.pendingTransactionServiceInfo].length >= 1){
    [data.pendingTransactionServiceInfo].map((ts) => {
      for(var i = 0; i <= ([ts.pendingTransactionServiceInfo].length - 1); i++){
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
                data={data.pendingTransactionServiceInfo.transactionServices}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={styles.mapViewStack}>
            <MapView
              initialRegion={{
                latitude: parseFloat(data.pendingTransactionServiceInfo.lat),
                longitude: parseFloat(data.pendingTransactionServiceInfo.lng),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
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
          </View>
        </ScrollView>
        <View style={styles.totalCostWrapper}>
          <Text style={styles.totalCost}>Total Cost</Text>
          <Text style={styles.cost}>₱ {formatMoney(total_cost_arr.reduce((a, b) => a + b))}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Approve" 
              onPress={() => { _onApproveRequestPressed() }} 
              buttonStyle={{ backgroundColor: "#009C3C" }}
            />
          </View>
        </View>  
        <InternetConnectionChecker />
      </React.Fragment>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  serviceWrapper: {
    position: 'absolute', 
    top: -10
  },
  serviceTypeWrapper: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  priceWrapper: {
    position: 'relative',
    top: 10
  },
  rect: {
    top: 0,
    left: 0,
    width: '100%',
    height: 181,
    position: "absolute",
    alignItems: 'stretch',
    backgroundColor: "#E6E6E6"
  },
  customerImage: {
    top: 90,
    left: '27%',
    position: "absolute"
  },
  fullNameTxt: {
    top: 198,
    left: 20,
    position: "absolute",
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20
  },
  rectStack: {
    top: 0,
    left: 0,
    width: '210%',
    height: 281,
    position: "absolute"
  },
  rectStackStack: {
    width: 428,
    height: 281
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -8
  },
  totalCostWrapper: {
    width: '100%',
    height: 100,
    backgroundColor: "white",
    position: 'relative'
  },
  totalCost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginLeft: 42,
    position: 'absolute',
    marginTop: "2%"
  },
  cost: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 25,
    marginLeft: '55%',
    position: 'absolute',
    marginTop: '2%'
  },
  mapView: {
    position: "absolute",
    top: -70,
    left: 0,
    height: 641,
    width: '100%'
  },
  mapViewStack: {
    width: '100%',
    height: 400,
    position: 'relative',
    top:'15%'
  },
  buttonContainer: {
    width: ITEM_WIDTH,
    paddingLeft: '4%',
    paddingRight: '4s%',
    paddingTop: '12%'
  }
});

export default memo(CustomerRequestInfoScreen);