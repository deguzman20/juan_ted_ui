import React, { memo } from 'react';
import RNSchedule from 'rnschedule';

const data = [
  {
    title: 'Lunch Appointment',
    subtitle: 'With Harry',
    start: new Date(2020, 6, 1, 8, 0, 0, 0),
    end: new Date(2020, 6, 1, 10, 0, 0, 0),
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

const AppointmentScreen = () =>
  <RNSchedule
    dataArray={data}
    onEventPress={(appt) => console.log(appt)}
    accentColor="black"
  />

export default memo(AppointmentScreen);