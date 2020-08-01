import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const config = {
  key: 'root',
  storage,
  whitelist: ['ui'],
  // blacklist: ['ui'],
  stateReconciler: autoMergeLevel2
};

const reducer = persistReducer(config, rootReducer);
export default function configureStore() {
  const enhancer = compose(applyMiddleware(thunk));
  const store = createStore(reducer, enhancer);
  const persistor = persistStore(store);

  return { persistor, store };
}
