import { useEffect, useState } from "react";
import getTypeEvents from "../services/getTypeEvents";

export function useTypeEvents() {
  const [typeEvents, setTypeEvents] = useState([]);
  useEffect(
    function () {
      getTypeEvents().then((typeEvent) => {
        setTypeEvents(typeEvent);
      });
    },
    [setTypeEvents]
  );
  return { typeEvents };
}
