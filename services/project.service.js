import api from "./api";


export const projectAPI = {
  createPortfolio: async (formData) => {
    const res = await api.post("/project/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  updatePortfolio: async (formData, id) => {
    console.log(id);

    const res = await api.put(`/project/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  getAllPortfolios: async () => {
    const res = await api.get("/project");
    return res.data;
  },

  deletePortfolio: async (id) => {
    const res = await api.delete(`/project/${id}`);
    return res.data;
  },
  getPortfolioById: async (id) => {
    const res = await api.get(`/project/${id}`);
    return res.data;
  },
};