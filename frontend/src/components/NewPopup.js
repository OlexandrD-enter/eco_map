import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { newMarkerAtom, markersAtom } from "../state/states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { saveMarker, getMarkers, getTypes } from "../api";
import S from "./NewPopup.module.css";
const { Option } = Select;
export default function NewPopup() {
  const [form] = Form.useForm();
  const setMarkers = useSetRecoilState(markersAtom);
  const [newMarker, setNewMarker] = useRecoilState(newMarkerAtom);
  const [parameters, setParameters] = useState([]);

  const handleFinish = async (values) => {
    const selectedTypeName = values.parameter;
    const selectedType = parameters.find(
      (type) => type.name === selectedTypeName
    );
    const markerData = {
      ...values,
      type: selectedType,
    };
    const response = await saveMarker(markerData);
    const markers = await getMarkers();
    setMarkers(markers);
    setNewMarker({ isAdding: false, isAdded: false });
  };

  const handleRemove = async () => {
    setNewMarker({ isAdding: false, isAdded: false });
  };

  const getTypesName = async () => {
    try {
      const response = await getTypes();
      const types = response.data;
      setParameters(types);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTypesName();
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
        <Form.Item label="Latitude" name="lat">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Longitude" name="lng">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Введіть назву!" }]}
        >
          <Input required placeholder="Введіть назву" />
        </Form.Item>
        <Form.Item label="Parameter" name="parameter">
          <Select placeholder="Select a parameter">
            {parameters.map((type) => (
              <Option key={type.id} value={type.name}>
                {type.name}
              </Option>
            ))}
          </Select>
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
