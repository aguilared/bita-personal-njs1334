import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import getBitacoraEvents from "../../services/getBitacoraEvents";
import dayjs from "dayjs";
import useSWR from "swr";
import Interweave from "interweave";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const styles = {
  card: {
    maxWidth: 645,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 40,
  },

  avatar: {
    backgroundColor: red[500],
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 145,
  },
  media: {
    height: 140,
  },
  card: {
    maxWidth: 150,
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const BitaEvents = (props: any): JSX.Element => {
  const { bitacoraSelected } = props;
  const [loading, setLoading] = useState(false);
  const [bitaevents, setBitaevents] = useState([]);
  const [totalEvents, setTotalEvents] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");

  const convertDate = (date: any) => {
    var d = dayjs(date).format("DD-MM-YYYY");
    return d;
  };
  const convertDate1 = (date: any) => {
    var d = dayjs(date).format("DD-MM-YY h:mm A");
    return d;
  };

  useEffect(
    function () {
      setLoading(true);
      getBitacoraEvents(bitacoraSelected.id).then((resp) => {
        setBitaevents(resp);
        setTotalEvents(resp.length);
      });
    },
    [setBitaevents, bitacoraSelected]
  );
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/bitacora/events/}`,
    fetcher
  );
  return (
    <div className="flex rounded items-center justify-center flex-wrap bg-gray-100 p-2">
      <div className="bg-white shadow-lg ">
        <div className="flex justify-between p-1">
          <div>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              &nbsp;
            </h3>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              Bitacora Personal # {bitacoraSelected.id}, Events:{totalEvents}
            </h3>
          </div>
          <div className="p-2">
            <ul className="flex">
              <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span className="text-sm">Author</span>
                <span className="text-sm">{bitacoraSelected.author.name}</span>
              </li>
              <li className="flex flex-col p-2 border-l-2 border-indigo-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">
                  {convertDate(bitacoraSelected.bitacoraDate)}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full h-0.5 bg-indigo-500"></div>
        <div className="flex justify-center p-4">
          <div className="border-b border-gray-200 shadow">
            <table className="shadow-lg bg-white table-fixed">
              <tr>
                <th className="bg-blue-100 w-1/12 border text-left px-8 py-4">
                  #
                </th>
                <th className="bg-blue-100 w-1/12 border text-left px-8 py-4">
                  Tipo Evento
                </th>
                <th className="bg-blue-100 w-2/12 border text-left px-8 py-4">
                  Evento
                </th>
                <th className="bg-blue-100 w-6/12 border text-left px-8 py-4">
                  Description Event
                </th>
                <th className="bg-blue-100 w-1/12 border text-left px-8 py-4">
                  Date Events
                </th>
              </tr>
              {data && data.length > 0 ? (
                data.map((bitaevent: any, key: any) => (
                  <>
                    <tr>
                      <td className="border px-8 py-4">
                        {key + 1}/{bitaevent.id}
                      </td>
                      <td className="border px-8 py-4">
                        {bitaevent.tipoEvent.description}
                      </td>
                      <td className="border px-8 py-4">
                        {bitaevent.event.description}
                      </td>
                      <td className="border px-8 py-4">
                        <Interweave content={bitaevent.description} />
                      </td>
                      <td className="border px-8 py-4">
                        {convertDate1(bitaevent.event_date)}
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <p className="text-center bg-gray-100 text-gray-500 py-5">
                  No data Events Bitacora
                </p>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

BitaEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitaEvents);
