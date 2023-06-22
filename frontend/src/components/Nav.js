import React, { useEffect, useState } from "react";
import { Button, notification, Modal, Tree } from "antd";
import { SettingFilled, PlusOutlined } from "@ant-design/icons";
import S from "./Nav.module.css";
import { newMarkerAtom, markersAtom, filters } from "../state/states";
import { useRecoilState } from "recoil";
import { getParameters, getMarkers } from "../api";


function Nav() {
  const [api, contextNotification] = notification.useNotification();
  const [newMarker, setNewMarker] = useRecoilState(newMarkerAtom);
  const [modalVisible, setModalVisible] = useState(false);
  const [syst, setSyst] = useState([]);
  const [markers, setMarkers] = useRecoilState(markersAtom);
  const [filter, setFilter] = useRecoilState(filters);

  const handleAddMarker = () => {
    api.info({
      message: "Додавання маркеру",
      description: "Натисніть куди додати маркер",
      placement: "bottomRight",
    });
    setNewMarker({
      isAdding: true,
      isAdded: false,
    });
  };

  const fetchMarkers = async () => {
    try {
      const markers = await getMarkers(filter);
      setMarkers(markers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSettingsChange = (checkedKeys) => {
    setFilter(checkedKeys);
    fetchMarkers();
  };

  const handleSettingFilledClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalOk = () => {
    // Handle selectedParams as needed
    setModalVisible(false);
  };

  const fetchParams = async () => {
    try {
      const response = await getParameters();
      const params = response.data;
      const systemsMap = {};
      params.forEach((item) => {
        const typeName = item.type.name;
        const paramName = item.name;

        if (!systemsMap[typeName]) {
          systemsMap[typeName] = [paramName];
        } else {
          systemsMap[typeName].push(paramName);
        }
      });

      const systems = Object.entries(systemsMap).map(
        ([typeName, paramNames]) => {
          return {
            name: `${typeName}`,
            values: paramNames,
          };
        }
      );
      setSyst(systems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParams();
  }, [filter]);

  const options = [
    {
      title: "Всі",
      key: "all",
      children: syst.map((system) => ({
        title: system.name,
        key: system.name,
        children: system.values.map((value) => ({
          title: value,
          key: value,
        })),
      })),
    },
  ];

  return (
    <div className={S.wrapper}>
      {contextNotification}
      <Button
        type="primary"
        icon={<SettingFilled />}
        onClick={handleSettingFilledClick}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddMarker}
      />
      <Modal
        title="Filter Params"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalClose}
      >
        <Tree
          checkable
          treeData={options}
          defaultExpandedKeys={["all"]}
          defaultCheckedKeys={filter}
          onCheck={handleSettingsChange}
        />
      </Modal>
    </div>
  );
}

export default Nav;
