import api from "./index";

const apiSprints = {
  getAll(params) {
    return api.get("/sprints", { params });
  },
  get(id) {
    return api.get(`/sprints/${id}?_embed=tasks`);
  },
  add(newSprint) {
    return api.post(`/sprints`, newSprint);
  },
};

export default apiSprints;
