import api from "./api";

export const acheivementAPI = {

  createachievment: async (formData) => {
    const res = await api.post("/achievement/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  updateachievement: async (formData, id) => {
    const res = await api.put(`/achievment/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  getAllacheivement: async () => {
    const res = await api.get("/achievement");
    console.log(res)
    return res.data;
  },

  deleteachievement: async (id) => {
    const res = await api.delete(`/achievement/${id}`);
    return res.data;
  },
};