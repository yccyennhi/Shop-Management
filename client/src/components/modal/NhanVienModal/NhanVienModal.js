import { RetweetOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
} from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNhanVien,
  createTaiKhoan,
  hideNhanVienModal,
  updateNhanVien,
} from "../../../redux/actions";
import { NhanVienModalState$, NhanViensState$ } from "../../../redux/selectors";
import { messageError } from "../../message";

export default function NhanVienModal({ currentId, setCurrentId }) {
  const dispatch = useDispatch();

  //#region Data NhanVien
  const NhanViens = useSelector(NhanViensState$);

  const [data, setData] = useState({
    MaNV: "",
    TenNV: "",
    NgaySinh: new Date(),
    SDT: "",
    Email: "",
    DiaChi: "",
    NgayVaoLam: new Date(),
    TrangThai: true,
  });

  const NhanVienValue = NhanViens.find((NhanVien) =>
    NhanVien._id === currentId ? NhanVien : null
  );

  useEffect(() => {
    if (NhanVienValue) setData(NhanVienValue);
  }, [NhanVienValue]);
  //#endregion

  //#region Modal handle
  const [form] = Form.useForm();

  const { isShow } = useSelector(NhanVienModalState$);

  const RandomMa = useCallback(() => {
    if (data.MaNV === "" || data.MaNV === undefined) {
      let NhanVien;
      do {
        const min = 1000000;
        const max = 9999999;
        const rand = min + Math.random() * (max - min);
        const Ma = "NV" + Math.round(rand);
        setData({ ...data, MaNV: Ma });
        NhanVien = NhanViens.find((NhanVien) => NhanVien.MaNV == Ma);
      } while (NhanVien !== undefined);
    }
  }, [data, dispatch]);

  const checkData = () => {
    const isExistMaNV = NhanViens.find((NhanVien) =>
      NhanVienValue
        ? NhanVien.MaNV === data.MaNV && data.MaNV !== NhanVienValue.MaNV
          ? true
          : false
        : NhanVien.MaNV === data.MaNV
    );
    if (isExistMaNV) {
      messageError("Đã tồn tại mã nhân viên");
      return false;
    }
    if (!data.MaNV) {
      messageError("Chưa nhập mã nhân viên");
      return false;
    }
    if (!data.TenNV) {
      messageError("Chưa nhập tên nhân viên");
      return false;
    }
    if (!data.NgaySinh) {
      messageError("Chưa chọn ngày sinh");
      return false;
    }
    if (!data.SDT) {
      messageError("Chưa nhập số điện thoại nhân viên");
      return false;
    }
    if (!data.Email) {
      messageError("Chưa nhập email nhân viên");
      return false;
    }
    if (!(moment(data.NgaySinh) < moment().toDate())) {
      messageError("Ngày sinh phải nhỏ hơn hôm nay");
      return false;
    }
    if (!(moment(data.NgaySinh) < moment(data.NgayVaoLam))) {
      messageError("Ngày sinh phải nhỏ hơn ngày vào làm");
      return false;
    }
    return true;
  };

  const onClose = useCallback(() => {
    dispatch(hideNhanVienModal());
    setCurrentId(null);
    setData({
      MaNV: "",
      TenNV: "",
      NgaySinh: new Date(),
      SDT: "",
      Email: "",
      DiaChi: "",
      NgayVaoLam: new Date(),
      TrangThai: true,
    });
  }, [dispatch]);

  const onSubmit = useCallback(() => {
    if (checkData()) {
      if (currentId) {
        dispatch(updateNhanVien.updateNhanVienRequest(data));
      } else {
        dispatch(createNhanVien.createNhanVienRequest(data));

        const TK = {
          TenTK: data.MaNV,
          MatKhau: data.MaNV,
        };
        dispatch(createTaiKhoan.createTaiKhoanRequest(TK));
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
        <Form.Item label="Mã nhân viên" required>
          <Input
            style={{ width: "calc(100% - 32px)" }}
            placeholder="Nhập mã nhân viên"
            value={data.MaNV.toUpperCase()}
            onChange={(e) =>
              setData({ ...data, MaNV: e.target.value.toUpperCase() })
            }
            disabled={currentId ? true : false}
          />
          <Button icon={<RetweetOutlined />} onClick={RandomMa} />
        </Form.Item>
        <Form.Item label="Tên nhân viên" required>
          <Input
            placeholder="Nhập tên nhân viên"
            value={data.TenNV}
            onChange={(e) => setData({ ...data, TenNV: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Ngày sinh" required>
          <DatePicker
            format={"DD/MM/YYYY"}
            value={moment(data.NgaySinh)}
            onChange={(e) => {
              if (e) setData({ ...data, NgaySinh: e });
            }}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" required>
          <InputNumber
            controls={false}
            addonBefore="0"
            placeholder="Nhập số điện thoại"
            value={data.SDT}
            onChange={(e) => {
              setData({ ...data, SDT: e ? `0${e}` : "" });
            }}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            placeholder="Nhập email"
            value={data.Email}
            onChange={(e) => {
              setData({ ...data, Email: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input
            placeholder="Nhập địa chỉ"
            value={data.DiaChi}
            onChange={(e) => {
              setData({ ...data, DiaChi: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Ngày vào làm">
          <DatePicker
            format={"DD/MM/YYYY"}
            value={moment(data.NgayVaoLam)}
            onChange={(e) => {
              if (e) setData({ ...data, NgayVaoLam: e });
            }}
          />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Switch
            disabled={currentId ? false : true}
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
        title={currentId ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
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
