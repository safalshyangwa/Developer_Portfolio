import api from "./api";

export const blogAPI = {

  createablog: async (formData) => {
    const res = await api.post("/blog/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  updateblog: async (formData, id) => {
    const res = await api.put(`/blog/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  getAllblog: async () => {
    const res = await api.get("/blog");
    return res.data;
  },

  deleteblog: async (id) => {
    const res = await api.delete(`/blog/${id}`);
    return res.data;
  },
};