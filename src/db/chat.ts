import { toast } from "sonner";
import { chatAppKey } from "./db";
import {
  replaceEmojiWithText,
  replaceTextWithEmoji,
} from "@/utils/emoji-support";

export const validatePassword = async (password: string): Promise<string> => {
  const otherPassword = await fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${chatAppKey}/${password}`
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
  const finalMessage = replaceEmojiWithText(newMessage || "empty");
  return await fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${chatAppKey}/message,${password}/${finalMessage}`,
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
  return fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${chatAppKey}/message,${password}`
  )
    .then((res) => res.json())
    .then(async (res) => {
      return replaceTextWithEmoji(res) as any;
    })
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
};

export const deleteMessageApi = async (password: string) => {
  return await fetch(
    `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${chatAppKey}/message,${password}/empty`,
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
        `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${chatAppKey}/${password}/${
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
