import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import FavorateTaskerScreen from './favorate_tasker/FavorateTaskerScreen';
import PastTaskerScreen from './past_tasker/PastTaskerScreen'; 

const TabNavigator = createMaterialTopTabNavigator(
  {
    "Favorate Tasker": {
      screen: FavorateTaskerScreen,
    },
    "Past Tasker": {
      screen: PastTaskerScreen
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#009C3C",
      inactiveTintColor: "#009C3C",
      style: {
        backgroundColor: "white",
      },
      indicatorStyle: {
        backgroundColor: "#009C3C",
      },
      upperCaseLabel: false,
    },
    initialRouteName: "Favorate Tasker"
  }
);

const Navigation = createAppContainer(TabNavigator);

export default Navigation;