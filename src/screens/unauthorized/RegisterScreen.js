import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CUSTOMER } from './../../queries';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Background from './../../components/Background';
import Header from './../../components/Header';
import Button from './../../components/Button';
import TextInput from './../../components/TextInput';
import BackButton from './../../components/BackButton';
import { theme } from './../../core/theme';
import Loader from "react-native-modal-loader";
import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  mobileNumberValidator
} from './../../core/utils';

const RegisterScreen = ({ navigation }) => {
  const [createCustomer, response] = useMutation(CREATE_CUSTOMER);

  const [isLoading, setLoading] = useState(false)
  const [first_name, setFirstName] = useState({ value: '', error: '' });
  const [last_name, setLastName] = useState({ value: '', error: '' });
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const firstNameError = firstNameValidator(first_name.value);
    const lastNameError = lastNameValidator(last_name.value);
    const mobileNumberError = mobileNumberValidator(mobile_number.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (firstNameError || lastNameError || mobileNumberError || emailError || passwordError) {
      setFirstName({ ...first_name, error: firstNameError });
      setLastName({ ...last_name, error: lastNameError });
      setMobileNumber({ ...mobile_number, error: mobileNumberError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    createCustomer({ variables: { first_name: first_name.value,
                                  last_name: last_name.value,
                                  email: email.value,
                                  mobile_number: mobile_number.value,
                                  password: password.value } })
  };

  return (
    <React.Fragment>
      <SafeAreaView/>
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

        <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Loader loading={isLoading} color="#ff66be" />
        </View>
    </Background>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default memo(RegisterScreen);