import { getToken } from "@/utils/getToken";
import api from "./api";
import Cookies from "js-cookie";
import { setToken } from "@/utils/setToken";
import { removeToken } from "@/utils/removeToken";

export const authAPI = {

  register: async (userData) => {
    const res = await api.post("/auth/signup", userData);
    return res.data;
  },

  signIn: async (credentials) => {
  const res = await api.post("/auth/signin", credentials);

  console.log("FULL RESPONSE:", res.data); 
  console.log("TOKEN VALUE:", res.data.token); 

  setToken(res.data.token);

  return res.data;
},

  logout: async () => {

    await api.post("/auth/logout")

  removeToken()
  },
   refreshToken:async () => {
  const refreshToken = getToken()
  if (!refreshToken) throw new Error("No refresh token stored");

  const res = await api.post("/auth/refresh-token", { refreshToken });
  setToken(res.data.accessToken); // store new access token
// update refresh token too
  return res.data.accessToken;
},
  

  getCurrentUser: async () => {
 

  const res = await api.get("/auth/me");
  return res.data;
}
};

