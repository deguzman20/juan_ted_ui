import React, { memo, useState } from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { UPDATE_PASSWORD } from './../../../../queries';
import { theme } from './../../../../core/theme';
import { 
  oldPasswordValidator, 
  newPasswordValidator, 
  confirmPasswordValidator } from './../../../../core/utils';

import { useNetInfo } from "@react-native-community/netinfo";

import Background from './../../../../components/Background';
import Header from './../../../../components/Header';
import Button from './../../../../components/Button';
import TextInput from './../../../../components/TextInput';
import BackButton from './../../../../components/BackButton';
import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';


const ChangePasswordScreen = ({ navigation, customer_id }) => {
  const netInfo = useNetInfo();
  const [updatePassword] = useMutation(UPDATE_PASSWORD);

  const [old_password, setOldPassword] = useState({ value: '', error: '' });
  const [new_password, setNewPassword] = useState({ value: '', error: '' });
  const [confirm_password, setConfirmPassword] = useState({ value: '', error: '' });

  const _onChangePasswordPressed = () => {
    const oldPasswordError = oldPasswordValidator(old_password.value);
    const newPasswordError = newPasswordValidator(new_password.value);
    const confirmPasswordError = confirmPasswordValidator(confirm_password.value);
    
    if(netInfo.isConnected){
      if (oldPasswordError || newPasswordError || confirmPasswordError) {
        setOldPassword({ ...old_password, error: oldPasswordError });
        setNewPassword({ ...new_password, error: newPasswordError });
        setConfirmPassword({ ...confirm_password, error: confirmPasswordError });
        return;
      }
      updatePassword({ variables: { id: parseInt(customer_id), old_password: old_password.value, new_password: new_password.value, confirm_password: confirm_password.value } }).then(({ data }) =>{
        if(data !== null){
          if(data['updatePassword']['response'] === "Password Successfuly updated!"){
            navigation.navigate('ProfileScreen')
          }
          else{
            Alert.alert("Failed to update")
          }
        }
      })
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
      <InternetConnectionChecker />
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


const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ChangePasswordScreen));