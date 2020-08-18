import React, { memo } from 'react';
import {  
  StyleSheet, 
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

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  fullNameWrapper: {
    position: 'absolute', 
    top: -8
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 0
  },
  fullNameTxtOnList: {
    fontWeight: 'bold'
  }
});

export default memo(ReviewsScreen);