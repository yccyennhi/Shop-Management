import { DatePicker, Form, Input, Modal, Switch } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNhanVien,
  createTaiKhoan,
  hideNhanVienModal,
  updateNhanVien
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

  const checkData = () => {
    const isExistMaNV = NhanViens.find((NhanVien) =>
      NhanVien.MaNV === data.MaNV && data.MaNV != NhanVienValue.MaNV
        ? true
        : false
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
        }
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
            placeholder="Nhập mã nhân viên"
            value={data.MaNV.toUpperCase()}
            onChange={(e) =>
              setData({ ...data, MaNV: e.target.value.toUpperCase() })
            }
          />
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
            value={moment(data.NgaySinh)}
            onChange={(e) => {
              if (e) setData({ ...data, NgaySinh: e });
            }}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" required>
          <Input
            placeholder="Nhập số điện thoại"
            value={data.SDT}
            onChange={(e) => {
              setData({ ...data, SDT: e.target.value });
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
            value={moment(data.NgayVaoLam)}
            onChange={(e) => {
              if (e) setData({ ...data, NgayVaoLam: e });
            }}
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
