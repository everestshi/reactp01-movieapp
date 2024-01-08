import { appStorageName } from '../../globals/globalVariables';
import { createSlice } from '@reduxjs/toolkit';

function getWatchlist(){
  let watchlistFromStorage = localStorage.getItem(appStorageName);
  if(watchlistFromStorage === null){
    watchlistFromStorage = [];
  }else{
    watchlistFromStorage = JSON.parse(watchlistFromStorage);
  }
  return watchlistFromStorage;
}

const initialState = {
  items: getWatchlist()
}

function getIndex(item, arr){
    return arr.findIndex(arrItem => arrItem.id === item.id);
}

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addWatchlistItem: (state, action) => {
      const newWatchlist = [...state.items, action.payload];
      localStorage.setItem(appStorageName, JSON.stringify(newWatchlist));
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = newWatchlist;
    },
    deleteWatchlistItem: (state, action) => {
      const itemsCopy = state.items;
      itemsCopy.splice(getIndex(action.payload, state.items), 1);
      localStorage.setItem(appStorageName, JSON.stringify(itemsCopy));
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = itemsCopy;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addWatchlistItem, deleteWatchlistItem } = watchlistSlice.actions

export default watchlistSlice.reducer;

