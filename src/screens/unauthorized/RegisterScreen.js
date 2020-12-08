import React, { memo, useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CUSTOMER } from '../../queries';
import { IEmail, IPassword, IFirstName, ILastName, IMoblieNumber } from '../../interfaces';


import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  mobileNumberValidator
} from '../../core/utils';

import Button from '../../components/atoms/button/Button';
import Header from '../../components/atoms/header/Header';
import ModalLoader from '../../components/atoms/loader/ModalLoader';
import TextInput from '../../components/atoms/text_input/TextInput';
import Background from '../../components/atoms/background/Background';
import BackButton from '../../components/atoms/button/BackButton';

import RegisterTextWithLinkSection from '../../components/molecules/register_text_with_link_section/RegisterTextWithLinkSection';

const RegisterScreen = ({ navigation }) => {
  const [createCustomer] = useMutation(CREATE_CUSTOMER)

  const [isLoading, setLoading] = useState(false)
  const [first_name, setFirstName] = useState({ value: '', error: '' })
  const [last_name, setLastName] = useState({ value: '', error: '' })
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const _onSignUpPressed = () => {
    const firstNameError = firstNameValidator(first_name.value)
    const lastNameError = lastNameValidator(last_name.value)
    const mobileNumberError = mobileNumberValidator(mobile_number.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (firstNameError || lastNameError || mobileNumberError || emailError || passwordError) {
      setFirstName({ ...first_name, error: firstNameError })
      setLastName({ ...last_name, error: lastNameError })
      setMobileNumber({ ...mobile_number, error: mobileNumberError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return;
    }

    setTimeout(() => {
      for(let i = 1; i <= 3; i++){
        setLoading(true)
        if(i === 3){
          createCustomer({ 
            variables: { 
              first_name: first_name.value,
              last_name: last_name.value,
              email: email.value,
              mobile_number: mobile_number.value,
              password: password.value 
            } 
          })
          .then(({ data }) => {
            console.log(data)
            // if(createData.data.response === 'Customer Created'){
            //   console.log(createData);
            //   // setLoading(false)
            //   navigation.navigate('LoginScreen')
            // }
          })
          .catch(err => console.log(err))
        }
      }
    },3000)
  };

  return (
    <React.Fragment>
      <SafeAreaView/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Background>
          <BackButton goBack={() => navigation.navigate('LoginScreen')} />

          <Header>Create Account</Header>

          <TextInput
            label="Firstname"
            returnKeyType="next"
            value={first_name.value}
            onChangeText={text => setFirstName({ value: text, error: '' })}
            error={!!first_name.error}
            errorText={first_name.error}
          />

          <TextInput
            label="LastName"
            returnKeyType="next"
            value={last_name.value}
            onChangeText={text => setLastName({ value: text, error: '' })}
            error={!!last_name.error}
            errorText={last_name.error}
          />

          <TextInput
            label="Mobile Number"
            returnKeyType="next"
            value={mobile_number.value}
            onChangeText={text => setMobileNumber({ value: text, error: '' })}
            error={!!mobile_number.error}
            errorText={mobile_number.error}
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
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <Button mode="contained" 
            onPress={_onSignUpPressed} 
            style={{ marginTop: 24 }}
          >
            Sign Up
          </Button>

          <RegisterTextWithLinkSection 
            navigation={navigation}
          />

          {/* <ModalLoader 
            isLoading={isLoading} 
          /> */}
        </Background>
      </ScrollView>  
    </React.Fragment>
  )
}

export default memo(RegisterScreen)