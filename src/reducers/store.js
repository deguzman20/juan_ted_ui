import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './index';

const composeStoreWithMiddleware = applyMiddleware(thunk)
const store = createStore(rootReducer, composeWithDevTools(composeStoreWithMiddleware))
const persistor = persistStore(store)

export { store, persistor };