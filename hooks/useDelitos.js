import { useEffect, useState, useContext } from "react";
import getDelitos from "../services/getDelitos";
//import { GlobalContext } from '../context/GlobalState';

export function useDelitos() {
  const [loadingdel, setLoadingdel] = useState(false);
  //const { delitos, setDelitos } = useContext(GlobalContext);
  const [delitos, setDelitos] = useState([]);

  useEffect(
    function () {
      setLoadingdel(true);
      console.log("delitos desde usedelitos", getDelitos());
      getDelitos().then((delitos) => {
        setLoadingdel(false);
        setDelitos(delitos.delitos);
      });
    },
    [setDelitos],
  );

  return { loadingdel, delitos };
}
