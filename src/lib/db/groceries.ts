import { toast } from "sonner";

const appKey = "tzonzvc7";
const key = "groceries";

export const getGroceriesApi = () => {
  return fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${key}`
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};

export const setGroceriesApi = (todos: string) => {
  fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/${key}/${todos}`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};
