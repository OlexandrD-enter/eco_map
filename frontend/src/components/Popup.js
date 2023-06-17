import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { deleteMarkerById } from "../api";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { markersAtom, currentMarkerAtom } from "../state/states";
import { getMarkers } from "../api";

export default function Popup({ marker }) {
  const setMarkers = useSetRecoilState(markersAtom);
  const [selectedMarker, setSelectedMarker] = useRecoilState(currentMarkerAtom);

  const handleDelete = async () => {
    const remove = async () => {
        const response = await deleteMarkerById(marker.id);
        const markers = await getMarkers();
        setMarkers(markers);
        setSelectedMarker(null);
      };
  
      Modal.confirm({
        title: 'Видалити маркер?',
        content: 'Ви впевнені, що хочете видалити маркер?',
        okText: 'Так',
        cancelText: 'Ні',
        onOk: () => {
          remove();
        },
      });
    };
  const formItemStyle = {
    fontSize: "40px",
  };

  return (
    <div className="popup-container">
      <Form className="popup-form">
        <Form.Item label="Title" style={formItemStyle}>
          <Input value={marker.title} readOnly />
        </Form.Item>
        <Form.Item label="Latitude" style={formItemStyle}>
          <Input value={marker.lat} readOnly />
        </Form.Item>
        <Form.Item label="Longitude" style={formItemStyle}>
          <Input value={marker.lng} readOnly />
        </Form.Item>
        <Form.Item>
          <Button type="primary" danger onClick={handleDelete}>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
