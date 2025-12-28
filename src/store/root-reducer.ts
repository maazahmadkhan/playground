import { combineReducers } from "@reduxjs/toolkit";
import { periodTrackerReducer } from "./slices/period-tracker";

export const rootReducer = combineReducers({
  periodTracker: periodTrackerReducer,
});
