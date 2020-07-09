import React, { memo, useState } from 'react';
import { theme } from './../../core/theme';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { CUSTOMER_SIGN_IN, TASKER_SIGN_IN } from './../../queries';
import { customerSignInAction, taskerSignInAction } from './../../actions';
import { emailValidator, passwordValidator } from './../../core/utils';
import Dialog, { DialogTitle, 
  DialogFooter, 
  DialogContent, 
  DialogButton } from 'react-native-popup-dialog';

import { SocialIcon } from 'react-native-elements';

import Header from './../../components/Header';
import Button from './../../components/Button';
import Loader from "react-native-modal-loader";
import TextInput from './../../components/TextInput';
import Background from './../../components/Background';


const LoginScreen = ({ navigation, customerSignInAction }) => {
  const [customerSignIn] = useMutation(CUSTOMER_SIGN_IN);
  const [taskerSignIn] = useMutation(TASKER_SIGN_IN);
  const [isLoading, setLoading] = useState(false)

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    setTimeout(() => {
      for(let i = 1; i <= 3; i++){
        setLoading(true)
        customerSignIn({ variables: { email: email.value, password: password.value } }).then((data) =>{
          if(i == 3 && data.data.customerSignIn !== null){
            setLoading(false)
            customerSignInAction(data)
            navigation.navigate('CustomerDashBoardScreen')
          }
          else{
            taskerSignIn({ variables: { email: email.value, password: password.value } }).then((data) => {
              if(data.data.taskerSignin !== null){
                setLoading(false)
                taskerSignInAction(data)
                navigation.navigate('TaskerDashBoardScreen')
                
              }
              else{
                setLoading(false)
                // toggleModal()
                return false;
              }
            })
          }
        })
      }
    }, 3000)
  };

  return (
    <React.Fragment>
      <Background>
        <Header>Lokal</Header>

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
      <View style={styles.container}>
        <Dialog
          visible={isModalVisible}
          dialogTitle={<DialogTitle title="Message" />}
          footer={
            <DialogFooter>
              <DialogButton
                text="Close"
                onPress={() => {toggleModal()}}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>Incorrect username and password</Text>
          </DialogContent>
        </Dialog>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container:{

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

export default memo(connect(null, { customerSignInAction, taskerSignInAction })(LoginScreen));