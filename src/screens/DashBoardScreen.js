import * as React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import { BottomNavigation, Text } from 'react-native-paper';

const HomeRoute = () => <Text>Home</Text>;

const TasksRoute = () => <Text>Tasks</Text>;

const MyTaskerRoute = () => <Text>My Tasker</Text>;

const ProfileRoute = () => <Text>Profile</Text>;

class DashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home' },
      { key: 'tasks', title: 'Tasks' },
      { key: 'my_taskers', title: 'My Taskers' },
      { key: 'profile', title: 'Profile' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    tasks: TasksRoute,
    my_taskers: MyTaskerRoute,
    profile: ProfileRoute
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