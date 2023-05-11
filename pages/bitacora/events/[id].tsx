import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import PropTypes from "prop-types";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core/Box";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { red } from "@material-ui/core/colors";
import dayjs from "dayjs";
import Container from "../../../components/Container";
import useBitacora from "../../../hooks/useBitacora";
import { useTypeEvents } from "../../../hooks/useTypeEvents";
import { useTypeEvents1 } from "../../../hooks/useTypeEvents1";
import { useEventsId } from "../../../hooks/useEventsId";
import getBitacora from "../../../services/getBitacora";
import getEventssId from "../../../services/getEventssId";
import getTypeEventsId from "../../../services/getTypeEventsId";
import { EventsContext } from "../../../context/EventState";
import Button from "../../../components/ButtonAdd";
import HeaderEventss from "../../../components/HearderEventss";
import { Description } from "@material-ui/icons";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

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

type Inputs = {
  tipo_event_id: number;
  description: string;
};

interface IFormInput {
  tipo_event_id: number;
  description: string;
}

const TipoEventsEventss = (props: any): JSX.Element => {
  //const apiUrl = "http://localhost:3000/api/eventss/";
  const { query } = useRouter();
  const { isBitacora, loadBitacora } = useBitacora(); //to Global
  const { typeEvents } = useTypeEvents(); //
  const { typeEvents1 } = useTypeEvents1(); //
  const [eventId, setEventId] = useState("");
  const { eventsId } = useEventsId(eventId); //
  const { bitacoraSelected, imageObj } = props;

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

  // const ENDPOINT = "http://localhost:3000/api/eventss/";
  const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "eventss/";

  const { status, data, error, isLoading, refetch } = useQuery(
    ["Eventss"],
    async () => {
      const res = await axios.get(`${ENDPOINT}${query.id}`);
      console.log("RESP11", res);
      return res.data;
    }
  );
  console.log("DATA11", data);

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const toggle = () => setModalInsertar(!modalInsertar);
  const toggleEliminar = () => setModalEliminar(!modalEliminar);
  const toggleEditar = () => setModalEditar(!modalEditar);
  const dateBitacora = new Date();

  const convertDate = (date: any) => {
    return dayjs(date).format("DD/MM/YYYY hh:mm");
  };
  const convertDate1 = (date: any) => {
    return dayjs(date).format("YYYY/MM/DD hh:mm");
  };

  const [bitacoraE, setBitacoraE] = useState({
    id: "",
    tipo_event_id: "",
    description: "",
  });

  const [bitacoraAdd, setBitacoraAdd] = useState({
    tipo_event_id: Number(query.id),
    description: "Dolor en ...",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  // console.log({ errors });

  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState({
    id: "",
    description: "",
    updated_at: "",
  });
  // to viewBitacora
  const [bitacoraSeleccionada1, setBitacoraSeleccionada1] = useState({
    id: "",
    authorId: "",
    bitacoraDate: "",
  });
  const [bitacoraSeleccionada2, setBitacoraSeleccionada2] = useState({
    id: "",
    tipo_event_id: "",
    description: "",
  });

  const seleccionarBitacora = (elemento: any, caso: any) => {
    setBitacoraSeleccionada(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };
  // to viewBitaEvent
  const seleccionarBitacora1 = (elemento: any, caso: any) => {
    setBitacoraSeleccionada1(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };
  // to editar
  const seleccionarBitacora2 = (elemento: any, caso: any) => {
    setBitacoraSeleccionada2(elemento);
    setBitacoraE({
      ...bitacoraE,
      id: elemento.id,
      tipo_event_id: elemento.tipo_event_id,
      description: elemento.description,
    });
    caso === "Editar" ? setModalEditar(true) : setModalViewHist(true);
  };

  const abrirModalInsertar = () => {
    setModalInsertar(true);
  };

  const handleOnChange = (bitacoraKey, value) => {
    //console.log("valueOnChangeIngresar", value);
    setBitacoraAdd({ ...bitacoraAdd, [bitacoraKey]: value });
    console.log("bitacoraOnchage", bitacoraAdd);
  };
  const handleOnChangeE = (bitacoraKey, value) => {
    setBitacoraE({ ...bitacoraE, [bitacoraKey]: value });
  };

  const onSubmit33: SubmitHandler<IFormInput> = (data) => {
    console.log("FormData", data);
    const parsedata = {
      tipo_event_id: Number(data.tipo_event_id),
      description: data.description,
    };

    //addBitaEvent(parsedata);
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    console.log("FormData", bitacoraAdd);
    try {
      const result = await fetch("/api/eventss/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bitacoraAdd),
      });
      refetch();
      setModalInsertar(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitE = async (e: BaseSyntheticEvent) => {
    console.log("FormData", bitacoraE);
    try {
      const result = await fetch("/api/eventss/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bitacoraE),
      });
      refetch();
      setModalEditar(false);
    } catch (error) {
      console.log("Error Edit", error);
    }
  };
  const eliminar = async (e: BaseSyntheticEvent) => {
    try {
      console.log("Borra Id", bitacoraSeleccionada.id);
      const result = await fetch(
        "/api/eventss/delete/" + bitacoraSeleccionada.id
      );
      // await removeBitacora(bitacoraSeleccionada.id);
      refetch();
      setModalEliminar(false);
    } catch (error) {
      console.log(error);
    }
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
              onClick={() => abrirModalInsertar()}
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
                      <th className="bg-blue-100 border text-left px-8 py-4">
                        <div>
                          <Button onClick={() => abrirModalInsertar()} />
                        </div>
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
                              {convertDate(event.updated_at)}
                            </td>
                            <td className="border px-8 py-4">
                              <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                                <button
                                  onClick={() =>
                                    seleccionarBitacora(event, "Eliminar")
                                  }
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-trash-2"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                  </svg>
                                </button>
                              </div>
                              <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                                <button
                                  onClick={() =>
                                    seleccionarBitacora2(event, "Editar")
                                  }
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-edit"
                                  >
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                              </div>
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

      <Modal isOpen={modalInsertar} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Evento</ModalHeader>
        <ModalBody>
          <form
            className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="description"
              >
                Event
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                placeholder="TipoEvento"
                defaultValue={bitacoraAdd.description}
                {...register("description", {
                  required: "Required",
                })}
                onChange={(e) => handleOnChange("description", e.target.value)}
              />
              {errors.description}
            </div>
            <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="tipo"
              >
                TIPO EVENT ID
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                type="number"
                defaultValue={
                  bitacoraSeleccionada2 && bitacoraSeleccionada2.tipo_event_id
                }
                {...register("tipo_event_id", {
                  required: "Required",
                  minLength: 1,
                  maxLength: 9,
                })}
                onChange={(e) =>
                  handleOnChange("tipo_event_id", e.target.value)
                }
              />
              {errors.tipo_event_id && errors.tipo_event_id}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => onSubmit()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalInsertar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal
        ize="xl"
        style={{ maxWidth: "780px", width: "100%" }}
        isOpen={modalEditar}
        toggle={toggleEditar}
      >
        <form
          className="w-full max-w-lg  bg-gray-400 shadow-md rounded container"
          onSubmit={handleSubmit(onSubmitE)}
        >
          <ModalHeader toggle={toggleEditar}>
            Edit Events ID:
            {bitacoraSeleccionada2.id}
            {", "}
            {bitacoraSeleccionada2.tipo_event_id} {", "}
            {bitacoraSeleccionada2 && bitacoraSeleccionada2.description}
          </ModalHeader>
          <ModalBody>
            <div className="md:w-11/12 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="authorId"
              >
                Descripcion evento
              </label>

              <textarea
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                rows="3"
                defaultValue={
                  bitacoraSeleccionada2 && bitacoraSeleccionada2.description
                }
                {...register("description", {
                  required: "Required",
                  minLength: 1,
                  maxLength: 300,
                })}
                onChange={(e) => handleOnChangeE("description", e.target.value)}
              />

              {errors.description && errors.description}
            </div>

            <div className="invisible md:invisible md:w-1/2 px-3 mb-6 md:mb-0">
              Hello
            </div>
            <input
              type="hidden"
              defaultValue={bitacoraSeleccionada2 && bitacoraSeleccionada2.id}
              {...register("id", {
                required: "Required",
                minLength: 3,
                maxLength: 41,
              })}
            ></input>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => onSubmitE()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setModalEditar(false)}
            >
              No
            </button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal isOpen={modalEliminar} toggle={toggleEliminar}>
        <ModalHeader toggle={toggleEliminar}>Eliminar Evento</ModalHeader>
        <ModalBody>
          Estás Seguro que deseas eliminar el evento{" "}
          {bitacoraSeleccionada && bitacoraSeleccionada.id}
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => eliminar(bitacoraSeleccionada.id)}
          >
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

TipoEventsEventss.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TipoEventsEventss);
