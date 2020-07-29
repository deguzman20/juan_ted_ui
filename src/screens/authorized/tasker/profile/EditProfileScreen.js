import React, { memo, useState } from 'react';
import { StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { TASKER_INFO, UPDATE_TASKER_INFO } from './../../../../queries';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from './../../../../core/theme';
import { 
  firstNameValidator, 
  lastNameValidator,
  emailValidator,
  mobileNumberValidator } from './../../../../core/utils';

import Background from './../../../../components/Background';
import Header from './../../../../components/Header';
import Button from './../../../../components/Button';
import TextInput from './../../../../components/TextInput';
import BackButton from './../../../../components/BackButton';
import InternetConnectionChecker from '../../../../components/InternetConnectionChecker';

const EditProfileScreen = ({ navigation, tasker_id }) => {
  const netInfo = useNetInfo();
  const [first_name, setFirstName] = useState({ value: '', error: '' });
  const [last_name, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' });

  const { loading, error } = useQuery(TASKER_INFO, {
    onCompleted: (data) => {
      setFirstName({ value: data.tasker[0].firstName })
      setLastName({ value: data.tasker[0].lastName })
      setEmail({ value: data.tasker[0].email })
      setMobileNumber({ value: data.tasker[0].mobileNumber })
    },
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 500
  });

  const [updateTaskerInfo] = useMutation(UPDATE_TASKER_INFO);

  
  _onEditProfileInfoPressed = () => {
    const firstNameError = firstNameValidator(first_name.value);
    const lastNameError = lastNameValidator(last_name.value);
    const emailError = emailValidator(email.value);
    const mobileNumberError = mobileNumberValidator(mobile_number.value);

    if (firstNameError || lastNameError || emailError || mobileNumberError) {
      setFirstName({ ...first_name, error: firstNameError });
      setLastName({ ...last_name, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setMobileNumber({ ...mobile_number, error: mobileNumberError });
      return;
    }

    if(netInfo.isConnected){
      updateTaskerInfo({ 
        variables: { 
          tasker_id: parseInt(tasker_id),
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
          mobile_number: mobile_number.value
        } 
      }).then((data) => {
        if(data.data.updateTaskerInfo.response === 'Tasker info was updated!'){
            Alert.alert('Tasker info was updated!');
            navigation.navigate('ProfileScreen');
        }
      })
    }
  };

  if(loading || error) return null;

  return(
    <React.Fragment>
      <SafeAreaView/>
      <Background>
        <BackButton goBack={() => navigation.navigate('ProfileScreen')} />
        <KeyboardAwareScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <Header>Edit Tasker Profile</Header>

            <TextInput
              label="Firstname"
              returnKeyType="done"
              value={first_name.value}
              onChangeText={text => setFirstName({ value: text, error: '' })}
              error={!!first_name.error}
              errorText={first_name.error}
            />

            <TextInput
              label="Lastname"
              returnKeyType="done"
              value={last_name.value}
              onChangeText={text => setLastName({ value: text, error: '' })}
              error={!!last_name.error}
              errorText={last_name.error}
            />

            <TextInput
              label="Email"
              returnKeyType="done"
              value={email.value}
              onChangeText={text => setEmail({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
            />

            <TextInput
              label="Mobile Number"
              returnKeyType="done"
              value={mobile_number.value}
              onChangeText={text => setMobileNumber({ value: text, error: '' })}
              error={!!mobile_number.error}
              errorText={mobile_number.error}
            />

            <Button mode="contained" onPress={ _onEditProfileInfoPressed } style={styles.button}>
              Update
            </Button>

          </ScrollView>
        </KeyboardAwareScrollView>
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


const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(EditProfileScreen));