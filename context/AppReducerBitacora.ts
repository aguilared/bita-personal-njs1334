import { BitacoraId } from "../interfaces/interfaces";

export const AppReducerBitacoraId = (
  state: BitacoraId,
  action: any
): BitacoraId => {
  switch (action.type) {
    case "FETCH_BITACORA_ID_REQUEST":
      console.log("El STATE BitacoraId Request", state.bitacoraId);
      return {
        ...state,
      };
    case "FETCH_BITACORA_ID_SUCCESS":
      console.log("StateBitaSuccess15", state.bitacoraId);
      console.log("ActionPayloadBita16", action.payload);
      return {
        bitacoraId: [
          ...state.bitacoraId,
          {
            id: action.payload.id,
            author: action.payload.author,
            author_id: action.payload.author_id,
            bitacora_date: action.payload.bitacora_date,
            created_at: action.payload.created_at,
            updated_at: action.payload.created_at,
            count: action.payload._count,
          },
        ], // agrega mas datos al array
      };

    case "REMOVE_BITACORA_ID": //Remove todos los eventos de una Bitacora
      console.log("payload REMOVE_BITACORA_ID", action.payload);

      return {
        ...state,
        bitacoraId: state.bitacoraId.filter((bitacoraId) => bitacoraId.id <= 0),
      };

    default:
      throw new Error();
  }
};
