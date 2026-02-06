import { toast } from "sonner";
import { prayerAppKey } from "./db";
import { PRAYERS } from "@/pages/Umri";

export const getAllCounts = () => {
  return Promise.allSettled(
    PRAYERS.map((key) => {
      return fetch(
        `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${prayerAppKey}/${key}`,
      )
        .then((r) => r.json())
        .then((res) => ({ key, count: res }))
        .catch((err) => {
          toast.error(JSON.stringify(err));
        });
    }),
  );
};

export const setPrayerCount = (key: string, count: number) => {
  fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${prayerAppKey}/${key}/${count}`,
    {
      method: "POST",
    },
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};
