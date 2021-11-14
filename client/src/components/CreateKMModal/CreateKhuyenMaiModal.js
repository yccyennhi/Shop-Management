import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { modalState$ } from "../../redux/selectors";

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Modal,
} from "antd";

import { createKhuyenMai, hideModal } from "../../redux/actions";

export default function CreateKhuyenMaiModal() {
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);


  const body = (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 60,
        }}
        layout="horizontal"
      >
        <Form.Item label="Mã khuyến mãi">
          <Input />
        </Form.Item>
        <Form.Item label="Tên chương trình">
          <Input />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Ngày kết thúc">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Số lượng">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Trị giá hóa đơn">
          <InputNumber />
          <span className="ant-form-text"> VNĐ </span>
        </Form.Item>
        <Form.Item label="Phần trăm giảm">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={1} max={100} />
          </Form.Item>
          <span className="ant-form-text"> %</span>
        </Form.Item>
        <Form.Item label="Trạng thái" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );

  return (
    <div>
      <Modal title="Thêm Khuyến mãi" visible={isShow}>
        {body}
      </Modal>
    </div>
  );
}
