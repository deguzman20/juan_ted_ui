import React, { memo, useState } from 'react';
import {  
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Image
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';
import { Card } from 'react-native-elements';
import { BACKEND_ASSET_URL } from './../../../actions/types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').height;

const HomeCleaningScreen = () => {
  const [home_types, setHomeType] = React.useState([
    { type: 'Condo', url: '' },
    { type: 'House', url: '' }
  ]);

  return(
    <View style={styles.container}>
      <SafeAreaView/>
      <FlatGrid
        itemDimension={130}
        items={home_types}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item, index, separators }) => (
          <View style={{ width: ITEM_WIDTH / 2}}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Card
                title={item.type} 
                key={item.id}
              >
                <Image style={{width: (ITEM_WIDTH / 2) - 60, height: 100}} source={{  uri: `${BACKEND_ASSET_URL}${item.image}` }}  />
              </Card>
            </TouchableWithoutFeedback>
          </View>
        )}
      />
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

export default memo(HomeCleaningScreen);