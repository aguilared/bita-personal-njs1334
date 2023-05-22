import axios from "axios";
const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = DATABASEURL + "events/";
export default async function getEventsId(id) {
  try {
    const resp = await axios.get(apiUrl + id);
    return resp.data;
  } catch (error) {
    return error;
  }
}
