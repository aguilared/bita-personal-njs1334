import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/UserState";

export default function UseUser() {
  const { user, setUser } = useContext(UserContext);

  const [state, setState] = useState({ loadingUser: false, error: false });

  const loadUser = useCallback(async (usertoLoad) => {
    console.log("User to load", usertoLoad);
    setState({ loadingUser: true, error: false });
    //guarda en sessionStorage
    await window.sessionStorage.setItem("User", usertoLoad);
    setState({ loadingUser: false, error: false });
    //invoca al contexto
    setUser(usertoLoad);
  });

  const clearUser = useCallback(() => {
    console.log("Limpiando User");
    window.sessionStorage.removeItem("User");
    setUser(null);
  }, [setUser]);

  return {
    isUser: Boolean(user),
    user: user,
    isUserLoading: state.loadingUser,
    loadUser,
    clearUser,
  };
}
