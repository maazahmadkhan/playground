import { toast } from "sonner";
import { splitByMaxLength } from "../lib/utils";
import { appKey, stringLimit } from "./db";

export const keys = [
  "groceries1",
  "groceries2",
  "groceries3",
  "groceries4",
  "groceries5",
];

export const getGroceriesApi = (key: string) => {
  return fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${key}`
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};

export const setGroceriesApi = (groceries: string) => {
  const strings = splitByMaxLength(groceries, stringLimit);
  if (strings.length <= keys.length) {
    strings.map((str, i) => {
      setGroceriesInKey(keys[i], str);
      return null;
    });
  } else {
    toast.error("Storage maxxed out! Increase number of keys!");
  }
};

export const setGroceriesInKey = (key: string, groceries: string) => {
  fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/${key}/${groceries}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};
