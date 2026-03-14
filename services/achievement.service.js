import api from "./api";

export const acheivementAPI = {

  createachievment: async (formData) => {
    const res = await api.post("/project/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  updateachievement: async (formData, id) => {
    const res = await api.put(`/project/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  getAllacheivement: async () => {
    const res = await api.get("/project");
    return res.data;
  },

  deleteachievement: async (id) => {
    const res = await api.delete(`/project/${id}`);
    return res.data;
  },
};