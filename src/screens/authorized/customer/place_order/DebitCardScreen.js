import React, { memo, useState } from 'react';
import { useMutation } from 'react-apollo';
import { connect } from 'react-redux';

import { SafeAreaView, Alert, View, ScrollView } from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";
import { Button as ButtonElement, Divider, Text } from 'react-native-elements';

import { CREATE_PAYMENT_TOKEN, PAY_VIA_DEBIT_CARD } from '../../../../queries';

import { styles } from '../../../../styles/authorized/customer/place_order/DebitCardStyle';
import { 
  firstNameValidator, 
  lastNameValidator, 
  addressLineOneValidator, 
  addressLineTwoValidator,
  postalValidator,
  cityValidator,
  stateValidator,
  emailValidator,
  mobileNumberValidator } from '../../../../core/utils';

import Loader from "react-native-modal-loader";

import _ from 'lodash';

import TextInput from '../../../../components/atoms/text_input/TextInput';
import Background from '../../../../components/atoms/background/Background';


const DebitCardScreen = ({ customer_id, navigation }) => {
  const [isLoading, setLoading] = useState(false)

  const [createToken] = useMutation(CREATE_PAYMENT_TOKEN);
  const [payViaCard] = useMutation(PAY_VIA_DEBIT_CARD);

  const [number, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const [fname, setFirstname] = useState({ value: '', error: '' });
  const [lname, setLastname] = useState({ value: '', error: '' });
  const [addone, setAddressLineOne] = useState({ value: '', error: '' });
  const [addtwo, setAddressLineTwo] = useState({ value: '', error: '' });
  const [postal, setPostalCode] = useState({ value: '', error: '' });
  const [city, setCity] = useState({ value: '', error: '' });
  const [state, setStates] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });


  const _onChange = (form)  => {
    !_.isEqual(form.values.number, '') ? setCardNumber(form.values.number) : '';
    !_.isEqual(form.values.expiry.split('/')[0], '') ? setExpMonth(form.values.expiry.split('/')[0]) : '';
    !_.isEqual(form.values.expiry.split('/')[1], '') ? setExpYear(form.values.expiry.split('/')[1]) : '';
    !_.isEqual(form.values.cvc, '') ? setCvc(form.values.cvc) : '';
  }

  const _submitPayment = () => {
    const fnameError = firstNameValidator(fname.value);
    const lnameError = lastNameValidator(lname.value);
    const addOneError = addressLineOneValidator(addone.value);
    const addTwoError = addressLineTwoValidator(addtwo.value);
    const postalError = postalValidator(city.value);
    const cityError  = cityValidator(state.value);
    const stateError = stateValidator(state.value);
    const emailError = emailValidator(email.value);
    const mobileNumberError = mobileNumberValidator(mobile_number.value);

    if (fnameError || lnameError || addOneError || addTwoError || postalError || cityError || stateError || emailError || mobileNumberError) {
      setFirstname({ ...fname, error: fnameError });
      setLastname({ ...lname, error: lnameError });
      setAddressLineOne({ ...addone, error: addOneError });
      setAddressLineTwo({ ...addtwo, error: addTwoError });
      setPostalCode({ ...postal, error: postalError });
      setCity({ ...city, error: cityError });
      setStates({ ...state, error: stateError });
      setEmail({ ...email, error: emailError });
      setMobileNumber({ ...mobile_number, error: mobileNumberError });

      return;
    }

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
              address_line_one: addone.value,
              address_line_two: addtwo.value,
              city: city.value,
              state: state.value,
              postal_code: postal.value,
              country: "PH",
              name: `${fname.value} ${lname.value}`,
              email: email.value,
              mobile_no: mobile_number.value
            }
          }).then(({ data }) => {
            if(!_.isEqual(data.createToken.response, '')){
              payViaCard({
                variables: {
                  token: data.createToken.response,
                  amount: parseInt(navigation.state.params.amount) + 10000
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

  return(
    <>
      <Background>
        <SafeAreaView style={{ marginBottom: 50 }}/>
        <ScrollView>
          <CreditCardInput onChange={_onChange}/>
          <Divider style={{ marginTop: 20 }}/>
          <View style={{ flex: 1 }}>
            <SafeAreaView/>
            <View style={{ flex: 0.3 }}>
              <View style={styles.first_row_container}>
                <Text h4 style={styles.billing_address_txt}>
                  Billing Address
                </Text> 
              </View>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.second_row_container}>
              <View style={styles.serviceTypeWrapper}>
                <TextInput
                  label="Firstname"
                  returnKeyType="next"
                  value={fname.value}
                  onChangeText={text => setFirstname({ value: text, error: '' })}
                  error={!!fname.error}
                  errorText={fname.error}
                  autoCapitalize="none"
                />

                <TextInput
                  label="Lastname"
                  returnKeyType="next"
                  value={lname.value}
                  onChangeText={text => setLastname({ value: text, error: '' })}
                  error={!!lname.error}
                  errorText={lname.error}
                  autoCapitalize="none"
                />

                <TextInput
                  label="Address line 1"
                  returnKeyType="next"
                  value={addone.value}
                  onChangeText={text => setAddressLineOne({ value: text, error: '' })}
                  error={!!addone.error}
                  errorText={addone.error}
                  autoCapitalize="none"
                />

                <TextInput
                  label="Address line 2"
                  returnKeyType="next"
                  value={addtwo.value}
                  onChangeText={text => setAddressLineTwo({ value: text, error: '' })}
                  error={!!addtwo.error}
                  errorText={addtwo.error}
                  autoCapitalize="none"
                />

                <TextInput
                  label="Postal Code"
                  returnKeyType="next"
                  value={postal.value}
                  onChangeText={text => setPostalCode({ value: text, error: '' })}
                  error={!!postal.error}
                  errorText={postal.error}
                  autoCapitalize="none"
                />

                <TextInput
                  label="City"
                  returnKeyType="next"
                  value={city.value}
                  onChangeText={text => setCity({ value: text, error: '' })}
                  error={!!city.error}
                  errorText={city.error}
                  autoCapitalize="none"
                />

                <TextInput
                  label="State"
                  returnKeyType="next"
                  value={state.value}
                  onChangeText={text => setStates({ value: text, error: '' })}
                  error={!!state.error}
                  errorText={state.error}
                  autoCapitalize="none"
                />

                <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={text => setEmail({ value: text, error: '' })}
                  error={!!email.error}
                  errorText={email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />

                <TextInput
                  label="Mobile Number"
                  returnKeyType="done"
                  value={mobile_number.value}
                  onChangeText={text => setMobileNumber({ value: text, error: '' })}
                  error={!!mobile_number.error}
                  errorText={mobile_number.error}
                />

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
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(DebitCardScreen));