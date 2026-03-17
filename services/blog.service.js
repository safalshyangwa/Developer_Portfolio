import api from "./api";

export const blogAPI = {

  createblog: async (formData) => {
    const res = await api.post("/blogs/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
     
      },
    });

    return res.data;
  },

  updateblog: async (formData, id) => {
    const res = await api.put(`/blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  getAllblogs: async () => {
    const res = await api.get("/blogs");
    return res.data;
  },

  deleteblog: async (id) => {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
  },
};