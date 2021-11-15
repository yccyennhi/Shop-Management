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

  const dateNow = moment().toDate();

  const [data, setData] = React.useState({
    MaKM: "",
    TenKM: "",
    NgayBD: dateNow,
    NgayKT: dateNow,
    GiaTri: 0,
    PhanTram: 0,
    SoLuong: 0,
    TrangThai: false,
  });

  const dispatch = useDispatch();

  const { isShow } = useSelector(modalState$);

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setData ({
      MaKM: "",
      TenKM: "",
      NgayBD: dateNow,
      NgayKT: dateNow,
      GiaTri: 0,
      PhanTram: 0,
      SoLuong: 0,
      TrangThai: false,
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createKhuyenMai.createKhuyenMaiRequest(data));
    onClose();
  }, [data, dispatch, onClose]);

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
            value={data.MaKM}
            onChange={(e) => setData({ ...data, MaKM: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Tên chương trình">
          <Input
            value={data.TenKM}
            onChange={(e) => setData({ ...data, TenKM: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: "inline-block", width: "calc(30% - 12px)" }}
          >
            <DatePicker
              defaultValue={moment(data.NgayBD)}
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
              defaultValue={moment(data.NgayKT)}
              onChange={(e) => {
                if (!e) setData({ ...data, NgayKT: e.toDate() });
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Trị giá hóa đơn">
          <InputNumber
            min={0}
            value={data.GiaTri}
            onChange={(e) => setData({ ...data, GiaTri: e })}
          />
          <span className="ant-form-text"> VNĐ </span>
        </Form.Item>
        <Form.Item label="Phần trăm giảm">
          <Form.Item name="input-number" noStyle>
            <InputNumber
              min={1}
              max={100}
              value={data.PhanTram}
              onChange={(e) => setData({ ...data, PhanTram: e })}
            />
          </Form.Item>
          <span className="ant-form-text"> %</span>
        </Form.Item>

        <Form.Item label="Số lượng">
          <InputNumber
            value={data.SoLuong}
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
