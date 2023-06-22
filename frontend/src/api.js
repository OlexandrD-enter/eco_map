import axios from "axios";

export const getMarkers = async (filter) => {
  return (await axios.post("http://localhost:8088/map/markers/filter", filter)).data;
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

export const getParametersByType = async (filter) => {
  return await axios.get(`http://localhost:8088/map/parameters/${filter}`);
};

export const saveMarkerParams = async (markerParamsData) => {
  return (await axios.post("http://localhost:8088/map/marker_parameters", markerParamsData))
    .data;
};

export const getMarkerParameters = async (id) => {
  return await axios.get(`http://localhost:8088/map/marker_parameters/id/${id}`);
};

export const getParameters = async () => {
  return await axios.get("http://localhost:8088/map/parameters");
};
