import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import AppointmentScreen from '../tasker/appointment/AppointmentScreen';
import ProfileScreen from '../tasker/profile/ProfileScreen';
import MySkillsScreen from '../tasker/profile/MySkillsScreen';
import ConversationsScreen from './conversation/ConversationScreen';
import LoginScreen from './../../unauthorized/LoginScreen';

class TaskerDashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'tasks', title: 'Tasks', icon: 'folder-multiple-outline', color: 'white'},
      { key: 'my_skills', title: 'Skills', icon: 'human', color: 'white' },
      { key: 'chat', title: 'Chat', icon: 'message-text-outline', color: 'white' },
      { key: 'profile', title: 'Profile', icon: 'account-circle', color: 'white' },  
    ]
  }

  _handleIndexChange = index => this.setState({ index })

  _renderScene = BottomNavigation.SceneMap({
    tasks: AppointmentScreen,
    my_skills: MySkillsScreen,
    chat: ConversationsScreen,
    profile: ProfileScreen,
  })

  render() {
    if(this.props.tasker_id !== ''){
      return (
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
          inactiveColor="silver"
          activeColor="#009C3C"
        />
      )
    }
    else {
      return <LoginScreen navigation={this.props.navigation}/>;
    }
  }
}

const mapStateToProps = ({ taskerReducer }) => {
  return {
    tasker_id: taskerReducer.id
  }
}

export default connect(mapStateToProps, null)(TaskerDashBoardScreen)