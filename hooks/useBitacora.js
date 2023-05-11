import { useCallback, useContext, useState } from "react";
import { BitacoraContext } from "../context/BitacoraState";

export default function UseBitacora() {
  const { bitacora, setBitacora } = useContext(BitacoraContext);

  const [state, setState] = useState({ loadingBitacora: false, error: false });

  const loadBitacora = useCallback(async (bitacoratoLoad) => {
    console.log("Bitacora to load", bitacoratoLoad);
    setState({ loadingBitacora: true, error: false });
    //guarda en sessionStorage
    await window.sessionStorage.setItem("Bitacora", bitacoratoLoad);
    setState({ loadingBitacora: false, error: false });
    //invoca al contexto
    setBitacora(bitacoratoLoad);
  });

  const clearBitacora = useCallback(() => {
    console.log("Limpiando Bitacora");
    window.sessionStorage.removeItem("bitacora");
    setBitacora(null);
  }, [setBitacora]);

  return {
    isBitacora: Boolean(bitacora),
    bitacora: bitacora,
    isBitacoraLoading: state.loadingBitacora,
    loadBitacora,
    clearBitacora,
  };
}
