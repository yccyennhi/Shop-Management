import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { modalState$ } from "../../../redux/selectors";
import {
  createKhuyenMai,
  updateKhuyenMai,
  hideModal,
} from "../../../redux/actions";
import { Form, Input, DatePicker, InputNumber, Switch, Modal } from "antd";
import { messageError } from "../../message";

import moment from "moment";

export default function KhuyenMaiModal({ currentId, setCurrentId }) {
  const { isShow } = useSelector(modalState$);
  const [form] = Form.useForm();

  const dateNow = moment().toDate();
  const [data, setData] = useState({
    MaKM: "",
    TenKM: "",
    NgayBD: new Date(Date.now()),
    NgayKT: new Date(Date.now()),
    GiaTri: 1000,
    PhanTram: 1,
    SoLuong: 0,
    TrangThai: false,
  });

  const KhuyenMaiValue = useSelector((state) =>
    state.KhuyenMais.data.find((KhuyenMai) =>
      KhuyenMai._id === currentId ? KhuyenMai : null
    )
  );
  useEffect(() => {
    if (KhuyenMaiValue) setData(KhuyenMaiValue);
  }, [KhuyenMaiValue]);

  console.log("KhuyenMai", data);

  const dispatch = useDispatch();

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setCurrentId(null);
    setData({
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
    if (data.TenKM) {
      if (data.NgayBD < data.NgayKT) {
        if (currentId) {
          dispatch(updateKhuyenMai.updateKhuyenMaiRequest(data));
        } else {
          dispatch(createKhuyenMai.createKhuyenMaiRequest(data));
        }
        onClose();
      } else {
        messageError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      }
    } else {
      messageError("Chưa nhập tên chương trình Khuyến mãi");
    }
  }, [data, dispatch, onClose, messageError]);

  const body = (
    <>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 50,
        }}
        layout="horizontal"
      >
        <Form.Item label="Mã khuyến mãi" required>
          <Input
            placeholder="Nhập mã khuyến mãi"
            value={data.MaKM.toUpperCase()}
            onChange={(e) =>
              setData({ ...data, MaKM: e.target.value.toUpperCase() })
            }
          />
        </Form.Item>

        <Form.Item label="Tên chương trình" required>
          <Input
            placeholder="Nhập tên chương trình"
            value={data.TenKM}
            onChange={(e) => setData({ ...data, TenKM: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Ngày bắt đầu" style={{ marginBottom: 0 }} required>
          <Form.Item
            style={{ display: "inline-block", width: "calc(30% - 12px)" }}
          >
            <DatePicker
              defaultValue={moment(data.NgayBD)}
              onChange={(e) => {
                if (e) setData({ ...data, NgayBD: e });
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
            required
            style={{ display: "inline-block", width: "calc(30% - 12px)" }}
            rules={[{ required: true, message: "Vui lòng nhập ngày" }]}
          >
            <DatePicker
              min
              defaultValue={moment(data.NgayKT)}
              onChange={(e) => {
                if (e) setData({ ...data, NgayKT: e });
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Trị giá hóa đơn" required>
          <InputNumber
            min={0}
            value={data.GiaTri}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            onChange={(e) => setData({ ...data, GiaTri: e })}
          />
          <span className="ant-form-text"> VNĐ </span>
        </Form.Item>

        <Form.Item label="Phần trăm giảm" required>
          <InputNumber
            min={1}
            max={100}
            value={data.PhanTram}
            onChange={(e) => setData({ ...data, PhanTram: e })}
          />
          <span className="ant-form-text"> % </span>
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
        title={currentId ? "Câp nhật khuyến mãi" : "Thêm khuyến mãi"}
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
