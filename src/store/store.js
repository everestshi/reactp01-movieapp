import { configureStore } from '@reduxjs/toolkit';
import favsReducer from '../features/favs/favsSlice';
import watchlistReducer from '../features/favs/watchlistSlice'

export const store = configureStore({
  reducer: {
    favs: favsReducer,
    watchlist: watchlistReducer
  }
});
