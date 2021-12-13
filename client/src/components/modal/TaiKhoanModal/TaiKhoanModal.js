import { Form, Input, Modal } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNhanViens,
  hideTaiKhoanModal,
  updateTaiKhoan,
} from "../../../redux/actions";
import {
  NhanViensState$,
  TaiKhoanModalState$,
  TaiKhoansState$,
} from "../../../redux/selectors";
import { AuthContext } from "../../../contexts/AuthContext";
import { messageError } from "../../message";

export default function TaiKhoanModal() {
  const dispatch = useDispatch();

  //context
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);

  //#region data
  useEffect(() => {
    dispatch(getNhanViens.getNhanViensRequest());
  }, [dispatch]);

  const NhanViens = useSelector(NhanViensState$);

  const NhanVienValue = TaiKhoan
    ? NhanViens.find((NhanVien) =>
        NhanVien._id === TaiKhoan.MaNV ? NhanVien : null
      )
    : null;

  const [data, setData] = useState({
    MaNV: "",
    TenNV: "",
    TenTK: "",
    MatKhau: "",
    newMatKhau: "",
    confirmedMatKhau: "",
  });

  useEffect(() => {
    if (NhanVienValue) {
      setData({
        ...data,
        MaNV: NhanVienValue.MaNV,
        TenNV: NhanVienValue.TenNV,
        TenTK: TaiKhoan.TenTK,
      });
    }
  }, [data, NhanVienValue]);
  //#endregion

  //#region Form handle
  const [form] = Form.useForm();

  const { isShow } = useSelector(TaiKhoanModalState$);

  const checkData = () => {
    if (!data.MatKhau) {
      messageError("Chưa nhập mật khẩu");
      return false;
    }
    if (!data.newMatKhau) {
      messageError("Chưa nhập mật khẩu mới");
      return false;
    }
    if (!data.confirmedMatKhau) {
      messageError("Chưa nhập mật khẩu mới");
      return false;
    }
    if (data.newMatKhau !== data.confirmedMatKhau) {
      messageError("Xác nhận mật khẩu mới không đúng");
      return false;
    }
    return true;
  };

  const onClose = useCallback(() => {
    dispatch(hideTaiKhoanModal());
    setData({
      ...data,
      MaNV: NhanVienValue.MaNV,
      TenNV: NhanVienValue.TenNV,
      TenTK: TaiKhoan.TenTK,
      MatKhau: "",
      newMatKhau: "",
      confirmedMatKhau: "",
    });
  }, [data, dispatch]);

  const onSubmit = useCallback(() => {
    if (checkData()) {
      dispatch(updateTaiKhoan.updateTaiKhoanRequest(data));
      onClose();
    }
  }, [data, dispatch, onClose, checkData]);
  //#endregion

  //#region Form body
  const body = (
    <>
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 50 }}
        layout="horizontal"
      >
        <Form.Item label="Mã nhân viên" required>
          <Input
            readOnly={true}
            bordered={false}
            value={data.MaNV.toUpperCase()}
          />
        </Form.Item>
        <Form.Item label="Tên nhân viên" required>
          <Input readOnly={true} bordered={false} value={data.TenNV} />
        </Form.Item>
        <Form.Item label="Tên tài khoản" required>
          <Input
            readOnly={true}
            bordered={false}
            value={data.TenTK.toUpperCase()}
          />
        </Form.Item>
        <Form.Item label="Mật khẩu" required>
          <Input.Password
            placeholder="Nhập mật khẩu"
            value={data.MatKhau}
            onChange={(e) => {
              setData({ ...data, MatKhau: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Mật khẩu mới" required>
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            value={data.newMatKhau}
            onChange={(e) => {
              setData({ ...data, newMatKhau: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu mới" required>
          <Input.Password
            placeholder="Nhập xác nhận mật khẩu mới"
            value={data.confirmedMatKhau}
            onChange={(e) => {
              setData({ ...data, confirmedMatKhau: e.target.value });
            }}
          />
        </Form.Item>
      </Form>
    </>
  );
  //#endregion

  return (
    <div>
      <Modal
        title="Thông tin tài khoản"
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
