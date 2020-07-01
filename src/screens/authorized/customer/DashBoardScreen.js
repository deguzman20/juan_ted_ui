import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import ProfileScreen from './ProfileScreen';
import TaskScreen from './TaskScreen';
import HomeScreen from './HomeScreen';
import ConversationsScreen from './conversation/ConversationScreen';
import AppointmentScreen from '../tasker/AppointmentScreen';
class DashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home', color: '#00b8e6' },
      { key: 'tasks', title: 'Tasks', icon: 'view-list', color: '#00b8e6' },
      { key: 'chat', title: 'Chat', icon: 'message', color: '#00b8e6' },
      { key: 'appointment', title: 'Appointment', icon: 'message', color: '#00b8e6' },
      { key: 'profile', title: 'Profile', icon: 'account', color: '#00b8e6' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    tasks: TaskScreen,
    chat: ConversationsScreen,
    appointment: AppointmentScreen,
    profile: ProfileScreen,
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

export default DashBoardScreen;