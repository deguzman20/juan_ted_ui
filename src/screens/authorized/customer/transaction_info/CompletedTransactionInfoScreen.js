import React, { memo, useState } from 'react';
import { 
  View, 
  FlatList, 
  ScrollView, 
  Alert,
  TouchableWithoutFeedback,
  Platform } from 'react-native';
import { 
  Text, 
  ListItem, 
  Avatar, 
  Button, 
  Rating, 
  Overlay,
  Divider } from 'react-native-elements';
import { styles } from './../../../../styles/authorized/customer/transaction_info/CompletedTransactionInfoStyle';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useNetInfo } from '@react-native-community/netinfo';
import { TRANSACTION_SERVICE, CREATE_REVIEW } from '../../../../queries';
import { DEFAULT_URL, ITEM_WIDTH, ITEM_HEIGHT } from '../../../../actions/types';
import { formatMoney } from '../../../../core/utils';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from "react-native-modal-loader";
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import TextInput from '../../../../components/atoms/text_input/TextInput';
import _ from 'lodash';

const CompletedTransactionInfoScreen = ({ navigation, customer_id }) => {
  const total_cost_arr = []
  const netInfo = useNetInfo()
  const [isLoading, setLoading] = useState(false)  
  const [visible, setVisible] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState({ value: '', error: '' })

  const ASPECT_RATIO = ITEM_WIDTH / ITEM_HEIGHT
  const LATITUDE_DELTA = (Platform.OS === global.platformIOS ? 1.5 : 0.5)
  const LONGITUDE_DELTA = LATITUDE_DELTA / ASPECT_RATIO
  const [submit_review] = useMutation(CREATE_REVIEW)
  const { loading, error, data } = useQuery(TRANSACTION_SERVICE, {
    variables: {
      transaction_id: parseInt(navigation.state.params.transaction_id)
    }
  })

  toggleOverlay = () => {
    setVisible(!visible)
  }

  ratingCompleted = (rating) => {
    setRating(rating)
  }

  if(loading || error) return null; 
  if([data.transactionService].length >= 1){
    _onSubmitReviewPressed = () => {
      if(netInfo.isConnected){
        setTimeout(() => {
          for(let i = 1; i <= 3; i++){
            setLoading(true)
            submit_review({ 
              variables: { 
                rating: parseInt(rating), 
                comment: comment.value,
                customer_id: parseInt(customer_id),
                tasker_id: parseInt(data.transactionService.tasker.id), 
                service_type_id: parseInt(data.transactionService.serviceType.id),
                transaction_id: parseInt(navigation.state.params.transaction_id)
              } 
            }).then(({ data }) => {
              if(i === 3 && data.createReview.response === 'Review Created'){
                setLoading(false)
                Alert.alert('Review sent successfuly')
                navigation.navigate('CompletedTaskScreen')
              }
            })
          }
        },3000)
      }
    }
    
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
        {
          !data.transactionService.review ? (
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
                <Button title="Review" 
                  onPress={() => { toggleOverlay() }} 
                  buttonStyle={{ backgroundColor: "#009C3C" }}
                />
              </View>
            </View>
          ) :
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
          )
        }
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            width: ITEM_WIDTH
          }}>
            <Divider style={{ width: ITEM_WIDTH }} />
            <View style={{width: ITEM_WIDTH, flex: 1.5, alignItems: 'center'}}>
              <Avatar
                source={{ 
                  uri: `${DEFAULT_URL}/${image}`
                }}
                xlarge
                rounded
                size={150}
                containerStyle={{ position: 'relative', top: '20%' }}
              />
              <Text h3 style={{ position: 'relative', top: '20%' }}>
                {firstName} {lastName} 
              </Text>
              <Text h5 style={{ position: 'relative', top: '20%' }}>
                Rate the service provided
              </Text>
              <Rating
                onFinishRating={ratingCompleted}
                style={{ paddingVertical: 10, position: 'relative', top: '20%' }}
              />
            </View>
            <View style={{width: ITEM_WIDTH, flex: 1 }}>
              <TextInput
                label="Comment"
                returnKeyType="done"
                multiline={true}
                style={{ height: 150, marginLeft: '5%', marginRight: '5%' }}
                value={comment.value}
                onChangeText={text => setComment({ value: text, error: '' })}
                error={!!comment.error}
                errorText={comment.error}
                />
              </View>
            <View style={{width: ITEM_WIDTH, flex: 1}}>            
              <Button title="Submit review" 
                onPress={() => { _onSubmitReviewPressed()  }} 
                buttonStyle={{ backgroundColor: "#009C3C", marginLeft: '5%', marginRight: '5%' }}
              />
              <Button title="Not now" 
                onPress={() => { toggleOverlay() }} 
                buttonStyle={{ backgroundColor: "black", marginLeft: '5%', marginRight: '5%', marginTop: '5%' }}
              />
            </View>
          </View>
        </Overlay>
        <Loader loading={isLoading} color="#ff66be" />
        <InternetConnectionChecker />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(CompletedTransactionInfoScreen))