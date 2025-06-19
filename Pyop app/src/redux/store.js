import { legacy_createStore as createStore, combineReducers } from "redux";
import {globalReducer,  stableDataReducer } from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const stableDataPersistConfig = {
  key: 'data',
  storage,
}
const persistedDataReducer = persistReducer(stableDataPersistConfig, stableDataReducer)

const rootReducer = combineReducers({
  global: globalReducer,
  stableData: persistedDataReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const persistor = persistStore(store);
