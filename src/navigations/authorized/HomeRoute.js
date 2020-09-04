import { createStackNavigator } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { getAllServiceAction } from './../../actions';


import HomeScreen from './../../screens/authorized/customer/HomeScreen';
import ProfileScreen from './../../screens/authorized/customer/profile/ProfileScreen';
import HairSalonScreen from './../../screens/authorized/customer/services/HairSalonScreen';
import BarberScreen from './../../screens/authorized/customer/services/BarberScreen';
import GoogleMapScreen from './../../screens/authorized/customer/map/GoogleMapScreen';
import TaskersScreen from './../../screens/authorized/customer/geocoded_taskers/TaskersScreen';
import TaskerInfoScreen from './../../screens/authorized/customer/geocoded_taskers/TaskerInfoScreen';
import ReviewsScreen from './../../screens/authorized/customer/geocoded_taskers/ReviewsScreen';
import ChooseDayScreen from './../../screens/authorized/customer/date_time/ChooseDayScreen';

const mapStateToProps = ({ customerReducer }) => {
  return {
    customer_first_name: customerReducer.first_name
  }
};

export const App = createStackNavigator({
  Home: { 
    screen: connect(mapStateToProps, { getAllServiceAction })(HomeScreen),
    navigationOptions: {
      headerShown: false,
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
  },
  BarberScreen: {
    screen:  BarberScreen,
    navigationOptions: {
      title: 'Barber',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  HairSalonScreen: {
    screen:  HairSalonScreen,
    navigationOptions: {
      title: 'Hair Salon',
      headerStyle: { backgroundColor: 'white' },
    }
  },
  GoogleMapScreen: {
    screen: GoogleMapScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  TaskersScreen: {
    screen: TaskersScreen,
    navigationOptions: {
      title: 'Available Tasker',
      headerStyle: {}
    }
  },
  TaskerInfoScreen: {
    screen: TaskerInfoScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  ChooseDayScreen: {
    screen: ChooseDayScreen,
    navigationOptions: {
      title: '',
      headerStyle: {}
    }
  },
  ReviewsScreen: {
    screen: ReviewsScreen,
    navigationOptions: {
      title: 'Reviews',
      headerStyle: {}
    }
  },
},{
  initialRouteName: 'Home'
})
