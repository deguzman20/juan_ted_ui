import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import customerReducer from './customerReducer';
import taskerReducer from './taskerReducer';
import serviceReducer from './serviceReducer';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer =  combineReducers({
  customerReducer,
  taskerReducer,
  serviceReducer
})

export default persistReducer(persistConfig, rootReducer)