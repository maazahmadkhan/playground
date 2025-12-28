import React from "react";
import { calculatePeriod } from "../utils/periodCalculator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCycleLength,
  selectLastPeriod,
  selectPrediction,
  setCycleLength,
  setLastPeriod,
  setPrediction,
} from "@/store/slices/period-tracker";

const PeriodTracker: React.FC = () => {
  const lastPeriod = useSelector(selectLastPeriod);
  const cycleLength = useSelector(selectCycleLength);
  const prediction = useSelector(selectPrediction);
  const dispatch = useDispatch();

  const handleCalculate = () => {
    if (!lastPeriod) return;
    const lastPeriodDate = new Date(lastPeriod);
    const result = calculatePeriod(lastPeriodDate, cycleLength);
    dispatch(setPrediction(result));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Period Tracker</h1>

      <label className="block mb-2">
        Last Period Date:
        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => dispatch(setLastPeriod(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
        />
      </label>

      <label className="block mb-4">
        Cycle Length (days):
        <input
          type="number"
          value={cycleLength}
          min={20}
          max={40}
          onChange={(e) => dispatch(setCycleLength(Number(e.target.value)))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
        />
      </label>

      <Button onClick={handleCalculate} className="mb-4">
        Calculate
      </Button>

      {prediction && (
        <div className="mt-4 space-y-2">
          <p>
            <strong>Next Period:</strong>{" "}
            {prediction?.nextPeriod?.toDateString?.() || ""}
          </p>
          <p>
            <strong>Ovulation Date:</strong>{" "}
            {prediction?.ovulationDate?.toDateString?.() || ""}
          </p>
          <p>
            <strong>Fertile Window:</strong>{" "}
            {prediction?.fertileWindowStart?.toDateString?.() || ""} -{" "}
            {prediction?.fertileWindowEnd?.toDateString?.() || ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default PeriodTracker;
