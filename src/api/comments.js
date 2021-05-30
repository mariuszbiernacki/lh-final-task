import api from "./index";

const apiComments = {
  getAll(params) {
    return api.get("/comments", { params });
  },
  get(id) {
    return api.get(`/comments/${id}`);
  },
  add(newComment) {
    return api.post(`/comments`, newComment);
  },
};

export default apiComments;
