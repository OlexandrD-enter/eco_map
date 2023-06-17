import './App.css';
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { markersAtom } from './state/states';
import { getMarkers } from './api';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from './credentials';
function App() {
  const [markers, setMarkers] = useRecoilState(markersAtom);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const markers = await getMarkers();
        setMarkers(markers);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    fetchMarkers();
  }, []);

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const center = {
    lat: 50.448069,
    lng: 30.519788,
  };

  return (
    <div className="App">
    <LoadScript googleMapsApiKey = {REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {markers?.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  </div>
  );
}

export default App;
