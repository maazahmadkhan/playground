import { useState } from "react";
import { motion } from "framer-motion";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { getAllCounts, setPrayerCount } from "@/db/umri";

type Prayer = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha" | "Witr";

export const PRAYERS: Prayer[] = [
  "Fajr",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
  "Witr",
];

// const TOTAL = 1827;

const INITIAL_COUNT = 0;

const initialCounts = PRAYERS.reduce(
  (acc, prayer) => {
    acc[prayer] = INITIAL_COUNT;
    return acc;
  },
  {} as Record<Prayer, number>,
);

export default function App() {
  const [counts, setCounts] = useState<Record<Prayer, number>>(initialCounts);

  const decrement = (prayer: Prayer) => {
    setCounts((prev) => ({
      ...prev,
      [prayer]: Math.max(0, prev[prayer] - 1),
    }));
    const count = Math.max(0, counts[prayer] - 1);
    setPrayerCount(prayer, count);
    localStorage.setItem(prayer, String(count));
  };
  const [loading, setLoading] = useState(false);

  useEffectOnce(() => {
    const onMount = async () => {
      setLoading(true);
      const response = await getAllCounts();
      const count: Record<Prayer, number> = initialCounts;
      response.map((r) => {
        if (r.status === "fulfilled") {
          const value = r.value as { key: string; count: string };
          (count as any)[value.key] = value.count;
        }
        return null;
      });
      setCounts(count);
      setLoading(false);
    };
    onMount();
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRAYERS.map((prayer) => {
          const isDisabled = !Number(counts[prayer]);
          return (
            <motion.div
              key={prayer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              className="bg-zinc-900 rounded-2xl p-6 shadow-lg w-64"
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                {prayer}
              </h2>

              <motion.div
                key={counts[prayer]}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-mono text-center mb-6"
              >
                {loading ? "..." : counts[prayer]}
              </motion.div>

              <button
                disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) {
                    return;
                  }
                  decrement(prayer);
                }}
                className={`${isDisabled ? "opacity-50" : "bg-emerald-600 hover:bg-emerald-500"} w-full py-2 rounded-xl   active:scale-95 transition`}
              >
                Decrease
              </button>
              {/* <div
                onClick={() => {
                  setCounts((prev) => ({
                    ...prev,
                    [prayer]: TOTAL,
                  }));
                  const count = TOTAL;
                  setPrayerCount(prayer, count);
                  localStorage.setItem(prayer, String(count));
                }}
              >
                Reset
              </div> */}
            </motion.div>
          );
        })}
      </div>
      <div
        className="cursor-pointer mt-8 bg-amber-700 rounded-2xl py-2 px-4 mb-8"
        onClick={() => {
          alert(
            PRAYERS.map(
              (prayer) => `${prayer}: ${localStorage.getItem(prayer)}`,
            ).join("\n"),
          );
        }}
      >
        Show backup
      </div>
    </div>
  );
}
