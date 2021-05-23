import api from "./index";

const apiUsers = {
  getAll() {
    return api.get("/users");
  },
  get(id) {
    return api.get(`/users/${id}`);
  },
};

export default apiUsers;
