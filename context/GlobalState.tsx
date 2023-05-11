import { TodoState } from "../interfaces/interfaces";
import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

import { AppReducer } from "./AppReducer";
const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;

const INITIAL_STATE: TodoState = {
  bitacoras1: [],
  loading: false,
};
const INITIAL_STATE1 = {
  id: "",
  author_id: "",
  author: [],
  bitacora_date: "",
  created_at: "",
  updated_at: "",
  count: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const GlobalContext = createContext(INITIAL_STATE);

export const GlobalProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const ENDPOINT = DATABASEURL + "bitacora";

  useEffect(() => {
    setLoading(true);
    const setBitacoraList = async () => {
      dispatch({
        type: "FETCH_BITACORAS_REQUEST",
        payload: "Haciendo un Request",
      });
      const result = await axios(`${ENDPOINT}`);
      console.log("List Bitacoras Result", result);
      dispatch({
        type: "FETCH_BITACORAS_SUCCESS",
        payload: result.data,
      });
    };
    setBitacoraList();
  }, [ENDPOINT]);

  async function addBitacora(bitacora: any) {
    const ENDPOINTADD = DATABASEURL + "bitacora/create";
    try {
      const result = await fetch(ENDPOINTADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(bitacora),
      });
      if (!result.ok) {
        const message = `An error has occured: ${result.status}`;
        throw new Error(message);
      }
      const data = await result.json();
      const ID = data.id;

      const result1 = await axios(`${ENDPOINT}/${ID}`);
      const bitacoraTop = await result1.data;
      dispatch({
        type: "ADD_BITACORA",
        payload: bitacoraTop, // el endpoint devuelve el id nuevo creado.
      });
      return ID; //param id open will
    } catch (error) {
      console.log(error);
    }
  }

  async function editBitacora(bitacora: any) {
    const ENDPOINTEDIT = DATABASEURL + "bitacora/update";
    const ENDPOINTEDITED = DATABASEURL + "bitacora/bitacora.id";
    try {
      const result = await fetch(ENDPOINTEDIT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(bitacora),
      });
      const result1 = await fetch(ENDPOINTEDITED);
      const bitacoraupdate = await result1.json(); //bitacora + name of relation

      dispatch({
        type: "EDIT_BITACORA",
        payload: bitacoraupdate, // el endpoint devuelve el id nuevo editado.
      });
    } catch (error) {
      console.log("ErrorEDITANDO", error);
      console.log("ErrorEDIT", bitacora);
    }
  }

  async function editBitacoraNewEvent(bitacoraId: any) {
    const fetchData = async () => {
      console.log("DataRecibidaNewEvent", bitacoraId);
      try {
        const result1 = await fetch("/api/bitacora/" + bitacoraId);
        const bitacoraupdate = await result1.json(); //bitacora + name of relation
        console.log("Actualizar Result", bitacoraupdate);
        dispatch({
          type: "EDIT_BITACORA_NEW_EVENT",
          payload: bitacoraupdate, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);
      }
    };
    fetchData();
  }

  async function removeBitacora(bitacoraId: any) {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/bitacora/delete/" + bitacoraId);
        //console.log("result borrar", result);
        // @ts-ignore
        if (!result.ok) {
          console.log("Un Error ocurrio", result);
        }
        dispatch({
          type: "REMOVE_BITACORA",
          payload: bitacoraId,
        });
      } catch (error) {
        //setIsError(true);
        console.log("Error borrar", error);
      }
    };
    fetchData();
  }

    async function addUser(bitacora: any) {
      const ENDPOINTADD = DATABASEURL + "users/create";
      try {
        const result = await fetch(ENDPOINTADD, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(bitacora),
        });
        if (!result.ok) {
          const message = `An error has occured: ${result.status}`;
          throw new Error(message);
        }
        const data = await result.json();
        const ID = data.id;

        const result1 = await axios(`${ENDPOINT}/${ID}`);
        const bitacoraTop = await result1.data;
        dispatch({
          type: "ADD_USER",
          payload: bitacoraTop, // el endpoint devuelve el id nuevo creado.
        });
        return ID; //param id open will
      } catch (error) {
        console.log(error);
      }
    }



  return (
    <GlobalContext.Provider
      value={{
        bitacoras1: state.bitacoras1,
        addBitacora,
        addUser,
        editBitacora,
        editBitacoraNewEvent,
        removeBitacora,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
