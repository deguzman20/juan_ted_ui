import React, { memo, useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { emailValidator } from '../../core/utils';
import { FORGOT_PASSWORD } from '../../queries';
import { useNetInfo } from "@react-native-community/netinfo";
import { IEmail, ForgotPasswordProps } from '../../interfaces';

import { styles } from '../../styles/unauthorized/ForgotPasswordStyle';

import Header from '../../components/atoms/header/Header';
import ModalLoader from '../../components/atoms/loader/ModalLoader';
import TextInput from '../../components/atoms/text_input/TextInput';
import Button from '../../components/atoms/button/Button';
import Background from '../../components/atoms/background/Background';
import BackButton from '../../components/atoms/button/BackButton';
import InternetConnectionChecker from '../../components/atoms/snackbar/InternetConnectionChecker';


const ForgotPasswordScreen = ({ navigation }) => {
  const netInfo = useNetInfo()
  const [isLoading, setLoading] = useState(false)
  const [forgotPassword] = useMutation(FORGOT_PASSWORD)
  const [email, setEmail] = useState({ value: '', error: '' })

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value)

    if (emailError) {
      setEmail({ ...email, error: emailError })
      return;
    }

    if(netInfo.isConnected){
      for(let i = 1; i <= 3; i++){
        setLoading(true)
        if(i === 3){
          setLoading(false)
          forgotPassword({ variables: { email: email.value } })
          navigation.navigate('LoginScreen')
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Background>
        <BackButton goBack={() => navigation.navigate('LoginScreen')} />
        <SafeAreaView style={{marginBottom: 100}} />
        <Header>Restore Password</Header>

        <TextInput
          label="E-mail address"
          returnKeyType="done"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
          Send Reset Instructions
        </Button>

        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.label}>← Back to login</Text>
        </TouchableOpacity>
        <ModalLoader isLoading={isLoading} />
      </Background>
      <InternetConnectionChecker />
    </React.Fragment>
  )
}

export default memo(ForgotPasswordScreen)