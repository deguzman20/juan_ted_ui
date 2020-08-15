import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { theme } from './../../core/theme';
import { emailValidator } from './../../core/utils';
import { FORGOT_PASSWORD } from './../../queries';
import { useNetInfo } from "@react-native-community/netinfo";

import Header from './../../components/Header';
import TextInput from './../../components/TextInput';
import Button from './../../components/Button';
import Background from './../../components/Background';
import BackButton from './../../components/BackButton';
import InternetConnectionChecker from './../../components/InternetConnectionChecker';

const ForgotPasswordScreen = ({ navigation }) => {
  const netInfo = useNetInfo()
  const [forgotPassword] = useMutation(FORGOT_PASSWORD)
  const [email, setEmail] = useState({ value: '', error: '' })

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    if(netInfo.isConnected){
      forgotPassword({ variables: { email: email.value } })
      navigation.navigate('LoginScreen')
    }
  };

  return (
    <React.Fragment>
      <Background>
        <BackButton goBack={() => navigation.navigate('LoginScreen')} />

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
      </Background>
      <InternetConnectionChecker />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);