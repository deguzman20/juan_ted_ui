import React, { memo, useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { styles } from './../../../../styles/authorized/tasker/profile/ChangePasswordStyle';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { UPDATE_PASSWORD } from './../../../../queries';
import { 
  oldPasswordValidator, 
  newPasswordValidator, 
  confirmPasswordValidator } from './../../../../core/utils';

import Loader from "react-native-modal-loader";
import Icon from 'react-native-vector-icons/FontAwesome5';

import Background from './../../../../components/atoms/background/Background';
import Header from './../../../../components/atoms/header/Header';
import Button from './../../../../components/atoms/button/Button';
import TextInput from './../../../../components/atoms/text_input/TextInput';
import BackButton from './../../../../components/atoms/button/BackButton';

import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';



const ChangePasswordScreen = ({ navigation, tasker_id }) => {
  const netInfo = useNetInfo()
  const [updatePassword] = useMutation(UPDATE_PASSWORD)
  
  const [isLoading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [hideOldPass, setHideOldPass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const [old_password, setOldPassword] = useState({ value: '', error: '' })
  const [new_password, setNewPassword] = useState({ value: '', error: '' })
  const [confirm_password, setConfirmPassword] = useState({ value: '', error: '' })

  _onChangePasswordPressed = () => {
    const oldPasswordError = oldPasswordValidator(old_password.value)
    const newPasswordError = newPasswordValidator(new_password.value)
    const confirmPasswordError = confirmPasswordValidator(confirm_password.value)

    if (oldPasswordError || newPasswordError || confirmPasswordError) {
      setOldPassword({ ...old_password, error: oldPasswordError })
      setNewPassword({ ...new_password, error: newPasswordError })
      setConfirmPassword({ ...confirm_password, error: confirmPasswordError })
      return;
    }

    if(netInfo.isConnected){
      setTimeout(() => {
        for(let i = 1; i <= 3; i++){
          setLoading(true)
          if(i === 3){
            updatePassword({ 
              variables: { 
                id: parseInt(tasker_id), 
                old_password: old_password.value, 
                new_password: new_password.value, 
                confirm_password: confirm_password.value,
                customer: false
              } 
            }).then(({ data }) =>{
              if(data !== null){
                if(data.updatePassword.response === "Password Successfuly updated!"){
                  setLoading(false)
                  Alert.alert(data.updatePassword.response)
                  navigation.navigate('ProfileScreen')
                }
                else{
                  Alert.alert('Incorrect old password')
                  setLoading(false)
                }
              }
            })
          }
        }
      },3000)
    }
  };

  return(
    <>
    <SafeAreaView/>
    <Background>
      <BackButton goBack={() => navigation.navigate('ProfileScreen')} />

      <Header>Change Password</Header>

      <TextInput
        label="Old Password"
        returnKeyType="done"
        value={old_password.value}
        onChangeText={text => setOldPassword({ value: text, error: '' })}
        error={!!old_password.error}
        errorText={old_password.error}
        secureTextEntry={hideOldPass ? true : false}
      />

      <Icon
        name={hideOldPass ? 'eye-slash' : 'eye'}
        size={15}
        color="grey"
        onPress={() => setHideOldPass(!hideOldPass)}
        style={{ left: '40%', top: -47 }}
      />

      <TextInput
        label="New Password"
        returnKeyType="done"
        value={new_password.value}
        onChangeText={text => setNewPassword({ value: text, error: '' })}
        error={!!new_password.error}
        errorText={new_password.error}
        secureTextEntry={hidePass ? true : false}
      />

      <Icon
        name={hidePass ? 'eye-slash' : 'eye'}
        size={15}
        color="grey"
        onPress={() => setHidePass(!hidePass)}
        style={{ left: '40%', top: -47 }}
      />

      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirm_password.value}
        onChangeText={text => setConfirmPassword({ value: text, error: '' })}
        error={!!confirm_password.error}
        errorText={confirm_password.error}
        secureTextEntry={hideConfirmPass ? true : false}
      />

      <Icon
        name={hideConfirmPass ? 'eye-slash' : 'eye'}
        size={15}
        color="grey"
        onPress={() => setHideConfirmPass(!hideConfirmPass)}
        style={{ left: '40%', top: -47 }}
      />

      <Button mode="contained" onPress={_onChangePasswordPressed} style={styles.button}>
        Update
      </Button>
    </Background>
    <Loader loading={isLoading} color="#ff66be" />
    <InternetConnectionChecker />
  </>
  )
}


const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ChangePasswordScreen))