import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";import getBitacoraEvents from "../../../services/getBitacoraEvents";
import dayjs from "dayjs";
import useSWR from "swr";
import Interweave from "interweave";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import getBitacora from "../../../services/getBitacora";

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

const BitacoraViewId = (props: any): JSX.Element => {
  const { query } = useRouter();
  console.log("QUERY", query);
  const { bitacoraSelected } = props;
  const [loading, setLoading] = useState(false);
  const [bitaevents, setBitaevents] = useState([]);
  const [totalEvents, setTotalEvents] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");

  const convertDate = (date: any) => {
    var d = dayjs(date).format("DD-MM-YYYY");
    return d;
  };
  const convertDate1 = (date: any) => {
    var d = dayjs(date).format("D-M-YY h:mm");
    return d;
  };
  const getBitacoraNew = useCallback(async () => {
    if (query.id) {
      //console.log("no hay Idbitacora va a cargar", query.id);
      // //load idhistoria to global
    }
    await getBitacora(query.id).then((resp) => {
      setAuthor(resp.author.name);
      setBitacoraDate(resp.bitacora_date);
      setTotalEvents(resp._count.bita_events);
    });
  }, [setAuthor, query]);

  useEffect(() => {
    getBitacoraNew();
  }, [getBitacoraNew]);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/bitacora/events/${query.id}`,
    fetcher
  );
  console.log("DATA", data);

  return (
    <div className="flex rounded items-center justify-center flex-wrap bg-gray-100 p-2">
      <div className="bg-white shadow-lg ">
        <div className="flex justify-between p-1">
          <div>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              &nbsp;
            </h3>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              Bitacora Personal # {query.id}, Events:{totalEvents}
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
                <span className="text-sm">{author}</span>
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
                <span className="text-sm">{convertDate(bitacoraDate)}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full h-0.5 bg-indigo-500"></div>
        <div className="flex justify-center p-4">
          <div className="border-b border-gray-200 shadow">
            {data && data.length > 0 ? (
              <table className="shadow-lg bg-white table-fixed">
                <tbody>
                  <tr>
                    <th className="bg-blue-100 w-1/12 border text-left px-2 py-2">
                      #
                    </th>
                    <th className="bg-blue-100 w-1/12 border text-left px-2 py-2">
                      Tipo Evento
                    </th>
                    <th className="bg-blue-100 w-2/12 border text-left px-2 py-2">
                      Evento
                    </th>
                    <th className="bg-blue-100 w-6/12 border text-left px-2 py-2">
                      Description Event
                    </th>
                    <th className="bg-blue-100 w-1/12 border text-left px-2 py-2">
                      Date Events
                    </th>
                    <th className="bg-blue-100 w-1/12 border text-left px-2 py-2">
                      Img
                    </th>
                  </tr>
                </tbody>
                {data.map((bitaevent: any, key: any) => (
                  <>
                    <tr>
                      <td className="border px-2 py-2">
                        {key + 1}/{bitaevent.id}{" "}
                        <div className="w-1/4 inline-block text-gray-700 text-right px-1 py-1 m-0">
                          <Link
                            href={`/bitacora/bita_event/id/${encodeURIComponent(
                              bitaevent.id
                            )}`}
                            target="_blank"
                            rel="noreferrer">

                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-1 py-1 px-1 rounded-full inline-flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#000000"
                              >
                                <path
                                  clipRule="evenodd"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                              </svg>
                            </button>

                          </Link>
                        </div>
                        <div className="w-1/4 inline-block text-gray-700 text-right px-1 py-1 m-0">
                          <Link
                            href={`/bitacora/bita_event/${encodeURIComponent(
                              bitaevent.id
                            )}`}
                            passHref={true}
                            legacyBehavior>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-1 py-1 px-1 rounded-full inline-flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#000000"
                              >
                                <path
                                  clipRule="evenodd"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </td>

                      <td className="border px-2 py-2">
                        {bitaevent.tipoEvent.description}
                      </td>
                      <td className="border px-2 py-2">
                        {bitaevent.event.description}
                      </td>
                      <td className="border px-2 py-2">
                        <Interweave content={bitaevent.description} />
                      </td>
                      <td className="border px-2 py-2">
                        {convertDate1(bitaevent.event_date)}
                      </td>
                      <td className="border px-2 py-2">
                        <a
                          href={"/static/images/" + `${bitaevent.id}` + ".jpg"}
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <Image
                            onClick={() =>
                              seleccionarBitacora1(bitaevent, "Mostrar")
                            }
                            src={"/static/images/" + `${bitaevent.id}` + ".jpg"}
                            alt="my event"
                            width="192"
                            height="128"
                          />
                        </a>
                      </td>
                    </tr>
                  </>
                ))}
              </table>
            ) : (
              <div className="text-center bg-gray-100 text-gray-500 py-5">
                No data Events Bitacora
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BitacoraViewId.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BitacoraViewId);
