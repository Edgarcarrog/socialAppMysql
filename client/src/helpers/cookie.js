import Cookies from "js-cookie";

export const setCookie = (cookieName, cookieValue) => {
  Cookies.set(cookieName, cookieValue, {
    expires: 30,
    secure: false,
    sameSite: "Lax",
    path: "/",
  });
};

export const getCookie = (cookieValue) => {
  return Cookies.get(cookieValue);
};

export const removeCookie = (cookieValue) => {
  Cookies.remove(cookieValue);
};
