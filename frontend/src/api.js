import axios from "axios";

export const getMarkers = async () => {
  return (await axios.get("http://localhost:8088/map/markers")).data;
};