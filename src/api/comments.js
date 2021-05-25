import api from "./index";

const apiComments = {
  getAll() {
    return api.get("/comments");
  },
  get(id) {
    return api.get(`/comments/${id}`);
  },
};

export default apiComments;
