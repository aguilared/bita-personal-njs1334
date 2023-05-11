import React, { createContext, useState, useEffect } from "react";
const initialState = {
  user: "",
};
export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(0);

  useEffect(() => {
    setUser(window.sessionStorage.getItem("User"));
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
