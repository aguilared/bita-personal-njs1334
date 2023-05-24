import { Events } from "../interfaces/interfaces";
import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

import { AppReducerEvents } from "./AppReducerEvents";
import useBitacora from "../hooks/useBitacora";
import toast, { Toaster } from "react-hot-toast";

const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;

const INITIAL_STATE: Events = {
  events: [],
  loading: false,
};

const notifyCreate = () =>
  toast.custom((t) => (
    <div
      className={`bg-white px-6 py-4 shadow-md rounded-full ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      Bita-Event Created successfully 👋
    </div>
  ));

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const EventsContext = createContext(INITIAL_STATE);

export const EventsProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(AppReducerEvents, INITIAL_STATE);
  //console.log("State ", state);
  const [loading, seLoading] = useState(false);
  const ENDPOINT = DATABASEURL + "bitacora/events/admin/";
  const { isBitacora, loadBitacora, bitacora } = useBitacora();

  useEffect(() => {
    const fetchData = async () => {
      if (!isBitacora) {
        // no run reducer initial start
        console.log("No hay IDBitacora", bitacora);
        return;
      }
      dispatch({
        type: "REMOVE_BITA_EVENTS",
        payload: "Remove bitacora eventos anteriores",
      });
      try {
        //  const ENDPOINT = "http://localhost:3000/api/bitacora/events/";
        const result = await axios(`${ENDPOINT}${bitacora}`);
        console.log("EventsBitacora Result", result);
        dispatch({
          type: "FETCH_BITA_EVENTS_SUCCESS",
          payload: result.data,
        });
      } catch (err) {
        console.log("ERROR??", err);
      }
    };
    //fetchData();
    //setTimeout(fetchData, 1000);
    fetchData().catch(console.error);
  }, [ENDPOINT, isBitacora]);

  const addBitaEvent = useCallback((bitacora: any) => {
    const fetchData = async () => {
      const ENDPOINTC = DATABASEURL + "bitacora/events/create/";
      const ENDPOINTT = DATABASEURL + "bitacora/events/top";
      console.log("Data a Save", bitacora);
      try {
        const result = await fetch("/api/bitacora/events/create", {
          // const result = await fetch(ENDPOINTC, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitacora),
        });
        //notifyCreate();
        toast.success("Bita-Event created successfully11");

        const result1 = await fetch(ENDPOINTT);
        const bitaEventTop = await result1.json();
        //console.log("TopAfterCreate", bitaEventTop);
        dispatch({
          type: "ADD_BITA_EVENT",
          payload: bitaEventTop, // el endpoint devuelve el id nuevo creado.
        });
      } catch (error) {
        console.log("Error data", error);
        return error;
      }
    };
    fetchData();
  }, []);

  const editBitaEvent = useCallback((bitaEvent: any) => {
    const fetchData = async () => {
      console.log("Edit Evento", bitaEvent);
      const ENDPOINTEDIT = DATABASEURL + "bitacora/events/admin/edit";

      //console.log("bitaEvent.id", bitaEvent.id);
      try {
        const result = await fetch(ENDPOINTEDIT, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bitaEvent),
        });
        toast.success("Bita-Event Updated successfully11");
        dispatch({
          type: "EDIT_BITA_EVENT",
          payload: bitaEvent, //
        });
      } catch (error) {
        console.log("Error data", error);
      }
    };
    fetchData();
  }, []);

  function removeBitaEvent(eventId: any) {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/bitacora/events/delete/" + eventId);
        //console.log("result borrar", result);
        // @ts-ignore
        if (!result.ok) {
          console.log("Un Error ocurrio", result);
        }
        dispatch({
          type: "REMOVE_EVENT",
          payload: eventId,
        });
        toast.success("Bita-Event delected successfully1");
      } catch (error) {
        //setIsError(true);
        console.log("Error borrar", error);
      }
    };
    fetchData();
  }

  const clearBitaEvents = () => {
    //setBitaEvents(null);
    //setBitaEvents(INITIAL_STATE1);
    //state.bitaEvents(null);
    console.log("CLEARED BitaEVENTS IN CONTEXT FILE"); // not cleared
  };
  return (
    <EventsContext.Provider
      value={{
        events: state.events,
        addBitaEvent,
        editBitaEvent,
        removeBitaEvent,
        clearBitaEvents,
        loading,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
