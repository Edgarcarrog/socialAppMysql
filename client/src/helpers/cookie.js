import Cookies from "js-cookie";

export const setCookie = (cookieName, cookieValue) => {
  Cookies.set(cookieName, cookieValue, {
    expires: 30,
    secure: false,
    sameSite: "Strict",
    path: "/",
  });
};

export const getCookie = (cookieValue) => {
  Cookies.get(cookieValue);
};

export const removeCookie = (cookieValue) => {
  Cookies.remove(cookieValue);
};
