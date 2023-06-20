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

export const getTypes = async () => {
  return (await axios.get("http://localhost:8088/map/types"));
};

export const getParameters = async (filter) => {
  return await axios.get(`http://localhost:8088/map/parameters/${filter}`);
};

export const saveMarkerParams = async (markerParamsData) => {
  return (await axios.post("http://localhost:8088/map/marker_parameters", markerParamsData))
    .data;
};

export const getMarkerParameters = async (id) => {
  return await axios.get(`http://localhost:8088/map/marker_parameters/${id}`);
};
