import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../../../../styles/authorized/customer/place_order/NewBillingAddessStyle';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BILLING_ADDRESS } from './../../../../queries';

import isEqual from 'lodash/isEqual';

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

import TextInput from '../../../../components/atoms/text_input/TextInput';
import Background from '../../../../components/atoms/background/Background';
import Header from '../../../../components/atoms/header/Header';

const NewBillingAddressScreen = ({ navigation, customer_id }) => {
    const [isLoading, setLoading] = useState(false)
    const [fname, setFirstname] = useState({ value: '', error: '' });
    const [lname, setLastname] = useState({ value: '', error: '' });
    const [addone, setAddressLineOne] = useState({ value: '', error: '' });
    const [addtwo, setAddressLineTwo] = useState({ value: '', error: '' });
    const [postal, setPostalCode] = useState({ value: '', error: '' });
    const [city, setCity] = useState({ value: '', error: '' });
    const [state, setStates] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });
    const [create_new_billing_address] = useMutation(CREATE_BILLING_ADDRESS);

    const _submitCreateBillingAddress = () => {
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
            create_new_billing_address({
              variables: {
                customer_id: customer_id,
                first_name: fname.value,
                last_name: lname.value,
                address_line_one: addone.value,
                address_line_two: addtwo.value,
                city: city.value,
                state: state.value,
                postal_code: postal.value,
                country: 'PH',
                email: email.value,
                mobile_number: mobile_number.value
              }
            }).then(({ data: { createBillingAddress: { response } } })=> {
                if(isEqual(response, 'Billing Address Created')){
                  Alert.alert('Successfuly created!')
                  navigation.goBack()
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
          <ScrollView>
            <SafeAreaView/>
            <Header>
              Create Billing Address
            </Header>
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

                  <Button
                    buttonStyle={styles.select_button_background_style}
                    title="Submit"
                    onPress={() => { _submitCreateBillingAddress() }}
                  />
                </View>
              </View> 
            </View>
            <Loader loading={isLoading} color="#ff66be" />
          </ScrollView>
        </Background>
      </>
    )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: parseInt(customerReducer.id)
  }
}

export default connect(mapStateToProps, null)(NewBillingAddressScreen);