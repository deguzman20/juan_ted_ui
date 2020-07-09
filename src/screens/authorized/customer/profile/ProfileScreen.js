import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ITEM_WIDTH, ITEM_HEIGHT } from './../../../../actions/types';
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'

import Background from '../../../../components/Background';
import ChangePasswordScreen from './ChangePasswordScreen';

const ProfileScreen = ({ navigation, image, first_name, last_name }) => {
  const image_nil = image === null ? "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" : image
  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Background>
          <SafeAreaView style={{ marginBottom: 25 }}/>
            <View>
              <Avatar
                xlarge
                rounded
                source={{uri: image_nil}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                size={150}
              />
            </View>
            <View>
              <Text style={styles.fullName}>{first_name} {last_name}</Text>
            </View>
            <View style={styles.container}>
              <ListItem
                key={1}
                title={'Change Password'}
                rightIcon={{ name: 'ac-unit' }}
                bottomDivider
                onPress={() => navigation.navigate('ChangePasswordScreen')}
              />
              <ListItem
                key={1}
                title={'Notifications'}
                rightIcon={{ name: 'notifications-none' }}
                bottomDivider
                onPress={() => navigation.navigate('ChangePasswordScreen')}
              />
              <ListItem
                key={1}
                title={'Logout'}
                rightIcon={{ name: 'dehaze' }}
              />
            </View>
        </Background>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop:30,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  fullName: {
    fontSize: 30,
    paddingTop: 20
  }
});

const mapStateToProps = ({ customerReducer }) => {
  return {
    email: customerReducer.email,
    image: customerReducer.image,
    first_name: customerReducer.first_name,
    last_name: customerReducer.last_name
  }
}

const App = createStackNavigator({
  ProfileScreen: { screen: connect(mapStateToProps, null)(ProfileScreen) },
  ChangePasswordScreen: { screen: ChangePasswordScreen },
}, { headerMode:'none' });

export default memo(createAppContainer(App));