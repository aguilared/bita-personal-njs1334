import { createContext, useState, useEffect } from "react";

const initialState = {
  bitacora: "",
};
export const BitacoraContext = createContext(initialState);

export const BitacoraProvider = ({ children }) => {
  const [bitacora, setBitacora] = useState(0);
  useEffect(() => {
    //recupera la ID de sessionStorage y lo coloca como contexto o global
    setBitacora(window.sessionStorage.getItem("bitacora"));
  }, []);

  return (
    <BitacoraContext.Provider
      value={{
        bitacora,
        setBitacora,
      }}
    >
      {children}
    </BitacoraContext.Provider>
  );
};
