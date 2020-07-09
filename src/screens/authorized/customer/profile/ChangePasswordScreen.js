import React, { memo, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_PASSWORD } from './../../../../queries';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from './../../../../core/theme';
import { connect } from 'react-redux';

import { oldPasswordValidator, newPasswordValidator, confirmPasswordValidator } from './../../../../core/utils';
import Background from './../../../../components/Background';
import Header from './../../../../components/Header';
import Button from './../../../../components/Button';
import TextInput from './../../../../components/TextInput';
import BackButton from './../../../../components/BackButton';
import Loader from "react-native-modal-loader";


const ChangePasswordScreen = ({ navigation, customer_id }) => {
  const [updatePassword, response] = useMutation(UPDATE_PASSWORD);

  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [old_password, setOldPassword] = useState({ value: '', error: '' });
  const [new_password, setNewPassword] = useState({ value: '', error: '' });
  const [confirm_password, setConfirmPassword] = useState({ value: '', error: '' });


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const _onChangePasswordPressed = () => {
    const oldPasswordError = oldPasswordValidator(old_password.value);
    const newPasswordError = newPasswordValidator(new_password.value);
    const confirmPasswordError = confirmPasswordValidator(confirm_password.value);

    if (oldPasswordError || newPasswordError || confirmPasswordError) {
      setOldPassword({ ...old_password, error: oldPasswordError });
      setNewPassword({ ...new_password, error: newPasswordError });
      setConfirmPassword({ ...confirm_password, error: confirmPasswordError });
      return;
    }
    
    setTimeout(() => {
      for(let i = 1; i <= 3; i++){
        setLoading(true)
        updatePassword({ variables: { id: parseInt(customer_id), old_password: old_password.value, new_password: new_password.value, confirm_password: confirm_password.value } }).then(({ data }) =>{
          if(data !== null){
            if(i == 3 && data['updatePassword']['response'] === "Password Successfuly updated!"){
              setLoading(false)
              toggleModal();
              navigation.navigate('ProfileScreen')
            }
            else{
              toggleModal();
            }
          }
        })
      }
    }, 3000)
  };

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
          Sign Up
        </Button>

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


const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(ChangePasswordScreen));