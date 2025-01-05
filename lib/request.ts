import { toast } from "sonner";

import { BASE_URL } from "./constants";

const request = async (path: string, options: RequestInit = {}) => {
  return fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw res.json();
    })
    .catch(async (err) => {
      const error = await err;
      console.log("ERROR: ", error);
      toast.error(error.message || "Something went wrong");
    });
};

request.get = (path: string, options: RequestInit = {}) => {
  return request(path, { ...options, method: "GET" });
};

request.post = (path: string, body: object) => {
  return request(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

request.put = (path: string, body: object) => {
  return request(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

request.delete = (path: string, body: object) => {
  return request(path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export default request;
