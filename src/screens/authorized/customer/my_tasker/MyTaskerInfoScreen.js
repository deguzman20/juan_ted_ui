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
  Divider, 
  ListItem, 
  Avatar,
  Button } from 'react-native-elements';
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { DEFAULT_URL } from "../../../../actions/types";
import { TASKER_INFO } from '../../../../queries';
import { useQuery } from '@apollo/react-hooks';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

const MyTaskerInfoScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(TASKER_INFO, {
    variables: { 
      tasker_id: navigation.state.params.tasker_id
    },
  });

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

  if(loading || error) return null;
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
  taskerImage: {
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
    marginTop: '5%',
    marginLeft: '5%'
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
    top: -8
  },
  ratingWrapper: {
    position: 'absolute', 
    top: 0
  },
  fullNameTxtOnList: {
    fontWeight: 'bold'
  },
  back: {
    fontFamily: "verdana",
    color: "#121212",
    marginTop: 65,
    marginLeft: 35
  }
});

export default memo(MyTaskerInfoScreen);