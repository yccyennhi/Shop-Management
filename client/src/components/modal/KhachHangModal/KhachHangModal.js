import { RetweetOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Switch } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getKhachHangs,
  createKhachHang,
  hideKhachHangModal,
  updateKhachHang,
} from "../../../redux/actions";
import {
  KhachHangModalState$,
  KhachHangsState$,
} from "../../../redux/selectors";
import { messageError } from "../../message";

export default function KhachHangModal({ currentId, setCurrentId }) {
  const dispatch = useDispatch();

  //#region Data
  useEffect(() => {
    dispatch(getKhachHangs.getKhachHangsRequest());
  }, [dispatch]);

  const KhachHangs = useSelector(KhachHangsState$);

  const [data, setData] = useState({
    MaKH: "",
    TenKH: "",
    NgaySinh: new Date(),
    SDT: "",
    Email: "",
    DiaChi: "",
    DiemTichLuy: 0,
    TrangThai: true,
  });

  const KhachHangValue = KhachHangs.find((KhachHang) =>
    KhachHang._id === currentId ? KhachHang : null
  );

  useEffect(() => {
    if (KhachHangValue) setData(KhachHangValue);
  }, [KhachHangValue]);
  //#endregion

  //#region Modal handle
  const [form] = Form.useForm();

  const { isShow } = useSelector(KhachHangModalState$);

  const RandomMa = useCallback(() => {
    if (data.MaKH === "" || data.MaKH === undefined) {
      let KhachHang;
      do {
        const min = 1000000;
        const max = 9999999;
        const rand = min + Math.random() * (max - min);
        const Ma = "KH" + Math.round(rand);
        setData({ ...data, MaKH: Ma });
        KhachHang = KhachHangs.find((KhachHang) => KhachHang.MaKH == Ma);
      } while (KhachHang !== undefined);
    }
  }, [data]);

  const checkData = () => {
    const isExistMaKH = KhachHangs.find((KhachHang) =>
      KhachHangValue
        ? KhachHang.MaKH === data.MaKH && data.MaKH !== KhachHangValue.MaKH
          ? true
          : false
        : KhachHang.MaKH === data.MaKH
        ? true
        : false
    );
    if (isExistMaKH) {
      messageError("Đã tồn tại mã khách hàng");
      return false;
    }
    if (!data.MaKH) {
      messageError("Chưa nhập mã khách hàng");
      return false;
    }
    if (!data.TenKH) {
      messageError("Chưa nhập tên khách hàng");
      return false;
    }
    if (!data.NgaySinh) {
      messageError("Chưa chọn ngày sinh");
      return false;
    }
    if (!data.SDT) {
      messageError("Chưa nhập số điện thoại khách hàng");
      return false;
    }
    if (!data.Email) {
      messageError("Chưa nhập email khách hàng");
      return false;
    }
    return true;
  };

  const onClose = useCallback(() => {
    dispatch(hideKhachHangModal());
    setCurrentId(null);
    setData({
      MaKH: "",
      TenKH: "",
      NgaySinh: new Date(),
      SDT: "",
      Email: "",
      DiaChi: "",
      DiemTichLuy: 0,
      TrangThai: true,
    });
  }, [dispatch]);

  const onSubmit = useCallback(() => {
    if (checkData()) {
      if (currentId) {
        dispatch(updateKhachHang.updateKhachHangRequest(data));
      } else {
        dispatch(createKhachHang.createKhachHangRequest(data));
      }
      onClose();
    }
  }, [data, dispatch, onClose, checkData]);
  //#endregion

  //#region Modal body
  const body = (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 50 }}
        layout="horizontal"
      >
        <Form.Item label="Mã khách hàng" required>
          <Input
            allowClear
            style={{ width: "calc(100% - 32px)" }}
            placeholder="Nhập mã khách hàng"
            value={data.MaKH.toUpperCase()}
            onChange={(e) => {
              setData({ ...data, MaKH: e.target.value.toUpperCase() });
            }}
            disabled={currentId ? true : false}
          />
          <Button icon={<RetweetOutlined />} onClick={RandomMa} />
        </Form.Item>
        <Form.Item label="Tên khách hàng" required>
          <Input
            allowClear
            placeholder="Nhập tên khách hàng"
            value={data.TenKH}
            onChange={(e) => {
              setData({ ...data, TenKH: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Ngày sinh" required>
          <DatePicker
            allowClear
            value={moment(data.NgaySinh)}
            onChange={(e) => {
              if (e) setData({ ...data, NgaySinh: e });
            }}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" required>
          <Input
            allowClear
            placeholder="Nhập số điện thoại"
            value={data.SDT}
            onChange={(e) => {
              setData({ ...data, SDT: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            allowClear
            placeholder="Nhập email"
            value={data.Email}
            onChange={(e) => {
              setData({ ...data, Email: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input
            allowClear
            placeholder="Nhập địa chỉ"
            value={data.DiaChi}
            onChange={(e) => {
              setData({ ...data, DiaChi: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Điểm tích lũy">
          <Input value={data.DiemTichLuy} readOnly bordered={false} />
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
  //#endregion

  return (
    <div>
      <Modal
        title={currentId ? "Cập nhật khách hàng" : "Thêm khách hàng"}
        visible={isShow}
        onOk={onSubmit}
        onCancel={onClose}
        width={800}
      >
        {body}
      </Modal>
    </div>
  );
}
