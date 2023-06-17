import React, { useState } from "react";
import { Button, notification } from "antd";
import {
  SettingFilled,
  PlusOutlined
} from "@ant-design/icons";
import S from "./Nav.module.css";
import { newMarkerAtom } from "../state/states";
import { useRecoilState } from 'recoil';

function Nav() {
  const [api, contextNotification] = notification.useNotification();
  const [newMarker, setNewMarker] = useRecoilState(newMarkerAtom);


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

  return (
    <div className={S.wrapper}>
      {contextNotification}
      <Button
        type="primary"
        icon={<SettingFilled />}
        
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddMarker}
      />
    </div>
  );
}

export default Nav;
