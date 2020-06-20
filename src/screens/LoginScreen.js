import React, { memo, useState } from 'react';
import { theme } from '../core/theme';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { CUSTOMER_SIGN_IN } from '../queries';
import { customerSignInAction } from '../actions';
import { emailValidator, passwordValidator } from '../core/utils';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from "react-native-modal-loader";
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';



const LoginScreen = ({ navigation, customerSignInAction }) => {
  const [customerSignIn] = useMutation(CUSTOMER_SIGN_IN);
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
            navigation.navigate('DashBoardScreen')
          }
          else{
            setLoading(false)
          }
        })
      }
    }, 3000)
  };

  return (
    <>
      <Background>
        <Header>Juan Ted</Header>

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
        <View style={styles.container}>
          <Loader loading={isLoading} color="#ff66be" />
        </View>
      </Background>
      <View style={styles.container}>
        <Modal
          visible={isModalVisible}
          footer={
            <ModalFooter>
              <ModalButton
                text="CANCEL"
                onPress={() => {}}
              />
              <ModalButton
                text="OK"
                onPress={() => {}}
              />
            </ModalFooter>
          }
        >
          <ModalContent>
          </ModalContent>
        </Modal>
      </View>
    </>
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

export default memo(connect(null, { customerSignInAction })(LoginScreen));