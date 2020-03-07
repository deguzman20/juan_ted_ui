import { combineReducers } from 'redux';
import { customerReducer } from './customerReducer';
import { taskerReducer } from './taskerReducer';
import { customerAuthReducer } from './customerAuthReducer';
import { taskerAuthReducer } from './taskerAuthReducer';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['customerAuthReducer', 'taskerAuthReducer'],
  stateReconciler: autoMergeLevel2
}

const rootReducer =  combineReducers({
  customerReducer,
  taskerReducer,
  customerAuthReducer,
  taskerAuthReducer
})

export default persistReducer(persistConfig, rootReducer)