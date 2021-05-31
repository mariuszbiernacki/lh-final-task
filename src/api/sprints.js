import api from "./index";

const apiSprints = {
  getAll(params) {
    return api.get("/sprints", { params });
  },
};

export default apiSprints;
