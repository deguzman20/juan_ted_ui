import React, { memo, useEffect, useState } from 'react';
import {  StyleSheet,
          View,
          Dimensions,
          Text,
          ScrollView,
          SafeAreaView,
          Image, TouchableHighlight, Button} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';
import { useQuery } from '@apollo/react-hooks';
import { ALL_SERVICES } from '../queries';
import { getAllServiceAction } from '../actions';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';

const ITEM_WIDTH = Dimensions.get('window').width;
const ITEM_HEIGHT = Dimensions.get('window').width;

const items = [
  { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
  { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
  { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
  { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
  { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
  { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
  { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
];


const HomeScreen = ({ navigation, getAllServiceAction, services }) => {
  const { loading, error, data } = useQuery(ALL_SERVICES)
  const [columnCount, setColumnCount] = useState(2)
  if (loading) return <Text>Loading.....</Text>;

  return(
    <View style={styles.container}>
      <SafeAreaView/>
      <ScrollView>
        <FlatGrid
          itemDimension={130}
          items={data["allServices"]}
          style={styles.gridView}
          renderItem={({ item, index, separators }) => (
            <View style={{ width: ITEM_WIDTH / columnCount}}>
              <Card
                onClick={() => console.log('a')}
                title={item.name} key={item.id}>
                <Image style={{width: (ITEM_WIDTH / columnCount) - 60, height: 100}} source={{  uri: `file:///Users/Andy/Desktop/juan-ted/juan-ted-api/public/${item.image}` }}  />
                {/* <Button
                  icon={{name: 'code'}}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='VIEW NOW' /> */}
              </Card>
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
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
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

const mapStateToProps = ({ serviceReducer }) => {
  return {
    services: serviceReducer
  }
}

export default memo(connect(mapStateToProps, { getAllServiceAction })(HomeScreen))