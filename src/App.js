import React, { useState, useEffect } from "react";
import GuessRouter from "./routers/GuessRouter";
import UserRouter from "./routers/UserRouter.jsx";
import { checkToken } from "./helpers/auth";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    setIsLogged(checkToken());
  }, [accessToken]);

  return isLogged ? <UserRouter /> : <GuessRouter />;
};

export default App;
