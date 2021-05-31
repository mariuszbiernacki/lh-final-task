import api from "./index";

const apiTaskChanges = {
  add(taskChange) {
    return api.post(`/task_changes`, taskChange);
  },
};

export default apiTaskChanges;
