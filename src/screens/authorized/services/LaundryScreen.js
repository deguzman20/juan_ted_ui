import React, { memo } from 'react';
import {  
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native';

import { ITEM_WIDTH } from './../../../actions/types';

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { FlatGrid } from 'react-native-super-grid';
import { Card, Text } from 'react-native-elements';
import { connect } from 'react-redux';


const choices = [
  {
    estimated_kilos: "0-4",
    price: 199
  },
  {
    estimated_kilos: "4-8",
    price: 249
  },
  {
    estimated_kilos: "8-16",
    price: 399
  }
];

const LaundryScreen = () => {
  return(
    <View style={styles.container}>
      <SafeAreaView/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          <Text h4>How much laundry do you have?</Text>
        </View>
        <View style={styles.grid}>
          <Text h5>Just estimate, we'll weight it upon pick-up</Text>
        </View>
        <FlatGrid
          itemDimension={180}
          items={choices}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) => (
            <View style={{ width: ITEM_WIDTH }}>
              <TouchableWithoutFeedback onPress={() => {console.log("asas")}}>
                <Card key={item.id}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.75 }}>
                      <Text h4>{item.estimated_kilos} kilos</Text>
                      <Text h5>Can be edited upon pick-up</Text>
                    </View>
                  </View>
                </Card>
              </TouchableWithoutFeedback>
            </View>
          )}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 25
  },
  grid: {
      paddingLeft:30,
      paddingTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  gridItem: {
      margin:5,
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
  },
  gridItemImage: {
      width: 100,
      height: 100,
      borderWidth: 1.5,
      borderColor: 'white',
      borderRadius: 50,
  },
  gridItemText: {
      marginTop: 5,
      textAlign:'center',
  },
});

export default memo(LaundryScreen);