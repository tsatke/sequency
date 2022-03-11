import { backendDomain } from "./utility";
import axios from "axios";
import toast, { TYPE } from "./toast";

export const METHOD = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

const fetch = async (method, uriSuffix, body = {}, overwriteURL = false) => {
  try {
    if (!uriSuffix) return false;
    const result = await axios({
      method,
      url: overwriteURL ? uriSuffix : `${backendDomain}${uriSuffix}`,
      [method === METHOD.GET ? "params" : "data"]: body,
    });
    return result.data;
  } catch (err) {
    return false;
  }
};

export const fileUploadS3Private = async (
  presignedURL,
  file,
  progressCallback
) => {
  const uploadResult = await axios.put(presignedURL, file, {
    headers: { "Content-Type": file.type },
    onUploadProgress: (e) => {
      if (typeof progressCallback !== "function") return;
      const progress = parseInt(Math.round((e.loaded / e.total) * 100));
      progressCallback(progress);
    },
  });
  return uploadResult.status === 200;
};

export const auth = {
  login: async (mail, password) => {
    const { status, token, user } = await fetch(METHOD.POST, "/login", {
      mail,
      password,
    });
    // if (status && token && user) {
    //   dispatch(setUser(user));
    //   dispatch(setUserToken(token));
    //   return { token, user };
    // } else {
    //   toast(TYPE.ERROR, translation.login.wrongCredentials);
    // }
    return {};
  },
  resolveToken: async (token) => {
    const {
      status,
      user,
      token: newToken,
    } = await fetch(METHOD.GET, "/auth/resolve-token");
    if (status && user) {
      return { user, newToken };
    }
    return {};
  },
};
