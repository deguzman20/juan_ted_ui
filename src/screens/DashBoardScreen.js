import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ProfileScreen from './ProfileScreen';
import TaskScreen from './TaskScreen';
import HomeScreen from './HomeScreen';
import MyTaskerScreen from './MyTaskerScreen';
import Icon from 'react-native-vector-icons/Ionicons';

class DashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'tasks', title: 'Tasks', icon: 'view-list' },
      { key: 'my_taskers', title: 'My Taskers', icon: 'worker' },
      { key: 'profile', title: 'Profile', icon: 'account' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    tasks: TaskScreen,
    my_taskers: MyTaskerScreen,
    profile: ProfileScreen
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