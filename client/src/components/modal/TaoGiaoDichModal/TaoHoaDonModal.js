import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TaoHoaDonModalState$ } from "../../../redux/selectors/index.js";
export default function TaoHoaDonModal() {
  const { isShow } = useSelector(TaoHoaDonModalState$);
  const body = <p> Doan Ngoc Lam </p>;

  return (
    <div>
      <Modal title="Thêm hóa đơn" visible={isShow}>
        {body}
      </Modal>
    </div>
  );
}
