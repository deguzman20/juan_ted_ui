import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import AppointmentScreen from './AppointmentScreen';
import ProfileScreen from '../customer/profile/ProfileScreen';
import MyTaskerScreen from '../customer/my_tasker/MyTaskerScreen';
import ConversationsScreen from './conversation/ConversationScreen';
class TaskerDashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'tasks', title: 'Tasks', icon: 'folder-multiple-outline', color: 'white'},
      { key: 'my_tasker', title: 'My Tasker', icon: 'account-outline', color: 'white' },
      { key: 'chat', title: 'Chat', icon: 'message-text-outline', color: 'white' },
      { key: 'profile', title: 'Profile', icon: 'account-circle', color: 'white' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    tasks: AppointmentScreen,
    my_tasker: MyTaskerScreen,
    chat: ConversationsScreen,
    profile: ProfileScreen,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        inactiveColor="silver"
        activeColor="#009C3C"
      />
    );
  }
}

export default TaskerDashBoardScreen;