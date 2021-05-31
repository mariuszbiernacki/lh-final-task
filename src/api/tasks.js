import api from "./index";

const apiTasks = {
  getAll(params) {
    return api.get("/tasks", { params });
  },
  get(id) {
    return api.get(`/tasks/${id}?_embed=comments&_embed=task_changes`);
  },
  add(newTask) {
    return api.post(`/tasks`, newTask);
  },
  update(id, taskChanges) {
    return api.patch(`/tasks/${id}`, taskChanges);
  },
};

export default apiTasks;
