import React, { memo, useState, useEffect } from 'react';
import { theme } from './../../core/theme';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { CUSTOMER_SIGN_IN, TASKER_SIGN_IN } from './../../queries';
import { customerSignInAction, taskerSignInAction } from './../../actions';
import { emailValidator, passwordValidator } from './../../core/utils';
import { SocialIcon } from 'react-native-elements';

import Button from './../../components/Button';
import Loader from "react-native-modal-loader";
import TextInput from './../../components/TextInput';
import Background from './../../components/Background';

const LoginScreen = ({ navigation, customerSignInAction, taskerSignInAction, customer_id, tasker_id}) => {
  const [customerSignIn] = useMutation(CUSTOMER_SIGN_IN);
  const [taskerSignIn] = useMutation(TASKER_SIGN_IN);
  const [isLoading, setLoading] = useState(false)

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    customerSignIn({ variables: { email: email.value, password: password.value } }).then((customer_data) => {
      if(customer_data.data.customerSignin !== null){
        customerSignInAction(customer_data)
        navigation.navigate('CustomerDashBoardScreen')
      }
      else{
        taskerSignIn({ variables: { email: email.value, password: password.value } }).then((tasker_data) => {
          if(tasker_data.data.taskerSignin !== null ){
            taskerSignInAction(tasker_data)
            navigation.navigate('TaskerDashBoardScreen')
          }
          else{
            console.log("null")
          }
        })
      }
    })
  };

  return (
    <React.Fragment>
      <Background>
        <View style={styles.logo_container}>
          <Image
            source={require("../../assets/lokal.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
        </View>
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

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={_onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width:'100%' }}>
          <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
        />
          <SocialIcon
            title='Sign In With Google'
            button
            type='google'
          />
        </View>
        <View style={styles.container}>
          <Loader loading={isLoading} color="#ff66be" />
        </View>
      </Background>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  logo_container: {
    position: 'absolute',
    top: 80,
    width: '136%',
    height: 300,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 307,
    height: 220
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

const mapStateToProps = ({ customerReducer, taskerReducer }) => {
  return {
    customer_id: customerReducer.id,
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, { customerSignInAction, taskerSignInAction })(LoginScreen));