import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PeriodPrediction } from "@/utils/periodCalculator";

type SalahCounterState = {
  count: number;
};

const initialState: SalahCounterState = {
  count: 0,
};

const salahCounterSlice = createSlice({
  name: "salahCounter",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = salahCounterSlice.actions;

export const salahCounterReducer = salahCounterSlice.reducer;

const selectSalahCounter = (state: RootState) => state.salahCounter;

export const selectCount = createSelector(
  [selectSalahCounter],
  (reducer) => reducer.count
);
