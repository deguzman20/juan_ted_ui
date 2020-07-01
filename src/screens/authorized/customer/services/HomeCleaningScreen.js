import React, { memo } from 'react';
import { Card } from 'react-native-elements'
import { ITEM_WIDTH } from '../../../../actions/types';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';

const HomeCleaningScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.header6}>What is your Home Type?</Text>
        </View>
        <View style={styles.container2}>
          <FlatList
            data={[
              {key: 'Condo', id: '1', price: 'P200', },
              {key: 'House', id: '2', price: 'P150', },
            ]}
              
            renderItem={({item}) => 
              <View style={styles.item}>
                <Card>
                  <View style={styles.cardCol,styles.container2}>
                    <Image style={styles.iconXl} source={require('../../../../assets/nail2.png')} />
                    <Text style={styles.header3}>{item.key}</Text>
                  </View>
                </Card>
              </View>
            }
            
            numColumns={2}
          />
        </View>

        <View style={styles.panel}>
          <View style={styles.row}> 
            <Image style={styles.iconSm} source={require('../../../../assets/arrow_back.png')} />
            <Text style={styles.p}>Free Pickup</Text>
          </View>
          <View style={styles.row}> 
            <Image style={styles.iconSm} source={require('../../../../assets/more.png')} />
            <Text style={styles.p}>Quality Cleaning</Text>
          </View>
          <View style={styles.row}> 
            <Image style={styles.iconSm} source={require('../../../../assets/arrow_back2.png')} />
            <Text style={styles.p}>Paywhen</Text>
          </View>
        </View>
        <View style={styles.panel}>
          <View style={styles.row}> 
            <Image style={styles.iconMd} source={require('../../../../assets/logo.png')} />
            <Text style={styles.header3}>Learn More About Our Safety</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );

};
const styles = StyleSheet.create({  
  item: {
    width: (ITEM_WIDTH - 10) / 2 - 10,
    
  },
  row: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },  
  container2: {
    alignItems: "center",
    justifyContent: "center"
  },
  cardRow:{
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  cardCol:{
    flexDirection: 'column',
    justifyContent:"space-between"
  },
  panel:{
      marginHorizontal:15,
      marginVertical:10,
  },
  header6:{
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical:5
  },
  header3:{
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical:2,
    marginHorizontal:5
  },
  header2:{
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal:5
  },
  
  link:{
    fontWeight: 'bold',
    fontSize: 12,
    marginVertical:2,
    color:"#5eb8ff",
    marginHorizontal:5
  },
  p:{
    color:"#8d8d8d",
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical:2,
    marginHorizontal:5
  },
  iconXl:{
    width: 50,
    height: 50,
    marginRight:5
  },
  iconMd:{
    width: 30,
    height: 30,
    marginRight:5
  },
  iconSm:{
    width: 25,
    height: 25,
    marginRight:5
  }
});


export default memo(HomeCleaningScreen);