import api from "@/services/api";

export const dashboardAPI = {
  getDashboard: async () => {

    const res = await api.get("/dashboard")
    return res.data;
  }
};