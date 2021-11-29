import {
  Modal,
  Form,
  Select,
  Button,
  InputNumber,
  Input,
  Space,
  message,
  Upload,
  Row,
} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { messageError, messageLoadingSuccess } from "../../message";
import {
  TaoSanPhamModalState$,
  SanPhamsState$,
} from "../../../redux/selectors/index.js";
import {
  hideTaoSanPhamModal,
  createSanPham,
  updateSanPham,
} from "../../../redux/actions/index.js";
const { Option } = Select;

const validateMessages = {
  required: "${label} không được bỏ trống!",
  types: {
    number: "${label} không phải là số hợp lệ!",
  },
  number: {
    range: "${label} phải nằm trong khoảng từ ${min} đến ${max}",
  },
};

export default function SanPhamModal({ currentId, setCurrentId }) {
  const [trangthai, setTrangthai] = useState(false);
  const { isShow } = useSelector(TaoSanPhamModalState$);
  const [form] = Form.useForm();
  const SP = useSelector(SanPhamsState$);
  const [data, setData] = useState({
    // MaSP: "",
    // TenSP: "",
    // MauSac: "",
    // LoaiHang: "",
    // Size: 0,
    // GiaVon: 0,
    // GiaBan: 0,
    // TonKho: 0,
    // TrangThai: "Hết hàng",
    // BaoHanh: "Có bảo hành",
    // HinhAnh: "",
    // MoTa: "",
  });
  const SanPhamValue = useSelector((state) =>
    state.SanPhams.data.find((SanPham) =>
      SanPham._id === currentId ? SanPham : null
    )
  );
  useEffect(() => {
    form.resetFields();
    setData({
      MaSP: "",
      TenSP: "",
      MauSac: "",
      LoaiHang: "",
      Size: 0,
      GiaVon: 0,
      GiaBan: 0,
      TonKho: 0,
      TrangThai: "Hết hàng",
      BaoHanh: "Có bảo hành",
      HinhAnh: "",
      MoTa: "",
    });
    if (SanPhamValue) setData(SanPhamValue);
    if (data.TonKho > 0) setTrangthai(true);
  }, [SanPhamValue]);
  const dispatch = useDispatch();

  const handleCancel = React.useCallback(() => {
    setTrangthai(false);
    dispatch(hideTaoSanPhamModal());
    // if (currentId) {
    // } else {
    form.resetFields();
    // }

    if (currentId) {
      setCurrentId(null);
    }
    setData({
      MaSP: "",
      TenSP: "",
      MauSac: "",
      LoaiHang: "",
      Size: 0,
      GiaVon: 0,
      GiaBan: 0,
      TonKho: 0,
      TrangThai: "Hết hàng",
      BaoHanh: "Có bảo hành",
      HinhAnh: "",
      MoTa: "",
    });

    // form.resetFields();
  }, [dispatch]);

  const handleReset = React.useCallback(() => {
    if (data.TonKho > 0) {
      setTrangthai(true);
    } else {
      setTrangthai(false);
    }
    form.resetFields();
    setData({
      MaSP: "",
      TenSP: "",
      MauSac: "",
      LoaiHang: "",
      Size: 0,
      GiaVon: 0,
      GiaBan: 0,
      TonKho: 0,
      TrangThai: "Hết hàng",
      BaoHanh: "Có bảo hành",
      HinhAnh: "",
      MoTa: "",
    });
  }, [dispatch]);

  const handleOk = React.useCallback(() => {
    if (
      data.GiaBan < 0 ||
      data.GiaVon < 0 ||
      data.Size < 0 ||
      data.TonKho < 0
    ) {
      messageError("Vui lòng nhập đúng thông tin!");
    } else if (
      data.MaSP == "" ||
      data.TenSP == "" ||
      data.MauSac == "" ||
      data.LoaiHang == "" ||
      data.GiaBan == "" ||
      data.GiaBan == ""
    ) {
      messageError("Vui lòng nhập đầy đủ thông tin");
    } else {
      if (currentId) {
        //messageLoadingSuccess("Cập nhật sản phẩm");
        let listSP = SP.find(function (e) {
          return e.MaSP === data.MaSP && e.MaSP != SanPhamValue.MaSP;
        });
        if (listSP) {
          messageError("Mã sản phẩm đã tồn tại!");
        } else {
          dispatch(updateSanPham.updateSanPhamRequest(data));
          handleCancel();
        }
      } else {
        let listSP = SP.find(function (e) {
          return e.MaSP === data.MaSP;
        });
        if (listSP) {
          messageError("Mã sản phẩm đã tồn tại!");
        } else {
          dispatch(createSanPham.createSanPhamRequest(data));
          handleCancel();
        }
      }
    }
  }, [data, dispatch, handleCancel, messageLoadingSuccess]);

  const body = (
    <>
      <Form
        // {...formItemLayout}
        validateMessages={validateMessages}
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 50,
        }}
        layout="horizontal"
      >
        <Form.Item
          label="Mã hàng"
          tooltip="Mã hàng là thông tin duy nhất"
          required
        >
          <Input
            placeholder="Nhập mã hàng"
            value={data.MaSP}
            onChange={(e) => setData({ ...data, MaSP: e.target.value })}
            defaultValue={data.MaSP}
          />
        </Form.Item>
        <Form.Item
          label="Tên hàng"
          tooltip="Tên hàng là tên của sản phẩm"
          required
        >
          <Input
            placeholder="Nhập tên hàng"
            value={data.TenSP}
            onChange={(e) => setData({ ...data, TenSP: e.target.value })}
            defaultValue={data.TenSP}
          />
        </Form.Item>
        <Form.Item label="Size" tooltip="Nhập kích cỡ cho sản phẩm" required>
          <InputNumber
            value={data.Size}
            onChange={(e) => setData({ ...data, Size: e })}
            style={{ width: 120 }}
            placeholder="Nhập size"
            defaultValue={data.Size}
          />
        </Form.Item>
        <Form.Item
          label="Màu sắc"
          tooltip="Nhập màu sắc hoặc họa tiết sản phẩm"
          required
        >
          <Input
            value={data.MauSac}
            defaultValue={data.MauSac}
            onChange={(e) => setData({ ...data, MauSac: e.target.value })}
            placeholder="Nhập màu"
          />
        </Form.Item>
        <Form.Item label="Loại hàng" tooltip="Nhập loại sản phẩm" required>
          <Input
            value={data.LoaiHang}
            defaultValue={data.LoaiHang}
            onChange={(e) => setData({ ...data, LoaiHang: e.target.value })}
            placeholder="Nhập loại hàng"
          />
        </Form.Item>
        <Form.Item
          label="Giá vốn"
          tooltip="Giá vốn được cập nhật tự động khi nhập hàng"
        >
          <InputNumber
            value={data.GiaVon}
            defaultValue={data.GiaVon}
            disabled={true}
            onChange={(e) => setData({ ...data, GiaVon: e })}
            style={{ width: 120 }}
            placeholder="VNĐ"
          />
        </Form.Item>
        <Form.Item label="Giá bán" required>
          <InputNumber
            value={data.GiaBan}
            defaultValue={data.GiaBan}
            onChange={(e) => setData({ ...data, GiaBan: e })}
            style={{ width: 120 }}
            placeholder="VNĐ"
          />
        </Form.Item>
        <Form.Item
          label="Tồn kho"
          tooltip="Số lượng tồn kho của sản phẩm"
        >
          <InputNumber
            value={data.TonKho}
            onChange={(e) => {
              // setData({ ...data, TonKho: e });
              if (e <= 0) {
                console.log(trangthai);
                setData({ ...data, TonKho: e, TrangThai: "Hết hàng" });
                setTrangthai(false);
              } else {
                console.log(trangthai);
                setData({ ...data, TonKho: e, TrangThai: "Đang kinh doanh" });
                setTrangthai(true);
              }
            }}
            defaultValue={data.TonKho}
            style={{ width: 120 }}
          />
        </Form.Item>
        <Form.Item label="Trạng thái" tooltip="Trạng thái kinh doanh sản phẩm">
          <Select
            disabled={!trangthai}
            placeholder="Chọn trạng thái"
            value={data.TrangThai}
            onChange={(e) => setData({ ...data, TrangThai: e })}
            defaultValue={data.TrangThai}
          >
            <Option value="Ngừng kinh doanh">Ngừng kinh doanh</Option>
            <Option value="Đang kinh doanh">Đang kinh doanh</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Bảo hành"
          defaultValue={data.BaoHanh}
          tooltip="Trạng thái bảo hành của sản phẩm"
        >
          <Select
            placeholder="Chọn bảo hành"
            value={data.BaoHanh}
            onChange={(e) => setData({ ...data, BaoHanh: e })}
          >
            <Option value="Không bảo hành">Không bảo hành</Option>
            <Option value="Có bảo hành">Có bảo hành</Option>
          </Select>
        </Form.Item>
        <Form.Item name="MoTa" label="Mô tả">
          <Input
            value={data.MoTa}
            defaultValue={data.MoTa}
            onChange={(e) => setData({ ...data, MoTa: e.target.value })}
            placeholder="Nhập mô tả"
          />
        </Form.Item>
        <Form.Item
          name="HinhAnh"
          label="Hình ảnh"
          tooltip="Hình ảnh của sản phẩm"
        >
          <FileBase64
            accept="image/*"
            multiple={false}
            type="file"
            defaultValue={data.HinhAnh}
            value={data.HinhAnh}
            onDone={({ base64 }) => setData({ ...data, HinhAnh: base64 })}
          />
        </Form.Item>
      </Form>
    </>
  );
  return (
    <div>
      <Modal
        title={currentId ? "Câp nhật hàng hóa" : "Thêm hàng hóa"}
        visible={isShow}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="reset" onClick={handleReset}>
            Reset
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        width={800}
      >
        {body}
      </Modal>
    </div>
  );
}
