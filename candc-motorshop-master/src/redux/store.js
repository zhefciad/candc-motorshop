import  cartReducer  from './cartReducer';

import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import sectionSwitchReducer from './sectionSwitchReducer';
import checkoutFormReducer from './checkoutFormReducer';
import checkoutSessionReducer from './checkoutSessionReducer';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart', 'checkoutForm', 'checkoutSession']
}

const rootReducer = combineReducers({
  cart: cartReducer,
  sectionSwitch: sectionSwitchReducer,
  checkoutForm: checkoutFormReducer,
  checkoutSession: checkoutSessionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store);