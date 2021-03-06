import React, { memo, useState } from 'react';
import { SafeAreaView, Alert, ScrollView, View } from 'react-native';
import { styles } from './../../../../styles/authorized/tasker/profile/MySkillStyle';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { 
  TASKER_INFO, 
  ADD_FEATURED_SKILL,
  UNSELECTED_SERVICE_TYPE_LIST, 
  REMOVE_TO_FEATURED_SKILL } from './../../../../queries';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Chip } from 'react-native-paper';

import Background from './../../../../components/atoms/background/Background';
import Header from './../../../../components/atoms/header/Header';
import InternetConnectionChecker from '../../../../components/atoms/snackbar/InternetConnectionChecker';
import _ from 'lodash';

const MySkillsScreen = ({ navigation, tasker_id }) => {
  const netInfo = useNetInfo()
  const selected_arr = []
  const [selectedArr, setSelectedArr] = useState([])
  const [add_skill] = useMutation(ADD_FEATURED_SKILL)
  const [remove_skill] = useMutation(REMOVE_TO_FEATURED_SKILL)

  const { loading, error, data } = useQuery(TASKER_INFO, {
    onCompleted: (dat) => {
      dat.tasker[0].featuredSkills.map((fs, i) => {
        selected_arr.push(fs.serviceType.id)
        setSelectedArr(selected_arr)
      })
    },
    variables: { 
      tasker_id: parseInt(tasker_id) 
    },
    pollInterval: 500
  })


  const unselected_service_type_list = useQuery(UNSELECTED_SERVICE_TYPE_LIST, {
    variables: { 
      tasker_id: parseInt(tasker_id)
    },
    pollInterval: 700
  })
  
  const addSkill = (service_type_id) => {
    if(netInfo.isConnected){
      Alert.alert(
        "Are you sure you want to add this",
        "",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { 
            text: "Yes", 
            onPress: () => {
              add_skill({
                variables: {
                  tasker_id: parseInt(tasker_id),
                  service_type_id: parseInt(service_type_id)
                }
              })
              .then(({ data }) => {
                if(data.createFeaturedSkill.response === 'Featured skill Created'){
                  setSelectedArr(_.without(selected_arr, service_type_id))
                }
              })
            } 
          }
        ],
        { cancelable: false }
      )
    }
  }

  const removeSkill = (service_type_id) => {
    if(netInfo.isConnected){
      Alert.alert(
        "Are you sure you want to remove this",
        "",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { 
            text: "Yes", 
            onPress: () => {
              remove_skill({
                variables: {
                  tasker_id: parseInt(tasker_id),
                  service_type_id: parseInt(service_type_id)
                }
              }).then(({ data }) => {
                if(data.removeFeaturedSkill.response === 'Successfuly removed to your selected featured skill'){
                  setSelectedArr(_.without(selected_arr, service_type_id))
                }
              })
            } 
          }
        ],
        { cancelable: false }
      );   
    }
  }

  if(loading || error || unselected_service_type_list.error || unselected_service_type_list.loading) return null;
  return(
    <React.Fragment>
      <SafeAreaView/>
      <Background>
        <KeyboardAwareScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <Header>My Skills</Header>
            {
              unselected_service_type_list.data.unselectedServiceType.length >= 1 ? (
                unselected_service_type_list.data.unselectedServiceType.map((us, i) => {
                  return(
                    <View style={styles.chipWrapper}>
                      <Chip
                        textStyle={{ fontSize: 25 }} 
                        onPress={() => {
                          addSkill(us.id)
                        }}
                        icon="plus"
                        style={styles.chipStyle}
                      >
                        {us.name}
                      </Chip>
                    </View>
                  )
                })
              ) : null
            }
            {
              data.tasker[0].featuredSkills.length >= 1 ? (
                data.tasker[0].featuredSkills.map((fs, i) => {
                  return(
                    <View style={styles.chipWrapper}>
                      <Chip
                        textStyle={{ fontSize: 25 }} 
                        onClose={() => {
                          removeSkill(fs.serviceType.id)
                        }} 
                      >
                        {fs.serviceType.name}
                      </Chip>
                    </View>
                  )
                })
              ) : null
            }
          </ScrollView>
        </KeyboardAwareScrollView>
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

export default memo(connect(mapStateToProps, null)(MySkillsScreen))