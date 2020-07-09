import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import AppointmentScreen from './AppointmentScreen';
class TaskerDashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'appointment', title: 'Appointment', icon: 'message', color: '#00b8e6' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    appointment: AppointmentScreen
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}

export default TaskerDashBoardScreen;