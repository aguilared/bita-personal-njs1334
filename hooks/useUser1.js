import { useCallback, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import loginService from "../services/login";

export default function useUser() {
  //console.log('UserContexto?', UserContext)
  const { jwt, setJWT } = useContext(UserContext);
  const [state, setState] = useState({ loading: false, error: false });

  const login = useCallback(
    ({ email, password }) => {
      console.log("EMAIL AND PASS", email, password);
      setState({ loading: true, error: false });
      loginService({ email, password })
        .then((jwt) => {
          window.sessionStorage.setItem("jwt", jwt);
          //console.log('sesionstorage', window.sessionStorage.getItem('jwt'))
          setState({ loading: false, error: false });
          //console.log('jwtttt', jwt)
          setJWT(jwt);
        })
        .catch((err) => {
          //console.log('capturo un error', err)
          window.sessionStorage.removeItem("jwt");
          setState({ loading: false, error: true });
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
  };
}
