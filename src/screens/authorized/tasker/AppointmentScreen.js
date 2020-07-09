import React, { memo } from 'react';
import RNSchedule from 'rnschedule';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  {
    title: 'Lunch Appointment',
    subtitle: 'With Harry',
    start:new Date(2020, 6, 1, 10, 0, 0, 0),
    end: new Date(2020, 6, 1, 11, 0, 0, 0),
    color: '#390099'
  },
  {
    title: 'Lunch Appointment',
    subtitle: 'With Harry',
    start: new Date(2020, 6, 1, 11, 0, 0, 0),
    end: new Date(2020, 6, 1, 12, 0, 0, 0),
    color: 'cyan'
  }
]

const AppointmentScreen = () => {
  return(
    <React.Fragment>
      <SafeAreaView style={{ paddingTop:0 }} />
      <RNSchedule
        dataArray={data}
        onEventPress={(appt) => console.log(appt)}
        accentColor="black"
      />
    </React.Fragment>
 
  )
}

export default memo(AppointmentScreen);