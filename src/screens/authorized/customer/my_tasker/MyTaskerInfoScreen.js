import React, { memo, useState, useEffect } from 'react';
import {  
  View, 
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { 
  Text, 
  Rating, 
  Divider, 
  ListItem, 
  Avatar,
  Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chip } from 'react-native-paper';
import { styles } from './../../../../styles/authorized/customer/my_tasker/MyTaskerInfoStyle';
import { connect } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TASKER_INFO, UPDATE_CUSTOMER_GEOLOCATION } from '../../../../queries';
import { DEFAULT_URL, GOOGLE_PLACE_API_KEY } from "../../../../actions/types";
import Geolocation from '@react-native-community/geolocation';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import Loading from '../../../../components/atoms/loader/Loading';
import OutOfLocationService from '../../../../components/molecules/out_of_location_service/OutOfLocationService';
import axios from 'axios';

const MyTaskerInfoScreen = ({ navigation, customer_id }) => {
  const pattern = /Parañaque/g
  const [compoundCode, setCompoundCode] = useState('')
  const [update_customer_geolocation] = useMutation(UPDATE_CUSTOMER_GEOLOCATION)
  const { loading, error, data } = useQuery(TASKER_INFO, {
    variables: { 
      tasker_id: navigation.state.params.tasker_id
    }
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude)
        const currentLatitude = JSON.stringify(position.coords.latitude)
        console.log(currentLatitude)
        update_customer_geolocation({ 
          variables: {
            customer_id: parseInt(customer_id),
            lng: currentLongitude,
            lat: currentLatitude,
            formatted_address: ''
          }
        }).then(({ data }) => {
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLatitude},${currentLongitude}&key=${GOOGLE_PLACE_API_KEY}`)
          .then((response) => {
            if(response.data.plus_code.compound_code !== ''){
              setCompoundCode(response.data.plus_code.compound_code)
            }
          })
        })
      },
      (error) => alert(error.message),
      { 
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 
      }
    )
  },[])

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback>
      <ListItem
        title={
          <View style={styles.fullNameWrapper}>
            <Text style={styles.fullNameTxtOnList}>
              {item.customer.firstName} {item.customer.lastName}
            </Text>
          </View>
        }
        subtitle={
          <React.Fragment>
            <View style={{marginTop: 10}}>
              <Icon 
                name='quote-left' 
                style={{ position: 'absolute' }}
                size={15}
              />
              <Text style={{ left: 20 }}>{item.comment}</Text>
            </View>
            <View style={{marginTop: 10}}>
              <Chip
                style={{alignItems: 'center'}}
              >
                <Text>
                  {item.serviceType.name}
                </Text>
              </Chip>
            </View>
          </React.Fragment>
        }
        rightTitle={ 
          <View style={styles.ratingWrapper}>
            <Rating
              type="star"
              imageSize={20}
              readonly
              startingValue={item.rating}
              
            />
          </View>
        }
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${item.customer.image}` } }}
        bottomDivider
      />
    </TouchableWithoutFeedback>
  )

  if(loading || error) return null;

  // if(compoundCode !== ""){
  //   if(compoundCode.match(pattern)[0] === 'Parañaque'){
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
                      uri: `${DEFAULT_URL}/${data.tasker[0].image}`
                    }}
                    xlarge
                    rounded
                    size={150}
                    containerStyle={styles.taskerImage}
                  />
                  <Text style={styles.fullNameTxt}>
                    {data.tasker[0].firstName} {data.tasker[0].lastName}
                  </Text>
                </View>
                <Divider style={styles.firstDivider} />
                <Text style={styles.featuredSkills}>Featured Skills</Text>
              </View>
              <View style={styles.chipWrapper}>
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
              <View style={styles.reviewWrapper}>
                <FlatList
                  keyExtractor={keyExtractor}
                  data={data.tasker[0].reviews.filter((i, index) => (index < 5))}
                  renderItem={renderItem}
                />
              </View>
              <View>
                {
                  data.tasker[0].reviews.length > 5 ? (
                    <Button                   
                      title="show more"
                      titleStyle={{ color: "#009C3C" }}
                      buttonStyle={{ backgroundColor: 'transparent' }}
                      onPress={() => { 
                        navigation.navigate('ReviewsScreen', { reviews:  data.tasker[0].reviews }) 
                      }}
                    />
                  ) : null
                }
              </View>
            </View>
          </ScrollView>
          <InternetConnectionChecker />  
        </React.Fragment>
      )
  //   }
  //   else{
  //     return <OutOfLocationService />
  //   }
  // }
  // else{
  //   return <Loading />
  // }
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(MyTaskerInfoScreen))