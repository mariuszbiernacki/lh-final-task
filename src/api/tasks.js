import api from "./index";

const apiTasks = {
  getAll() {
    return api.get("/tasks");
  },
  get(id) {
    return api.get(`/tasks/${id}`);
  },
};

export default apiTasks;
