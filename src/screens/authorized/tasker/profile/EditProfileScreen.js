import React, { memo, useState } from 'react';
import { SafeAreaView, Alert, ScrollView } from 'react-native';
import { styles } from '../../../../styles/authorized/tasker/profile/EditProfileStyle';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { TASKER_INFO, UPDATE_TASKER_INFO } from './../../../../queries';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { 
  firstNameValidator, 
  lastNameValidator,
  emailValidator,
  mobileNumberValidator,
  introductionValidator } from './../../../../core/utils';

import Loader from "react-native-modal-loader";

import Background from './../../../../components/atoms/background/Background';
import Header from './../../../../components/atoms/header/Header';
import Button from './../../../../components/atoms/button/Button';
import TextInput from './../../../../components/atoms/text_input/TextInput';
import BackButton from './../../../../components/atoms/button/BackButton';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
  
const EditProfileScreen = ({ navigation, tasker_id }) => {
  const netInfo = useNetInfo()
  const [isLoading, setLoading] = useState(false)
  const [first_name, setFirstName] = useState({ value: '', error: '' })
  const [last_name, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ valu: '', error: '' })
  const [mobile_number, setMobileNumber] = useState({ value: '', error: '' })
  const [introduction, setIntroduction] = useState({ value: '', error: '' })

  const { loading, error } = useQuery(TASKER_INFO, {
    onCompleted: (data) => {
      setFirstName({ value: data.tasker[0].firstName })
      setLastName({ value: data.tasker[0].lastName })
      setEmail({ value: data.tasker[0].email })
      setMobileNumber({ value: data.tasker[0].mobileNumber })
      setIntroduction(({ value: data.tasker[0].introduction }))
    },
    variables: { tasker_id: parseInt(tasker_id) },
    pollInterval: 500
  })

  const [updateTaskerInfo] = useMutation(UPDATE_TASKER_INFO)
  
  _onEditProfileInfoPressed = () => {
    const firstNameError = firstNameValidator(first_name.value)
    const lastNameError = lastNameValidator(last_name.value)
    const emailError = emailValidator(email.value)
    const mobileNumberError = mobileNumberValidator(mobile_number.value)
    const introductionError = introductionValidator(introduction.value)

    if (firstNameError || lastNameError || emailError || mobileNumberError || introductionError) {
      setFirstName({ ...first_name, error: firstNameError })
      setLastName({ ...last_name, error: lastNameError })
      setEmail({ ...email, error: emailError })
      setMobileNumber({ ...mobile_number, error: mobileNumberError })
      setIntroduction({ ...introduction, error: introductionError })
      return;
    }

    if(netInfo.isConnected){
      setTimeout(() => {
        for(let i = 1; i <= 3; i++){
          setLoading(true)
          if(i === 3){
            updateTaskerInfo({ 
              variables: { 
                tasker_id: parseInt(tasker_id),
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                mobile_number: mobile_number.value,
                introduction: introduction.value
              } 
            }).then((data) => {
              if(data.data.updateTaskerInfo.response === 'Tasker info was updated!'){
                setLoading(false)
                Alert.alert('Tasker info was updated!')
                navigation.navigate('ProfileScreen')
              }
            })
          }
        }
      },3000)
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

            <TextInput
              label="Introduction"
              returnKeyType="done"
              value={introduction.value}
              onChangeText={text => setIntroduction({ value: text, error: '' })}
              error={!!introduction.error}
              errorText={introduction.error}
              multiline={true}
            />

            <Button mode="contained" onPress={ _onEditProfileInfoPressed } style={styles.button}>
              Update
            </Button>

          </ScrollView>
        </KeyboardAwareScrollView>
        <Loader loading={isLoading} color="#ff66be" />
      </Background>
      <InternetConnectionChecker />
    </React.Fragment>
  )
}

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

export default memo(connect(mapStateToProps, null)(EditProfileScreen))