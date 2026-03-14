import api from "./api";
import Cookies from "js-cookie";

export const authAPI = {

  register: async (userData) => {
    const res = await api.post("/auth/signup", userData);
    return res.data;
  },

  signIn: async (credentials) => {
    const res = await api.post("/auth/signin", credentials);

    // store token
    Cookies.set("token", res.data.token);

    return res.data;
  },

  logout: () => {
    Cookies.remove("token");

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  },
};