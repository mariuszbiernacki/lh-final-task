import api from "./index";

const apiTasks = {
  getAll(params) {
    return api.get("/tasks", { params });
  },
  get(id) {
    return api.get(`/tasks/${id}?_embed=comments`);
  },
  add(newTask) {
    return api.post(`/tasks`, newTask);
  },
};

export default apiTasks;
