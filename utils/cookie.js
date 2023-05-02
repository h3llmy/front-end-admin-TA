import jwtDecode from "jwt-decode";
import { fetchApi } from "./fetch";
import Store from "electron-store";
import { decryptString, encryptString } from "./crypto";

const session = new Store({ name: "session" });

export const setCookie = (name, token) => {
  const decodeToken = jwtDecode(token);
  if (decodeToken.status === "admin") {
    session.set(name, encryptString(token));
  } else {
    deleteCookie(name);
    throw new Error("Unauthorized");
  }
};
export const getLoginCookie = async (name) => {
  try {
    const myCookie = session.get(name);
    if (!myCookie) {
      return null;
    }
    const [newToken] = await Promise.all([
      fetchApi.post("/auth/refresh/token", {
        refreshToken: decryptString(myCookie),
      }),
    ]);
    setCookie(name, newToken.data.data.refreshToken);
    return newToken.data.data.accessToken;
  } catch (error) {
    deleteCookie(name);
    console.error(error);
    return null;
  }
};

export const deleteCookie = (name) => {
  session.delete(name);
};
