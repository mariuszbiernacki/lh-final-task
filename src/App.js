import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import GuessRouter from "./routers/GuessRouter";
import UserRouter from "./routers/UserRouter.jsx";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);

      if (decodedToken.exp >= new Date().getTime()) {
        localStorage.removeItem("access-token");
        setIsLogged(false);
        return;
      }

      setIsLogged(true);
      return;
    }

    setIsLogged(false);
  }, [accessToken]);

  return isLogged ? <UserRouter /> : <GuessRouter />;
};

export default App;
