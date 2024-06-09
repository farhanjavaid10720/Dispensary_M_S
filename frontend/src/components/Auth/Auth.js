import axios from "../../axios-interceptor";
import { auth } from "../constants/endpoints";
export const login = () => {};

export const Logout = () => {
  localStorage.clear();
  window.location.href = `/?redirect=${window.location.pathname}`;
};
export const forget = () => {};

export const register = () => {};

export const me = () => {
  const token = window.localStorage.getItem("jwt");
  const header = {
    headers: {
      Authorization: token,
    },
  };
  return axios.post(auth.me, {}, header);
};
