import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PeriodPrediction } from "@/utils/periodCalculator";

type PeriodTrackerState = {
  lastPeriod: string;
  cycleLength: number;
  prediction: PeriodPrediction | null;
};

const initialState: PeriodTrackerState = {
  cycleLength: 28,
  lastPeriod: "",
  prediction: null,
};

const periodTrackerSlice = createSlice({
  name: "periodTracker",
  initialState,
  reducers: {
    setLastPeriod: (state, action: PayloadAction<string>) => {
      state.lastPeriod = action.payload;
    },
    setCycleLength: (state, action: PayloadAction<number>) => {
      state.cycleLength = action.payload;
    },
    setPrediction: (state, action: PayloadAction<PeriodPrediction | null>) => {
      state.prediction = action.payload;
    },
  },
});

export const { setCycleLength, setLastPeriod, setPrediction } =
  periodTrackerSlice.actions;

export const periodTrackerReducer = periodTrackerSlice.reducer;

const selectPeriodTracker = (state: RootState) => state.periodTracker;

export const selectLastPeriod = createSelector(
  [selectPeriodTracker],
  (reducer) => reducer.lastPeriod
);

export const selectPrediction = createSelector(
  [selectPeriodTracker],
  (reducer) => reducer.prediction
);

export const selectCycleLength = createSelector(
  [selectPeriodTracker],
  (reducer) => reducer.cycleLength
);
