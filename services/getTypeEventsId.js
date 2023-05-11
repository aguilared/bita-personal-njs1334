import axios from "axios";
// const apiUrl = "http://localhost:3000/api/tipoEvents/";
const apiUrl = process.env.NEXT_PUBLIC_API_URL + "tipoEvents/";

export default async function getTypeEventsId(id) {
  try {
    const resp = await axios.get(apiUrl + id);
    return resp.data[0];
  } catch (error) {
    return error;
  }
}
