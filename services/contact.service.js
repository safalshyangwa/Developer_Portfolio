import api from "./api";
import Cookies from "js-cookie";

export const contactAPI = {

  contact: async (userData) => {
    const res = await api.post("/contact", userData);
    return res.data;
  }
}

