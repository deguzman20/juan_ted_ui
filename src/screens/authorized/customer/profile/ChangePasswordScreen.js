import React, { memo, useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { styles } from './../../../../styles/authorized/customer/profile/ChangePasswordStyle';
import { useNetInfo } from "@react-native-community/netinfo";
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { UPDATE_PASSWORD } from './../../../../queries';
import { 
  oldPasswordValidator, 
  newPasswordValidator, 
  confirmPasswordValidator } from './../../../../core/utils';

import Loader from "react-native-modal-loader";

import Background from './../../../../components/atoms/background/Background';
import Header from './../../../../components/atoms/header/Header';
import Button from './../../../../components/atoms/button/Button';
import TextInput from './../../../../components/atoms/text_input/TextInput';
import BackButton from './../../../../components/atoms/button/BackButton';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';

const ChangePasswordScreen = ({ navigation, customer_id }) => {
  const netInfo = useNetInfo()
  const [updatePassword] = useMutation(UPDATE_PASSWORD)

  const [isLoading, setLoading] = useState(false);
  const [old_password, setOldPassword] = useState({ value: '', error: '' })
  const [new_password, setNewPassword] = useState({ value: '', error: '' })
  const [confirm_password, setConfirmPassword] = useState({ value: '', error: '' })

  const _onChangePasswordPressed = () => {
    const oldPasswordError = oldPasswordValidator(old_password.value)
    const newPasswordError = newPasswordValidator(new_password.value)
    const confirmPasswordError = confirmPasswordValidator(confirm_password.value)
    
    if(netInfo.isConnected){
      if (oldPasswordError || newPasswordError || confirmPasswordError) {
        setOldPassword({ ...old_password, error: oldPasswordError })
        setNewPassword({ ...new_password, error: newPasswordError })
        setConfirmPassword({ ...confirm_password, error: confirmPasswordError })
        return;
      }
      setTimeout(() => {
        for(let i = 1; i <= 3; i++){
          setLoading(true)
          if(i === 3){
            updatePassword({ 
              variables: { 
                id: parseInt(customer_id), 
                old_password: old_password.value, 
                new_password: new_password.value, 
                confirm_password: confirm_password.value 
              } 
            }).then(({ data }) =>{
              if(data !== null){
                console.log(data['updatePassword']['response'])
                if(data['updatePassword']['response'] === "Password Successfuly updated!"){
                  setLoading(false)
                  Alert.alert("Update successfuly")
                  navigation.navigate('ProfileScreen')
                }
                else{
                  setLoading(false)
                  Alert.alert("Incorrect old password")
                }
              }
            })
          }
        }
      },3000)
    }
  }

  return(
    <React.Fragment>
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
          secureTextEntry
        />

        <TextInput
          label="New Password"
          returnKeyType="done"
          value={new_password.value}
          onChangeText={text => setNewPassword({ value: text, error: '' })}
          error={!!new_password.error}
          errorText={new_password.error}
          secureTextEntry
        />

        <TextInput
          label="Confirm Password"
          returnKeyType="done"
          value={confirm_password.value}
          onChangeText={text => setConfirmPassword({ value: text, error: '' })}
          error={!!confirm_password.error}
          errorText={confirm_password.error}
          secureTextEntry
        />

        <Button mode="contained" onPress={_onChangePasswordPressed} style={styles.button}>
          Update
        </Button>
      </Background>
      <Loader loading={isLoading} color="#ff66be" />
      <InternetConnectionChecker />
    </React.Fragment>
  )
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ChangePasswordScreen))