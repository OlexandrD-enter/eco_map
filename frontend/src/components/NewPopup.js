import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";
import { newMarkerAtom, markersAtom } from "../state/states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { saveMarker, getMarkers } from "../api";
import S from './NewPopup.module.css';
export default function NewPopup() {
  const [form] = Form.useForm();
  const setMarkers = useSetRecoilState(markersAtom);
  const [newMarker, setNewMarker] = useRecoilState(newMarkerAtom);

  const handleFinish = async (values) => {
    const response = await saveMarker(values);
    const markers = await getMarkers();
    setMarkers(markers);
    setNewMarker({ isAdding: false, isAdded: false });
  };

  const handleRemove = async () => {
    setNewMarker({ isAdding: false, isAdded: false });
  };

  useEffect(() => {
    form.setFieldValue("lat", newMarker.lat);
    form.setFieldValue("lng", newMarker.lng);
  }, [newMarker.lat, newMarker.lng]);

  return (
    <div className={S.wrapper}>
      <Form
        layout="horizontal"
        form={form}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
        label="Latitude"
        name="lat"
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Longitude"
        name="lng"
      >
        <Input disabled />
      </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Введіть назву!" }]}
        >
          <Input required placeholder="Введіть назву" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button
            className={S.removeButton}
            type="primary"
            danger
            onClick={handleRemove}
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
