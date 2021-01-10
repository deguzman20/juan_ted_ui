import React, { memo, useState } from 'react';
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { CUSTOMER_SIGN_IN, TASKER_SIGN_IN } from '../../queries';
import { customerSignInAction, taskerSignInAction } from '../../actions';
import { emailValidator, passwordValidator } from '../../core/utils';

import _ from 'lodash';

import Loader from "react-native-modal-loader";
import Icon from 'react-native-vector-icons/FontAwesome5';

// atoms
import Logo from '../../components/atoms/logo/Logo';
import Button from '../../components/atoms/button/Button';
import TextInput from '../../components/atoms/text_input/TextInput';
import Background from '../../components/atoms/background/Background';
import ForgotPasswordlinkButton from '../../components/atoms/button/ForgotPasswordLinkButton';

// molecules
import TextWithLinkSection from '../../components/molecules/login_text_with_link_section/TextWithLinkSection';

// screen
import CustomerDashBoardScreen from '../authorized/customer/CustomerDashBoardScreen';
import TaskerDashBoardScreen from '../authorized/tasker/TaskerDashBoardScreen';


const LoginScreen = ({ navigation, customerSignInAction, taskerSignInAction, customer_id, tasker_id}) => {

  const [customerSignIn] = useMutation(CUSTOMER_SIGN_IN)
  const [taskerSignIn] = useMutation(TASKER_SIGN_IN)

  const [isLoading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return;
    }

    setTimeout(() => {
      for(let i = 1; i <= 3; i++){
        setLoading(true)
        if(i === 3){
          customerSignIn({ variables: { email: email.value, password: password.value } }).then((customer_data) => {
            if(customer_data.data.customerSignin !== null){
              customerSignInAction(customer_data)
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


  if(!_.isNull(customer_id) && _.isNull(tasker_id)){
    return <CustomerDashBoardScreen />
  }
  else if(_.isNull(customer_id) && !_.isNull(tasker_id)){   
    return <TaskerDashBoardScreen />
  }

  return (
    <React.Fragment>
      <View style={{ flex: 0.5, alignItems: 'center' }}>
        <Logo />
      </View>
      <View style={{ flex: 1.5 }}>
        <Background>
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
            secureTextEntry={hidePass ? true : false}
          />

          <Icon
            name={hidePass ? 'eye-slash' : 'eye'}
            size={15}
            color="grey"
            onPress={() => setHidePass(!hidePass)}
            style={{ left: '40%', top: -47 }}
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
          {/* <SocialMediaButtons /> */}
          <Loader loading={isLoading} color="#ff66be" />
        </Background>
      </View>
    </React.Fragment>
  )
}

const mapStateToProps = ({ customerReducer, taskerReducer }) => {
  return {
    customer_id: !_.isNull(parseInt(customerReducer.id)) && !isNaN(parseInt(customerReducer.id)) ? parseInt(customerReducer.id) : null,
    tasker_id: !_.isNull(parseInt(taskerReducer.id)) && !isNaN(parseInt(taskerReducer.id)) ? parseInt(taskerReducer.id) : null
  }
}

export default memo(connect(mapStateToProps, { customerSignInAction, taskerSignInAction })(LoginScreen))  