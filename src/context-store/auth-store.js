import { createContext, useCallback, useEffect, useState } from "react";

let logoutTimer;

//default context value
const authContext = createContext({
  isLoggedIn: false,
  token: "",
  login: (token, expirationTime, user) => {},
  logout: () => {},
  user: {},
});

//calculates expiration time in milliseconds (currentTime - tokenExpTime)
const calculateExpirationTime = (expirationTime) => {
  const currTime = new Date().getTime();
  const expTime = new Date(expirationTime).getTime();
  const remainingTime = expTime - currTime;
  return remainingTime;
};

//retrieves token from local storage if present also removes token if the tokenExpTime < 1min
const retrieveToken = () => {
  const storageToken = localStorage.getItem("idToken");
  const expTime = localStorage.getItem("expirationTime");
  const storedUser = localStorage.getItem("user");
  const user = storedUser!==undefined ? JSON.parse(storedUser) : null;
  if (!storageToken && !expTime) {
    return;
  }
  const remainingTime = calculateExpirationTime(expTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return;
  }

  return {
    token: storageToken,
    duration: remainingTime,
    user,
  };
};

//Auth Provider component
export const AuthProvider = (props) => {
  let initToken;
  let initUser;
  const tokenData = retrieveToken();

  //if token is present in local storage, token value will be initialized or else it will be undefined
  if (tokenData) {
    initToken = tokenData.token;
    initUser = tokenData.user;
  }
  const [token, setToken] = useState(initToken);
  const [user, setUser] = useState(initUser);
  let isLoggedIn = !!token;
  useEffect(() => {
    if (tokenData) {
      setTimeout(logoutTimer, tokenData.duration);
    }
  }, [tokenData]);

  //handles logout
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("idToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    //token and expTime will be removed
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //handles login
  const login = useCallback(
    (token, expTime, user) => {
      localStorage.setItem("idToken", token);
      localStorage.setItem("expirationTime", expTime);
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);
      const remainingTime = calculateExpirationTime(expTime);
      //automatically logsout if time expires
      logoutTimer = setTimeout(logout, remainingTime);
    },
    [logout]
  );

  const auth = { token, isLoggedIn, login, logout, user };
  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
};

export default authContext;
