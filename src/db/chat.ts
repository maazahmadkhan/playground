import { toast } from "sonner";
import { appKey } from "./db";

export const validatePassword = async (password: string): Promise<string> => {
  const otherPassword = await fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${password}`
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
  return otherPassword;
};

export const sendMessageApi = async (message: string, password: string) => {
  const prevMessages = await getMessageApi(password);
  const newMessage = `${
    isMessage(prevMessages) ? `${prevMessages}}}` : ""
  }${message}`;
  return await fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/message,${password}/${
      newMessage || "empty"
    }`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then(() => newMessage)
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};

export const getMessageApi = async (
  password: string
): Promise<string | null> => {
  const message = await fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/message,${password}`
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
  return message;
};

export const deleteMessageApi = async (password: string) => {
  return await fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/message,${password}/empty`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};

export const signUp = async (hisPassword: string, herPassword: string) => {
  return await Promise.all(
    [
      hisPassword,
      herPassword,
      `message,${hisPassword}`,
      `message,${herPassword}`,
    ].map((password, i) => {
      return fetch(
        `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/${password}/${
          i === 0
            ? herPassword
            : i == 1
            ? hisPassword
            : "Welcome to Secure Chat!"
        }`,
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          toast.error(JSON.stringify(err));
        });
    })
  );
};

export const isMessage = (msg?: string | null | void): msg is string => {
  return (
    !!msg && !["empty", "Welcome to Secure Chat!"].some((e) => msg.includes(e))
  );
};
