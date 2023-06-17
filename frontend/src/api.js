import axios from "axios";

export const getMarkers = async () => {
  return (await axios.get("http://localhost:8088/map/markers")).data;
};

export const deleteMarkerById = (id) => {
  return axios.delete(`http://localhost:8088/map/markers/${id}`);
};

export const saveMarker = async (markerData) => {
  return (await axios.post("http://localhost:8088/map/markers", markerData))
    .data;
};
