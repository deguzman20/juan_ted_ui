import React, { memo, useState } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { CUSTOMER_SIGN_IN, TASKER_SIGN_IN } from './../../queries';
import { customerSignInAction, taskerSignInAction } from './../../actions';
import { emailValidator, passwordValidator } from './../../core/utils';

import Loader from "react-native-modal-loader";

// atoms
import Logo from './../../components/atoms/logo/Logo';
import Button from './../../components/atoms/button/Button';
import TextInput from './../../components/atoms/text_input/TextInput';
import Background from './../../components/atoms/background/Background';
import ForgotPasswordlinkButton from './../../components/atoms/button/ForgotPasswordLinkButton';

// molecules
import SocialMediaButtons from '../../components/molecules/social_media_button/SocialMediaButtons';
import TextWithLinkSection from '../../components/molecules/login_text_with_link_section/TextWithLinkSection';

// screen
import CustomerDashBoardScreen from '../authorized/customer/CustomerDashBoardScreen';
import TaskerDashBoardScreen from '../authorized/tasker/TaskerDashBoardScreen';

const LoginScreen = ({ navigation, customerSignInAction, taskerSignInAction, customer_id, tasker_id}) => {
  const [customerSignIn] = useMutation(CUSTOMER_SIGN_IN);
  const [taskerSignIn] = useMutation(TASKER_SIGN_IN);

  const [isLoading, setLoading] = useState(false);
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

    setTimeout(() => {
      for(let i = 1; i <= 3; i++){
        setLoading(true)
        if(i === 3){
          customerSignIn({ variables: { email: email.value, password: password.value } }).then((customer_data) => {
            if(customer_data.data.customerSignin !== null){
              customerSignInAction(customer_data)
              setLoading(false)
              navigation.navigate('CustomerDashBoardScreen')
            }
            else{
              taskerSignIn({ variables: { email: email.value, password: password.value } }).then((tasker_data) => {
                if(tasker_data.data.taskerSignin !== null ){
                  taskerSignInAction(tasker_data)
                  setLoading(false)
                  navigation.navigate('TaskerDashBoardScreen')
                }
                else{
                  Alert.alert('Incorrect email and password')
                  setLoading(false)
                }
              })
            }
          })
        }
      }
    },3000)
  };

  if(customer_id !== '' && tasker_id === ''){
    return <CustomerDashBoardScreen />
  }
  else if(customer_id === '' && tasker_id !== ''){
    return <TaskerDashBoardScreen />
  }

  return (
    <React.Fragment>
      <Background>
        <Logo />
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

        <ForgotPasswordlinkButton 
          navigation={navigation}
        />

        <Button mode="contained" onPress={_onLoginPressed}>
          Login
        </Button>
        <TextWithLinkSection 
          navigation={navigation} 
        />
        <SocialMediaButtons />
        <Loader loading={isLoading} color="#ff66be" />
      </Background>
    </React.Fragment>
  );
};


const mapStateToProps = ({ customerReducer, taskerReducer }) => {
  return {
    customer_id: customerReducer.id,
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, { customerSignInAction, taskerSignInAction })(LoginScreen));