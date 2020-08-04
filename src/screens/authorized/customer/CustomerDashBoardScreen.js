import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { connect } from 'react-redux';
import PastTaskerScreen from './my_tasker/past_tasker/PastTaskerScreen';
import FavorateTaskerScreen from  './my_tasker/favorate_tasker/FavorateTaskerScreen';
import ProfileScreen from './profile/ProfileScreen';
import HomeScreen from './HomeScreen';
import ConversationsScreen from './conversation/ConversationScreen';
class CustomerDashBoardScreen extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home-outline', color: 'white'},
      { key: 'past_tasker', title: 'Past Tasker', icon: 'history', color: 'white' },
      { key: 'favorate_tasker', title: 'Favorate Tasker', icon: 'account-outline', color: 'white' },
      { key: 'chat', title: 'Chat', icon: 'message-text-outline', color: 'white' },
      { key: 'profile', title: 'Profile', icon: 'account-circle', color: 'white' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  bottom_navigation_visiblity = () => {
    if(this.props.customer_id !== ""){
      return 'flex';
    }
    else{
      return 'none';
    }
  }

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    past_tasker: PastTaskerScreen,
    favorate_tasker: FavorateTaskerScreen,
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
        // barStyle={{ display: this.bottom_navigation_visiblity() }}
      />
    );
  }
}

const mapStateToProps = ({ customerReducer, taskerReducer }) => {
  return {
    customer_id: customerReducer.id,
    tasker_id: taskerReducer.id
  }
}


export default connect(mapStateToProps, null)(CustomerDashBoardScreen);