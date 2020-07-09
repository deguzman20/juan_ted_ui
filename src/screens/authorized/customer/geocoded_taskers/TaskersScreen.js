import React, { memo } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, Text, Button, Rating } from 'react-native-elements';
import { DEFAULT_URL } from "./../../../../actions/types";
import { TASKER_BY_GEOLOCATION } from '../../../../queries';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';

const TaskersScreen = ({ navigation, customer_id }) => {
  const { loading, error, data } = useQuery(TASKER_BY_GEOLOCATION, {
    variables: { 
      lng: String(navigation.state.params["longitude"]), 
      lat: String(navigation.state.params["latitude"]),
      service_type_id: navigation.state.params["service_type_id"],
      start_from: navigation.state.params["start_from"],
      start_to: navigation.state.params["start_to"],
    },
    pollInterval: 500
  });

  const _onNavigateToInfoListAndSaveTransactionPressed = (tasker_id) => {
    axios.get(`${DEFAULT_URL}/customer/create_transaction`,{
      params: {
        lng: navigation.state.params["longitude"],
        lat: navigation.state.params["latitude"],
        service_type_id: navigation.state.params["service_type_id"],
        start_from: navigation.state.params["start_from"],
        start_to: navigation.state.params["start_to"],
        customer_id: parseInt(customer_id),
        tasker_id: parseInt(tasker_id)
      }
    })
    .then((response) => {
      axios.get(`${DEFAULT_URL}/customer/create_bulk_of_transaction_service`,{
        params: {
          services: navigation.state.params["services"].map((service) => {
            return {...service, transaction_id: parseInt(response.data)}
          })
        }
      })
      .then((transaction_service_response) => {
        console.log(transaction_service_response.data)
      })
    })
  }

  if(loading || error) return null;
  if(data['taskerByGeolocation'].length >= 1){
    return(
      <React.Fragment>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data['taskerByGeolocation'].map((tasker) => (
            <Card>
              <View style={styles.container}>
                <View style={styles.rect}>
                  <View style={styles.imageRow}>
                    <Image
                      source={require("../../../../assets/avatar.png")}
                      resizeMode="contain"
                      styles={styles.image}
                    />
                    <Text style={styles.fullName}>{tasker['firstName']} {tasker['lastName']}</Text>
                  </View>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={(_.sumBy(tasker['reviews'], 'rating')) / 5}
                  />
                  
                  <Button 
                    title="Select" 
                    style={styles.materialButtonPrimary1}
                    onPress={() => { _onNavigateToInfoListAndSaveTransactionPressed(tasker['id']) }}
                    buttonStyle={{ backgroundColor: "#009C3C" }}
                  />
                  <Button title="View Review" style={styles.materialButtonPrimary2} buttonStyle={{ backgroundColor: 'black' }}/>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      </React.Fragment>
    )
  }
  else{
    return(
      <View style={styles.empty_tasker_list_container}>
        <Image source={require('../../../../assets/avatar.png')} />
        <Text h3 style={styles.empty_tasker_txt}>No available tasker</Text>
      </View>
    );
  }
}


const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

const styles = StyleSheet.create({
  empty_tasker_txt: {
    textAlign: 'center',
    color: 'black'
  },
  empty_tasker_list_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  container: {
    width: 344,
    height: 213
  },
  rect: {
    width: 344,
    height: 213,
    backgroundColor: "white"
  },
  image: {
    width: 100,
    height: 64
  },
  fullName: {
    fontFamily: "verdana",
    fontSize: 15,
    width: 250,
    color: "#121212",
    marginLeft: 20,
    marginTop: 15
  },
  imageRow: {
    height: 64,
    flexDirection: "row",
    marginTop: 19,
    marginLeft: 22,
    marginRight: 208
  },
  materialButtonPrimary1: {
    height: 36,
    width: '90%',
    marginTop: 31,
    marginLeft: '5%',
    marginRight: '5%'
    
  },
  materialButtonPrimary2: {
    height: 36,
    width: '90%',
    backgroundColor: "green",
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%'
  }
});

export default memo(connect(mapStateToProps, null)(TaskersScreen))