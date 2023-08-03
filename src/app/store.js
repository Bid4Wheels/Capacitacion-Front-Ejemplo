import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cardReducer from '../features/cardList/cardSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cards: cardReducer
  },
});
