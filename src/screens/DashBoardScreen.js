import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ProfileScreen from './ProfileScreen';
import TaskScreen from './TaskScreen';
import HomeScreen from './HomeScreen';
import MyTaskerScreen from './MyTaskerScreen';
import ConversationScreen from './ConversationScreen';
import LinksScreen from './LinksScreen';

class DashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home', color: '#00b8e6' },
      { key: 'tasks', title: 'Tasks', icon: 'view-list', color: '#00b8e6' },
      { key: 'my_taskers', title: 'My Taskers', icon: 'worker', color: '#00b8e6' },
      { key: 'links', title: 'Links', icon: 'message', color: '#00b8e6' },
      { key: 'profile', title: 'Profile', icon: 'account', color: '#00b8e6' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    tasks: TaskScreen,
    my_taskers: MyTaskerScreen,
    links: LinksScreen,
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