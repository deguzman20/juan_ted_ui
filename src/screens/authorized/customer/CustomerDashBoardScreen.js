import * as React from 'react';
import { Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import ProfileScreen from './profile/ProfileScreen';
import TaskScreen from './tasks/TaskScreen';
import HomeScreen from './HomeScreen';
import ConversationsScreen from './conversation/ConversationScreen';
class CustomerDashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home-outline', color: 'white'},
      { key: 'tasks', title: 'Tasks', icon: 'view-list', color: 'white' },
      { key: 'chat', title: 'Chat', icon: 'message-text-outline', color: 'white' },
      { key: 'profile', title: 'Profile', icon: 'account-outline', color: 'white' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    tasks: TaskScreen,
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

export default CustomerDashBoardScreen;