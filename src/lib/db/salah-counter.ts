const bucket = "XAw6PyDVRTG6qFPj5faXmY";
const key = "salahCount";
// const bucket_url = "XAw6PyDVRTG6qFPj5faXmY";

export const addNumber = (value: number) => {
  return fetch(`https://kvdb.io/${bucket}/${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: value.toString(),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Request failed");
      return res.text();
    })
    .catch(console.error);
};

export const getCount = () => {
  return fetch(`https://kvdb.io/${bucket}/${key}`)
    .then((res) => {
      if (!res.ok) throw new Error("Not found");
      return res.text();
    })
    .catch(console.error);
};

export const updateCount = (increment: boolean) => {
  fetch(`https://kvdb.io/${bucket}/${key}`, {
    method: "PATCH",
    headers: { "Content-Type": "text/plain" },
    body: increment ? "+2" : "-2",
  })
    .then((res) => res.text())
    .catch(console.error);
};
