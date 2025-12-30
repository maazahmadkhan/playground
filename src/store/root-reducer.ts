import { combineReducers } from "@reduxjs/toolkit";
import { periodTrackerReducer } from "./slices/period-tracker";
import { salahCounterReducer } from "./slices/salah-counter";

export const rootReducer = combineReducers({
  periodTracker: periodTrackerReducer,
  salahCounter: salahCounterReducer,
});
