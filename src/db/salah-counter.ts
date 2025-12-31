import { toast } from "sonner";
import { appKey } from "./db";

const key = "count";

export const getCountApi = () => {
  return fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${key}`
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};

export const setCountApi = (count: number) => {
  fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/${key}/${count}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};
