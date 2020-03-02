import { combineReducers } from 'redux';
import { customerReducer } from './customerReducer';
import { taskerReducer } from './taskerReducer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer =  combineReducers({
  customerReducer,
  taskerReducer
})

export default persistReducer(persistConfig, rootReducer)