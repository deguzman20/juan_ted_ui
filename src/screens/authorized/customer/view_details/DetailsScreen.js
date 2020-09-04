import React, { memo } from 'react';
import { 
  View, 
  Image, 
  ScrollView,
  FlatList,
  TouchableWithoutFeedback } from 'react-native';
import {
  Text, 
  Rating, 
  ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './../../../../styles/authorized/customer/view_details/DetailsStyle';
import { useQuery } from '@apollo/react-hooks';
import { DEFAULT_URL } from '../../../../actions/types';
import { MOST_HELPFUL_REVIEW } from '../../../../queries';
import _ from 'lodash';

const DetailsScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(MOST_HELPFUL_REVIEW, {
    variables: { service_id: parseInt(navigation.state.params.id) },
    pollInterval: 500,
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
              <Text style={{ left: 20 }}>
                {item.comment}
              </Text>
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

  if (loading || error) return null;

  return(
    <React.Fragment>
      <View style={ styles.container }>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.image_container}>
            <Image 
              style={styles.image_size}  
              source={{  
                uri: `${DEFAULT_URL}/${navigation.state.params.image}` 
              }} 
            />
          </View>
          <View style={styles.service_benifit_wrapper}>
            <View style={styles.benifit_header_wrapper}>
              <Text style={styles.benifit_header_txt}>
                Why Lokal {navigation.state.params.service_name} at home is safer?
              </Text>
            </View>
            {
              navigation.state.params.why_this_service.length >= 1 ?
                (
                  navigation.state.params.why_this_service.map((data) => {
                    return(
                      <View style={styles.benifit_content_wrapper}>
                        <Text style={styles.benifit_content_txt}>- </Text>
                        <Text style={styles.benifit_content_txt}>{data.reason}</Text>
                      </View>
                    )
                  })
                ) : 
                null
            }
          </View>
          <View style={styles.included_wrapper}>
            <View style={styles.included_header_wrapper}>
              <Text style={styles.included_header_txt}>
                What's Including
              </Text>
            </View>
            {
              navigation.state.params.why_this_service.length >= 1 ?
                (
                  navigation.state.params.what_is_included.map((data) => {
                    return(
                      <View style={styles.benifit_content_wrapper}>
                        <Text style={styles.included_content_txt}>- </Text>
                        <Text style={styles.included_content_txt}>{data.text}</Text>
                      </View>
                    )
                  })
                ) : 
                null
            }
          </View>
          <View style={styles.equipments_wrapper}>
            <View style={styles.equipment_header_wrapper}>
              <Text style={styles.equipments_header_txt}>
                Equipments
              </Text>
            </View>
            {
              navigation.state.params.why_this_service.length >= 1 ?
                (
                  navigation.state.params.equipment_use.map((data) => {
                    return(
                      <View style={styles.benifit_content_wrapper}>
                        <Text style={styles.equipments_content_txt}>- </Text>
                        <Text style={styles.equipments_content_txt}>{data.text}</Text>
                      </View>
                    )
                  })
                ) : 
                null
            }
          </View>
          <View style={styles.reviews_wrapper}>
            <View style={styles.reviews_header_wrapper}>
              <Text style={styles.reviews_header_txt}>
                Most Helpful Review
              </Text>
              {
                data.mostHelpfulReviews.length >= 1 ?
                (
                  <FlatList
                    keyExtractor={keyExtractor}
                    data={data.mostHelpfulReviews.filter((i, index) => (index < 5))}
                    renderItem={renderItem}
                  />
                ):
                (
                  <React.Fragment>
                    <View>
                      <Text h5 style={styles.review_content_txt}>No Review yet</Text>
                    </View>
                  </React.Fragment>
                )
              }
            </View>
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
  )
}

export default memo(DetailsScreen)