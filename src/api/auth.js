import api from "./index";

const apiAuth = {
  register(data) {
    return api.post("/register", data);
  },
  login(data) {
    return api.post("/login", data);
  },
};

export default apiAuth;
