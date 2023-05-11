import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import dayjs from "dayjs";
import Container from "../../../../components/Container";
import getTypeEventsId from "../../../../services/getTypeEventsId";
import HeaderEventss from "../../../../components/HearderEventss";
import { useQuery } from "react-query";
import axios from "axios";
const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;

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

const TipoEventsEventss = (props: any): JSX.Element => {
  const { query } = useRouter();
  const [tipoEvent, setTipoEvent] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [totalEvents, setTotalEvents] = useState([]);

  useEffect(() => {
    getTypeEventsId(query.id).then((resp) => {
      setTipoEvent(resp.description);
      setBitacoraDate(resp.updated_at);
      //setTotalEvents(resp._count.events);
    });
  }, [query, setTipoEvent, setBitacoraDate, setTotalEvents]);
  const ENDPOINT = DATABASEURL + "eventss/";
  const { status, data, error, isLoading, refetch } = useQuery(
    "Eventss",
    async () => {
      const res = await axios.get(`${ENDPOINT}${query.id}`);
      console.log("RESP11", res);
      return res.data;
    }
  );
  // console.log("DATA11", data);

  const convertDate = (date: any) => {
    return dayjs(date).format("DD/MM/YYYY hh:mm");
  };

  return (
    <Container>
      <div className="flex rounded items-center justify-between flex-wrap bg-gray-100 p-2">
        {isLoading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}
        {data ? (
          <div className="bg-white shadow-lg ">
            <HeaderEventss
              bitacoraid={query.id}
              totalEvents={data.length}
              author={tipoEvent}
              bitacoraDate={bitacoraDate}
            />

            <div className="w-full h-0.5 bg-indigo-500"></div>

            <div className="flex justify-center p-4">
              <div className="border-b border-gray-200 shadow">
                <table className="shadow-lg bg-white table-auto">
                  <thead>
                    <tr>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Renglon/Id
                      </th>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Tipo Evento
                      </th>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Description Event
                      </th>
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        Date Event
                      </th>
                    </tr>
                  </thead>

                  <>
                    {data.map((event: any, key: any) => (
                      <>
                        <tbody key={key}>
                          <tr key={key}>
                            <td className="border px-8 py-4">
                              {key + 1} {event.id}
                            </td>
                            <td className="border px-8 py-4">
                              {event.tipo_event_id}
                            </td>
                            <td className="border px-8 py-4">
                              {event.description}
                            </td>
                            <td className="border px-8 py-4">
                              {convertDate(event.event_date)}
                            </td>
                          </tr>
                        </tbody>
                      </>
                    ))}
                  </>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <thead>
            <tr>
              <td className="text-center bg-gray-100 text-gray-500 py-5">
                No data eventss
              </td>
            </tr>
          </thead>
        )}
      </div>
    </Container>
  );
};

TipoEventsEventss.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TipoEventsEventss);
