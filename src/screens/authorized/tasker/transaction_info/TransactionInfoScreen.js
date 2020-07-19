import React, { memo, useState } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Text, ListItem, Avatar } from 'react-native-elements';
import { useQuery } from '@apollo/react-hooks';
import { TRANSACTION_SERVICE } from '../../../../queries';
import { BACKEND_ASSET_URL, ITEM_WIDTH, ITEM_HEIGHT } from '../../../../actions/types';
import { formatMoney } from '../../../../core/utils';
import MapView from 'react-native-maps';
import _ from 'lodash';

const TransactionInfoScreen = ({ navigation }) => {
  const ASPECT_RATIO = ITEM_WIDTH / ITEM_HEIGHT;
  const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5);
  const LONGITUDE_DELTA = LATITUDE_DELTA / ASPECT_RATIO;
  const { loading, error, data } = useQuery(TRANSACTION_SERVICE, {
    variables: {
      transaction_id: parseInt(navigation.state.params.transaction_id)
    },
    pollInterval: 1000
  });

  const { firstName, lastName, image } = data.transactionService.customer;
  const total_cost_arr = [];

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
        leftAvatar={{ source: { uri: `${BACKEND_ASSET_URL}/${image}` } }}
        bottomDivider
      />
    )
  }

  if(loading || error) return null;
  if([data.transactionServices].length >= 1){
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
                <Avatar
                  source={{ 
                    uri: `${BACKEND_ASSET_URL}/${image}`
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
                data={data.transactionService.transactionServices}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={styles.mapViewStack}>
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
                title={"title"}
                description={"description"}
              />
            </MapView>
          </View>
        </ScrollView>
        <View style={styles.totalCostWrapper}>
          <Text style={styles.totalCost}>Total Cost</Text>
          <Text style={styles.cost}>P {formatMoney(total_cost_arr.reduce((a, b) => a + b))}</Text>
        </View>  
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
    height: 50,
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
    marginLeft: '65%',
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
  }
});

export default memo(TransactionInfoScreen);