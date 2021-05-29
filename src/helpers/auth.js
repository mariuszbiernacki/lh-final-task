import jwt_decode from "jwt-decode";

export const checkToken = () => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    const decodedToken = jwt_decode(accessToken);

    if (decodedToken.exp >= new Date().getTime()) {
      localStorage.removeItem("access-token");
      return null;
    }

    return decodedToken;
  }

  return null;
};
