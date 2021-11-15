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
  Col,
  Row,
} from "antd";

import { createKhuyenMai, hideModal } from "../../redux/actions";
import moment from "moment";

export default function CreateKhuyenMaiModal() {
  const [data, setData] = React.useState({
    MaKM: "",
    TenKM: "",
    NgayBD: new Date(2021, 11, 14),
    NgayKT: new Date(2021, 11, 14),
    GiaTri: 0,
    PhanTram: 0,
    SoLuong: 0,
    TrangThai: false,
  });

  const dispatch = useDispatch();

  const { isShow } = useSelector(modalState$);

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createKhuyenMai.createKhuyenMaiRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

  //   const onSubmit = React.useCallback(() => {
  //  console.log('data',data)
  //   }, [data]);

  const body = (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 50,
        }}
        layout="horizontal"
      >
        <Form.Item label="Mã khuyến mãi">
          <Input
            data={data.MaKM}
            onChange={(e) => setData({ ...data, MaKM: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Tên chương trình">
          <Input
            data={data.TenKM}
            onChange={(e) => setData({ ...data, TenKM: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: "inline-block", width: "calc(30% - 12px)" }}
          >
            <DatePicker
              data={data.NgayBD}
              onChange={(e) => {
                if (!e) setData({ ...data, NgayBD: e.toDate() });
              }}
            />
          </Form.Item>
          <span
            style={{
              display: "inline-block",
              lineHeight: "32px",
              textAlign: "center",
              margin: "0 8px",
            }}
          >
            Ngày kết thúc:
          </span>
          <Form.Item
            style={{ display: "inline-block", width: "calc(30% - 12px)" }}
          >
            <DatePicker
              data={data.NgayKT}
              onChange={(e) => {
                if (!e) setData({ ...data, NgayKT: e.toDate() });
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Trị giá hóa đơn">
          <InputNumber
            data={data.GiaTri}
            onChange={(e) => setData({ ...data, GiaTri: e })}
          />
          <span className="ant-form-text"> VNĐ </span>
        </Form.Item>
        <Form.Item label="Phần trăm giảm">
          <Form.Item name="input-number" noStyle>
            <InputNumber
              min={1}
              max={100}
              data={data.PhanTram}
              onChange={(e) => setData({ ...data, PhanTram: e })}
            />
          </Form.Item>
          <span className="ant-form-text"> %</span>
        </Form.Item>

        <Form.Item label="Số lượng">
          <InputNumber
            data={data.SoLuong}
            onChange={(e) => setData({ ...data, SoLuong: e })}
          />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Switch
            checked={data.TrangThai}
            onChange={(e) => setData({ ...data, TrangThai: e })}
          />
        </Form.Item>
      </Form>
    </>
  );

  return (
    <div>
      <Modal
        title="Thêm Khuyến mãi"
        visible={isShow}
        onCancel={onClose}
        onOk={onSubmit}
        width={800}
      >
        {body}
      </Modal>
    </div>
  );
}
