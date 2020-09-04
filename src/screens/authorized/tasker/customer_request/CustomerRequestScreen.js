import React, { memo } from 'react';
import { View, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Chip } from 'react-native-paper';
import { styles } from './../../../../styles/authorized/tasker/customer_request/CustomerRequestStyle';
import { useNetInfo } from '@react-native-community/netinfo';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { PENDING_TRANSACTION_LIST } from '../../../../queries'
import { DEFAULT_URL } from '../../../../actions/types';

import CustomerRequestInfoScreen from './CustomerRequestInfoScreen';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import EmptyCustomerRequest from '../../../../components/molecules/empty_container/EmptyCustomerRequest';

const CustomerRequestScreen = ({ tasker_id, navigation }) => {
  const netInfo = useNetInfo()
  const { loading, error, data } = useQuery(PENDING_TRANSACTION_LIST, {
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 500
  })

  _onCustomerRequestInfoNavigatePressed = (transaction_id, customer_id) => {
    if(netInfo.isConnected){
      navigation.navigate('CustomerRequestInfoScreen', 
      {
        transaction_id: parseInt(transaction_id),
        tasker_id: parseInt(tasker_id),
        customer_id: parseInt(customer_id)
      })
    }
  }
  
  keyExtractor = (item, index) => index.toString()
  
  renderItem = ({ item }) => {
    const { id, firstName, lastName, image } = item.customer
    return(
      <ListItem
        onPress={() => { 
          _onCustomerRequestInfoNavigatePressed(item.id, id)
        }}
        title={    
          <View style={styles.fullNameWrapper}>
            <Text>
              {firstName} {lastName}
            </Text>
          </View>
        }
        subtitle={
          <View style={styles.chipWrapper}>
            <ScrollView 
              showsHorizontalScrollIndicator={false} 
              showsVertþicalScrollIndicator={false}
              horizontal={true}
            >
              {
                item.transactionServices.map((s) => {
                  if(s.service !== null){
                    return(
                      <Chip>{s.service.name}</Chip>
                    )
                  }
                })
              }
            </ScrollView>
          </View>
        }
        leftAvatar={{ source: { uri: `${DEFAULT_URL}/${image}` } }}
        bottomDivider
        chevron
      />
    )
  }

  if(loading || error) null;
  if(data){
    if(data.pendingTransactionList.length >= 1){
      return(
        <React.Fragment>
          <SafeAreaView />
          <View style={styles.first_row_container}>
            <Text h5 style={styles.customer_request_txt}>Customer Appointment Request</Text> 
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <FlatList
                keyExtractor={keyExtractor}
                data={data.pendingTransactionList}
                renderItem={renderItem}
              />
            </View>
          </ScrollView>
          <InternetConnectionChecker />
        </React.Fragment>
      )
    }
    else{
      return <EmptyCustomerRequest />
    }
  }
  else{
    return <EmptyCustomerRequest />
  }
}

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

const App = createStackNavigator({
  CustomerRequestScreen: { 
    screen: connect(mapStateToProps, null)(CustomerRequestScreen),
    navigationOptions: {
      title: '',
      headerLeft: null
    }
  },
  CustomerRequestInfoScreen: {
    screen: CustomerRequestInfoScreen, 
    navigationOptions: {
      title: ''
    }
  }
})

export default memo(createAppContainer(App))