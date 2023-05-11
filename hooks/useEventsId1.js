import { useEffect, useState } from "react";
import getEventsId from "../services/getEventsId";

export function useEventsId(id) {
  const [eventsId, setEventsId] = useState({});
  useEffect(
    function () {
      let options = [];
      getEventsId(id).then((typeEvent) => {
        typeEvent.forEach((option) => {
          let row = {};
          if (option.id == 3) row.selected = true;
          row.value = option.id;
          row.label = option.id + " " + option.description;
          options.push(row);
        });
        console.log("OptionsEventsSelect2", options);
        setEventsId(options);
      });
    },
    [id, setEventsId]
  );
  return { eventsId };
}
