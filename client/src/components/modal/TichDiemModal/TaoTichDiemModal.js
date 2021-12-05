import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
  Col,
  Row,
  Cascader,
} from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ThanhToanTichDiemModalState$,
} from "../../../redux/selectors/index.js";
import { hideThanhToanTichDiemModal } from "../../../redux/actions";
import {
  DeleteOutlined,
  NodeExpandOutlined,
  PlusOutlined,
} from "@ant-design/icons";

export default function ThanhToanTichDiemModal() {
  const dispatch = useDispatch();
  const { isShow } = useSelector(ThanhToanTichDiemModalState$);
  React.useEffect(() => {
  }, [dispatch]);

  const onCancel = React.useCallback(() => {
    dispatch(hideThanhToanTichDiemModal());
  }, [dispatch]);

  const onFinish = React.useCallback(() => {
    onCancel();
  }, [dispatch]);

  const body = (
    <>
      Day la body
    </>
  );
  return (
    <div>
      <Modal
        title="Thanh toán bằng điểm tích lũy"
        width={1000}
        visible={isShow}
        onOk={onFinish}
        onCancel={onCancel}
        okText="Thêm"
        okButtonProps={{
          disabled: true,
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
