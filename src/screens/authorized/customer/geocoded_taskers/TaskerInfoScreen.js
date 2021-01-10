import React, { memo } from 'react';
import {  
  View, 
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { 
  Text, 
  Rating, 
  Button, 
  Divider, 
  ListItem, 
  Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chip } from 'react-native-paper';
import { DEFAULT_URL } from "./../../../../actions/types";
import { TASKER_INFO } from '../../../../queries';
import { styles } from './../../../../styles/authorized/customer/geocoded_taskers/TaskerInfoStyle';
import { useQuery } from '@apollo/react-hooks';
import { useNetInfo } from "@react-native-community/netinfo";
import { formatMoney } from '../../../../core/utils';

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

const TaskerInfoScreen = ({ navigation }) => {
  const netInfo = useNetInfo()
  const { loading, error, data } = useQuery(TASKER_INFO, {
    variables: { 
      tasker_id: navigation.state.params.tasker_id
    },
  })

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
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
        right
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
  
  const _onNavigateToInfoListAndSaveTransactionPressed = () => {
    if(netInfo.isConnected){
      navigation.navigate('PlaceOrderScreen',{
        lng: navigation.state.params.lng,
        lat: navigation.state.params.lat,
        formatted_address: navigation.state.params.formatted_address,
        service_type_id: navigation.state.params.service_type_id,
        from: navigation.state.params.start_from,
        to: navigation.state.params.start_to,
        customer_id: navigation.state.params.customer_id,
        tasker_id: navigation.state.params.tasker_id,
        services: navigation.state.params.services,
        service_details: navigation.state.params.service_details
      })
    }
  }

  if(loading || error) return null;
  return(
    <>
      <View style={{ flex: 6.5 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.rectStackStack}>
              <View style={styles.rectStack}>
                <View style={styles.rect}/>
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
      </View>
      <View style={styles.second_box_wrapper}>
        <View style={{ flexDirection: 'row' }}>
            <View style={styles.amount_wrapper}>
              <Text style={styles.total_amount_txt}>
                Total Amount
              </Text>
            </View>
            <View style={styles.amount_value_wrapper}>
              <Text style={styles.total_amount_value_txt}>
                ₱ {formatMoney(navigation.state.params["total_price"])}
              </Text>
            </View>
          </View>
          <Divider style={styles.divider} />
        <Button 
          style={styles.next_button} 
          title="Checkout" 
          onPress={() =>{  _onNavigateToInfoListAndSaveTransactionPressed() }} 
          buttonStyle={styles.next_button_background_color} />
      </View> 
    <InternetConnectionChecker />
    </>
  )
}

export default memo(TaskerInfoScreen)