export interface PeriodPrediction {
  nextPeriod: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  ovulationDate: Date;
}

export function calculatePeriod(
  lastPeriod: Date,
  cycleLength: number = 28
): PeriodPrediction {
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + cycleLength);

  const ovulationDate = new Date(nextPeriod);
  ovulationDate.setDate(nextPeriod.getDate() - 14); // ovulation 14 days before next period

  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(ovulationDate.getDate() - 5);

  const fertileWindowEnd = new Date(ovulationDate);

  return {
    nextPeriod,
    fertileWindowStart,
    fertileWindowEnd,
    ovulationDate,
  };
}
