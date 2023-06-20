import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Select, Space } from "antd";
import { deleteMarkerById } from "../api";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { markersAtom, currentMarkerAtom } from "../state/states";
import { getMarkers, getParameters, saveMarkerParams } from "../api";
import {
  DeleteOutlined
} from "@ant-design/icons";
const { Option } = Select;

export default function Popup({ marker }) {
  const setMarkers = useSetRecoilState(markersAtom);
  const [selectedMarker, setSelectedMarker] = useRecoilState(currentMarkerAtom);
  const [parameters, setParameters] = useState([]);
  const [newParameter, setNewParameter] = useState({ name: "", value: "" });
  const [optionsData, setOptionsData] = useState([]);

  const handleDelete = async () => {
    const remove = async () => {
      const response = await deleteMarkerById(marker.id);
      const markers = await getMarkers();
      setMarkers(markers);
      setSelectedMarker(null);
    };

    Modal.confirm({
      title: "Видалити маркер?",
      content: "Ви впевнені, що хочете видалити маркер?",
      okText: "Так",
      cancelText: "Ні",
      onOk: () => {
        remove();
      },
    });
  };

  const handleAddParameter = () => {
    setParameters([...parameters, newParameter]);
    setNewParameter({ name: "", value: "" });
  };

  const handleRemoveParameter = (index) => {
    const updatedParameters = [...parameters];
    updatedParameters.splice(index, 1);
    setParameters(updatedParameters);
  };

  const handleSave = () => {
    const updatedParameters = parameters.map((parameter) => {
      const matchingOption = optionsData.find((option) => option.name === parameter.name);
      return {
        marker: selectedMarker,
        parameter: matchingOption,
        value: parameter.value,
        dateAdded: new Date().toISOString(),
      };
    });
    saveMarkerParams(updatedParameters);
    setSelectedMarker(null);
  };

  const formItemStyle = {
    fontSize: "20px",
  };

  const selectStyle = {
    width: "100%",
    minWidth: "200px", // Adjust the width as needed
  };

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        const response = await getParameters(marker.type.id);
        const params = response.data;
        setOptionsData(params);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParameters();
  }, [marker]);

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
        <Form.Item label="Type" style={formItemStyle}>
          <Input value={marker.type.name} readOnly />
        </Form.Item>
      </Form>

      <Form className="popup-form">
        {parameters.map((parameter, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Space>
              <Select
                value={parameter.name}
                onChange={(value) => {
                  const updatedParameters = [...parameters];
                  updatedParameters[index].name = value;
                  setParameters(updatedParameters);
                }}
                style={{ ...selectStyle }}
              >
                {optionsData.map((option) => (
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))}
              </Select>
              <Input
                value={parameter.value}
                onChange={(e) => {
                  const updatedParameters = [...parameters];
                  updatedParameters[index].value = e.target.value;
                  setParameters(updatedParameters);
                }}
              />
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveParameter(index)}
              />
            </Space>
          </div>
        ))}

        {/* Button to add a new parameter */}
        <Button type="primary" onClick={handleAddParameter}>
          Add Parameter
        </Button>

        {/* Button to save the parameters */}
        <Button type="primary" style={{ marginTop: "10px" }} onClick={handleSave}>
          Save Parameters
        </Button>
      </Form>

      {/* Delete button */}
      <Button type="primary" danger onClick={handleDelete}>
        Delete marker
      </Button>
    </div>
  );
}





