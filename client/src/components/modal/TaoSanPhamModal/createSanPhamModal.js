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
} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { SettingOutlined, UploadOutlined } from "@ant-design/icons";

import { TaoSanPhamModalState$ } from "../../../redux/selectors/index.js";
import {
  hideTaoSanPhamModal,
  createSanPham,
  updateSanPham,
} from "../../../redux/actions/index.js";
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};
const validateMessages = {
  required: "${label} không được bỏ trống!",
  types: {
    number: "${label} không phải là số hợp lệ!",
  },
  number: {
    range: "${label} phải nằm trong khoảng từ ${min} đến ${max}",
  },
};

export default function TaoSanPhamModal({ currentId, setCurrentId }) {
  const [form] = Form.useForm();

  const [data, setData] = useState({
    MaSP: "",
    TenSP: "",
    MauSac: "",
    LoaiHang: "",
    Size: 0,
    GiaVon: 0,
    GiaBan: 0,
    TonKho: 0,
    TrangThai: 0,
    BaoHanh: 0,
    HinhAnh: "",
    MoTa: "",
  });

  const SanPhamValue = useSelector((state) =>
    state.SanPhams.data.find((SanPham) =>
      SanPham._id === currentId ? SanPham : null
    )
  );
  useEffect(() => {
    if (SanPhamValue) setData(SanPhamValue);
  }, [SanPhamValue]);
  const dispatch = useDispatch();

  const { isShow } = useSelector(TaoSanPhamModalState$);

  const handleCancel = React.useCallback(() => {
    dispatch(hideTaoSanPhamModal());
    // if (currentId) {
    // } else {
    //   form.resetFields();
    // }
    setCurrentId(null);
    setData({
      MaSP: "",
      TenSP: "",
      MauSac: "",
      LoaiHang: "",
      Size: 0,
      GiaVon: 0,
      GiaBan: 0,
      TonKho: 0,
      TrangThai: 0,
      BaoHanh: 0,
      HinhAnh: "",
      MoTa: "",
    });
  }, [dispatch]);

  const handleOk = React.useCallback(() => {
    if (currentId) {
      dispatch(updateSanPham.updateSanPhamRequest(data));
    } else {
      dispatch(createSanPham.createSanPhamRequest(data));
    }

    handleCancel();
  }, [data, dispatch, handleCancel]);

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
          name="MaSP"
          label="Mã hàng"
          tooltip="Mã hàng là thông tin duy nhất"
          rules={[
            { required: true, message: "Vui lòng nhập mã hàng" },
            {
              type: "string",
              min: 5,
              message: "Mã hàng phải có ít nhất 5 kí tự",
            },
          ]}
        >
          <Input
            placeholder="Nhập mã hàng"
            value={data.MaSP}
            onChange={(e) => setData({ ...data, MaSP: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="TenSP"
          label="Tên hàng"
          tooltip="Tên hàng là tên của sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập tên hàng" },
            {
              type: "string",
              min: 6,
              message: "Tên hàng phải có ít nhất 6 kí tự",
            },
          ]}
        >
          <Input
            placeholder="Nhập tên hàng"
            value={data.TenSP}
            onChange={(e) => setData({ ...data, TenSP: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="Size"
          label="Size"
          tooltip="Nhập kích cỡ cho sản phẩm"
          rules={[
            { type: "number", min: 0, max: 99 },
            { required: true, message: "Vui lòng nhập size" },
          ]}
        >
          <InputNumber
            value={data.Size}
            onChange={(e) => setData({ ...data, Size: e })}
            style={{ width: 120 }}
            placeholder="Nhập size"
          />
        </Form.Item>
        <Form.Item
          name="MauSac"
          label="Màu sắc"
          tooltip="Nhập màu sắc hoặc họa tiết sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập màu" },
            {
              type: "string",
              min: 2,
              message: "Màu sắc phải có ít nhất 2 kí tự",
            },
          ]}
        >
          <Input
            value={data.MauSac}
            onChange={(e) => setData({ ...data, MauSac: e.target.value })}
            placeholder="Nhập màu"
          />
        </Form.Item>
        <Form.Item
          name="LoaiHang"
          label="Loại hàng"
          tooltip="Nhập loại sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập loại hàng" },
            {
              type: "string",
              min: 6,
              message: "Loại hàng phải có ít nhất 6 kí tự",
            },
          ]}
        >
          <Input
            value={data.LoaiHang}
            onChange={(e) => setData({ ...data, LoaiHang: e.target.value })}
            placeholder="Nhập loại hàng"
          />
        </Form.Item>
        <Form.Item
          name="GiaVon"
          label="Giá vốn"
          tooltip="Giá vốn để tính lợi nhuận cho sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập giá vốn" },
            {
              type: "number",
              min: 0,
              max: 999999999,
            },
          ]}
        >
          <InputNumber
            value={data.GiaVon}
            onChange={(e) => setData({ ...data, GiaVon: e })}
            style={{ width: 120 }}
            placeholder="VNĐ"
          />
        </Form.Item>
        <Form.Item
          name="GiaBan"
          label="Giá bán"
          rules={[
            { required: true, message: "Vui lòng nhập giá bán" },
            {
              type: "number",
              min: 0,
              max: 999999999,
            },
          ]}
        >
          <InputNumber
            value={data.GiaBan}
            onChange={(e) => setData({ ...data, GiaBan: e })}
            style={{ width: 120 }}
            placeholder="VNĐ"
          />
        </Form.Item>
        <Form.Item
          name="TonKho"
          label="Tồn kho"
          tooltip="Số lượng tồn kho của sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng tồn kho" },
            {
              type: "number",
              min: 0,
              max: 100000000,
            },
          ]}
        >
          <InputNumber
            value={data.TonKho}
            onChange={(e) => setData({ ...data, TonKho: e })}
            style={{ width: 120 }}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item
          name="TrangThai"
          label="Trạng thái"
          tooltip="Trạng thái kinh doanh sản phẩm"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select
            placeholder="Chọn trạng thái"
            value={data.TrangThai}
            onChange={(e) => setData({ ...data, TrangThai: e })}
          >
            <Option value="Ngừng kinh doanh">Ngừng kinh doanh</Option>
            <Option value="Hết hàng">Hết hàng</Option>
            <Option value="Đang kinh doanh">Đang kinh doanh</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="BaoHanh"
          label="Bảo hành"
          tooltip="Trạng thái bảo hành của sản phẩm"
          rules={[{ required: true, message: "Vui lòng chọn bảo hành" }]}
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
        title="Thêm hàng hóa"
        visible={isShow}
        onCancel={handleCancel}
        onOk={handleOk}
        width={800}
      >
        {body}
      </Modal>
    </div>
  );
}
