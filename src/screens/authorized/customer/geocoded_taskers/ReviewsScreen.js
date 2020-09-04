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
  ListItem, 
} from 'react-native-elements';
import { Chip } from 'react-native-paper';
import { DEFAULT_URL } from "../../../../actions/types";
import { styles } from './../../../../styles/authorized/customer/geocoded_taskers/ReviewsStyle';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

const ReviewsScreen = ({ navigation }) => {
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
              <Text>{item.comment}</Text>
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

  return(
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.reviewWrapper}>
            <FlatList
              keyExtractor={keyExtractor}
              data={navigation.state.params.reviews}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ScrollView>
      <InternetConnectionChecker />  
    </React.Fragment>
  )
}

export default memo(ReviewsScreen)