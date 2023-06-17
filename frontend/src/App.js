import "./App.css";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { markersAtom, currentMarkerAtom, newMarkerAtom } from "./state/states";
import { getMarkers } from "./api";
import { REACT_APP_GOOGLE_MAPS_API_KEY } from "./credentials";
import Popup from "./components/Popup";
import Nav from "./components/Nav";
import NewPopup from "./components/NewPopup";

function App() {
  const [markers, setMarkers] = useRecoilState(markersAtom);
  const [selectedMarker, setSelectedMarker] = useRecoilState(currentMarkerAtom);
  const [newMarker, setNewMarker] = useRecoilState(newMarkerAtom);

  useEffect(() => {
    fetchMarkers();
  }, []);

  const fetchMarkers = async () => {
    try {
      const markers = await getMarkers();
      setMarkers(markers);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const center = {
    lat: 50.448069,
    lng: 30.519788,
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleNewMarkerClick = () => {
    setNewMarker((prevMarker) => ({
      ...prevMarker,
      isClicked: true,
    }));
  };

  const handleMapClick = (event) => {
    if (newMarker.isAdding) {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setNewMarker({
        ...newMarker,
        isAdding: false,
        isAdded: true,
        isClicked: false,
      });
    }
  };

  return (
    <div className="App">
      <Nav></Nav>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {markers?.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker}
              onCloseClick={handleInfoWindowClose}
            >
              <Popup marker={selectedMarker} />
            </InfoWindow>
          )}
          {newMarker.isAdded && !newMarker.isClicked && (
            <Marker position={newMarker} onClick={handleNewMarkerClick}>
              {/* Render the marker */}
            </Marker>
          )}
          {newMarker.isAdded && newMarker.isClicked && (
            <InfoWindow position={newMarker} onCloseClick={handleInfoWindowClose}>
              <NewPopup />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default App;
