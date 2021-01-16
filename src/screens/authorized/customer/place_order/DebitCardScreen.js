import React, { memo, useState } from 'react';
import { useMutation } from 'react-apollo';
import { connect } from 'react-redux';

import { SafeAreaView, Alert, View, ScrollView } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { Button as ButtonElement, Divider } from 'react-native-elements';

import { CREATE_PAYMENT_TOKEN, PAY_VIA_DEBIT_CARD } from '../../../../queries';

import { styles } from '../../../../styles/authorized/customer/place_order/DebitCardStyle';

import _ from 'lodash';

import Loader from "react-native-modal-loader";

import Background from '../../../../components/atoms/background/Background';


const DebitCardScreen = ({ customer_id, navigation }) => {
  const [isLoading, setLoading] = useState(false)

  const [createToken] = useMutation(CREATE_PAYMENT_TOKEN);
  const [payViaCard] = useMutation(PAY_VIA_DEBIT_CARD);

  const [number, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const _onChange = (form)  => {
    !_.isEqual(form.values.number, '') ? setCardNumber(form.values.number) : '';
    !_.isEqual(form.values.expiry.split('/')[0], '') ? setExpMonth(form.values.expiry.split('/')[0]) : '';
    !_.isEqual(form.values.expiry.split('/')[1], '') ? setExpYear(form.values.expiry.split('/')[1]) : '';
    !_.isEqual(form.values.cvc, '') ? setCvc(form.values.cvc) : '';
  }

  const _submitPayment = () => {
    if(_.isEqual(number, '') || _.isEqual(expMonth, '') || _.isEqual(expYear, '') || _.isEqual(cvc, '')){ 
      Alert.alert('Please fillup card number')
    }
    else{
      setTimeout(() => {
        for(let i = 1; i <= 3; i++){
          setLoading(true)
          if(i === 3){
            createToken({
              variables: {
                number: number.replace(/\s/g, ''),
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvc,
                billing_address_id: navigation.state.params.billing_address_id
              }
            }).then(({ data }) => {
              if(!_.isEqual(data.createToken.response, '')){
                payViaCard({
                  variables: {
                    token: data.createToken.response,
                    amount: parseInt(navigation.state.params.amount) + 10000,
                    customer_id: parseInt(customer_id),
                    tasker_id: parseInt(navigation.state.params.tasker_id)
                  }
                }).then(({ data }) => {
                  if(_.isEqual(data.payViaCard.response, 'Paid Successfuly')){
                    setLoading(false); 
                    navigation.popToTop();
                    Alert.alert('Paid Successfuly');
                  }
                }).catch(payviacardErr => console.log(payviacardErr.message))
              }
            }).catch(err => {
              console.log(err.message);
            });
          }
        }
      },3000)      
    }
  }

  return(
    <>
      <Background>
        <SafeAreaView style={{ marginBottom: 50 }}/>
        <ScrollView>
          <CreditCardInput onChange={_onChange}/>
          <Divider style={{ marginTop: 20 }}/>
          <View style={{ flex: 2 }}>
            <View style={styles.second_row_container}>
              <View style={styles.serviceTypeWrapper}>

                <ButtonElement
                  buttonStyle={styles.select_button_background_style}
                  title="Submit"
                  onPress={() => { _submitPayment() }}
                />
              </View>
            </View> 
          </View>
        </ScrollView>
        <Loader loading={isLoading} color="#ff66be" />
      </Background>
    </>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: parseInt(customerReducer.id)
  }
}

export default memo(connect(mapStateToProps, null)(DebitCardScreen));