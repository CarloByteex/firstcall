import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer, { IUserSlice } from "./slices/User";


interface IReducer {
  user: IUserSlice,
}

export interface IRedux {
  reducers: IReducer
}

const reducers = combineReducers({
  user: userReducer
});

const reducer = combineReducers({
  reducers
});

const store = configureStore({
  reducer,
})

export type AppDispatch = typeof store.dispatch;
export default store;