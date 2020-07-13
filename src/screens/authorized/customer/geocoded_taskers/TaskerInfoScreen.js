import React, { memo } from 'react';
import {  
  StyleSheet, 
  Image,
  View, 
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Text, Rating, Button, Divider, ListItem } from 'react-native-elements';
import { Chip } from 'react-native-paper';

import { DEFAULT_URL } from "./../../../../actions/types";
import { TASKER_INFO } from '../../../../queries';
import { useQuery } from '@apollo/react-hooks';
import axios from 'axios';

const TaskerInfoScreen = ({ navigation }) => {
  const image_url =  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg";
  const { loading, error, data } = useQuery(TASKER_INFO, {
    variables: { 
      tasker_id: navigation.state.params["tasker_id"]
    },
    pollInterval: 500
  });

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback>
      <ListItem
        title={
          <View style={ styles.fullNameWrapper }>
            <Text style={ styles.fullNameTxtOnList }>{item.customer.firstName} {item.customer.lastName}</Text>
          </View>
        }
        subtitle={
          <React.Fragment>
            <View style={{ marginTop: 10 }}>
              <Text>{item.comment}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Chip 
                width={100} 
                style={{ alignItems: 'center' }}
              >
                {item.serviceType.name}
              </Chip>
            </View>
          </React.Fragment>
        }
        rightTitle={ 
          <View style={ styles.ratingWrapper }>
            <Rating
              type="star"
              imageSize={20}
              readonly
              startingValue={item.rating}
              
            />
          </View>
        }
        leftAvatar={{ source: { uri: "../../../../assets/avatar.png" } }}
        bottomDivider
      />
    </TouchableWithoutFeedback>
  )
  
  const _onNavigateToInfoListAndSaveTransactionPressed = () => {
    axios.get(`${DEFAULT_URL}/customer/create_transaction`,{
      params: {
        lng: navigation.state.params["longitude"],
        lat: navigation.state.params["latitude"],
        service_type_id: navigation.state.params["service_type_id"],
        start_from: navigation.state.params["start_from"],
        start_to: navigation.state.params["start_to"],
        customer_id: navigation.state.params["customer_id"],
        tasker_id: navigation.state.params["tasker_id"]
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
  return(
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.rectStackStack}>
            <View style={styles.rectStack}>
              <View style={styles.rect}/>
              <Image
                source={require("../../../../assets/tasker.png")}
                resizeMode="contain"
                style={styles.image2}
              />
              <Text style={styles.fullNameTxt}>{data.tasker[0].firstName} {data.tasker[0].lastName}</Text>
            </View>
            <Divider style={styles.firstDivider} />
            <Text style={styles.featuredSkills}>Featured Skills</Text>
          </View>
          <View style={styles.chipWrapper }>
            <ScrollView 
              showsHorizontalScrollIndicator={false} 
              showsVerticalScrollIndicator={false}
              horizontal={true}
            >
              {
                data.tasker[0].featuredSkills.map((fs) => {
                  if(fs.serviceType !== null){
                    return(
                      <Chip>{fs.serviceType.name}</Chip>
                    )
                  }
                })
              }
            </ScrollView>
          </View>
          <Divider style={styles.secondDivider} />
          <Text style={styles.introduction}>Introduction</Text>
          <Text style={styles.introductionContent}>
            {data.tasker[0].introduction}
          </Text>
          <View style={styles.reviewWrapper }>
            <FlatList
              keyExtractor={keyExtractor}
              data={data.tasker[0].reviews}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ScrollView>  
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  image2: {
    top: 81,
    left: 228,
    width: 200,
    height: 200,
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
  featuredSkills: {
    top: 257,
    left: 20,
    position: "absolute",
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20
  },
  rectStackStack: {
    width: 428,
    height: 281
  },
  chipWrapper: {
    flex: 1,
    height: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    width: '90%',
    marginLeft: '5%',
    alignContent: 'center'    
  },
  reviewWrapper: {
    flex: 1,
    height: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    width: '90%',
    height: '100%',
    marginLeft: '5%',
    alignContent: 'center'    
  },
  introduction: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 20,
    marginTop: 27,
    marginLeft: 20
  },
  introductionContent: {
    fontFamily: "verdana",
    color: "#121212",
    fontSize: 15,
    marginTop: 20,
    marginLeft: 20
  },
  firstDivider: {
    backgroundColor: 'silver', 
    top: '90%', 
    marginLeft: '5%', 
    marginRight: '7.6%'
  },
  secondDivider: {
    backgroundColor: 'silver', 
    top: 20, 
    marginLeft: '5%', 
    marginRight: '5%' 
  },
  fullNameWrapper: {
    position: 'absolute', 
    top: -10
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 0
  },
  fullNameTxtOnList: {
    fontWeight: 'bold'
  }
});

export default memo(TaskerInfoScreen);