import { combineReducers } from "redux";
import rowsSlice from "./rowsSlice";
import { configureStore } from "@reduxjs/toolkit";
import editSlice from "./editSlice";

const rootReducer = combineReducers({
  rowsSlice: rowsSlice,
  editSlice: editSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
