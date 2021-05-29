import api from "./index";

const apiTasks = {
  getAll(params) {
    return api.get("/tasks", { params });
  },
  get(id) {
    return api.get(`/tasks/${id}`);
  },
};

export default apiTasks;
