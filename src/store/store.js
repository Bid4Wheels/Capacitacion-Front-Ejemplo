import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import cardReducer from './cards/cardSlice'
import {cardApiSlice} from "./cards/cardApiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cards: cardReducer,
    [cardApiSlice.reducerPath]: cardApiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardApiSlice.middleware),
});

setupListeners(store.dispatch)
