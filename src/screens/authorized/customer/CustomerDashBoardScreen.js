import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';

import TasksScreen from './tasks/TasksScreen';
import PastTaskerScreen from './my_tasker/past_tasker/PastTaskerScreen';
import FavoriteTaskerScreen from  './my_tasker/favorite_tasker/FavoriteTaskerScreen';
import ProfileScreen from './profile/ProfileScreen';
import HomeScreen from './HomeScreen';
import ConversationsScreen from './conversation/ConversationScreen';
import LoginScreen from './../../unauthorized/LoginScreen';

class CustomerDashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home-outline', color: 'white'},
      { key: 'tasks', title: 'Tasks', icon: 'view-list', color: 'white' },
      { key: 'past_tasker', title: 'Past Tasker', icon: 'history', color: 'white' },
      { key: 'favorite_tasker', title: 'Favorite Tasker', icon: 'account-outline', color: 'white' },
      { key: 'chat', title: 'Chat', icon: 'message-text-outline', color: 'white' },
      { key: 'profile', title: 'Profile', icon: 'account-circle', color: 'white' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    tasks: TasksScreen,
    past_tasker: PastTaskerScreen,
    favorite_tasker: FavoriteTaskerScreen,
    chat: ConversationsScreen,
    profile: ProfileScreen,
  });

  render() {
    if(this.props.customer_id !== ''){
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
    else{
      return <LoginScreen navigation={this.props.navigation}/>;
    }
  }
}

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_id: customerReducer.id,
  }
}


export default connect(mapStateToProps, null)(CustomerDashBoardScreen);