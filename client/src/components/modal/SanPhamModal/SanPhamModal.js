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
import {
  SettingOutlined,
  UploadOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
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
  const [data, setData] = useState({});
  const SanPhamValue = useSelector((state) =>
    state.SanPhams.data.find((SanPham) =>
      SanPham._id === currentId ? SanPham : null
    )
  );
  useEffect(() => {
    if (SanPhamValue) setData(SanPhamValue);
    if (SanPhamValue && data.TonKho == 0) setTrangthai(false);
  }, [SanPhamValue]);

  const dispatch = useDispatch();

  const RandomMa = React.useCallback(() => {
    if (data.MaSP == "" || data.MaSP == undefined) {
      let SanPham;
      do {
        const min = 1000000;
        const max = 9999999;
        const rand = min + Math.random() * (max - min);
        const Ma = "MA" + Math.round(rand);
        setData({ ...data, MaSP: Ma });
        console.log(Ma);
        SanPham = SP.find((data) => data.MaSP == Ma);
      } while (SanPham !== undefined);
    }
  }, [dispatch, data]);

  const handleCancel = React.useCallback(() => {
    setTrangthai(false);
    setCurrentId(null);
    dispatch(hideTaoSanPhamModal());
    if (currentId) {
      setCurrentId(null);
      form.resetFields();
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
      ThoiGianBaoHanh: 0,
      TrangThai: "Đang kinh doanh",
      BaoHanh: "Có bảo hành",
      HinhAnh: "",
      MoTa: "",
    });
  }, [dispatch]);

  const handleReset = React.useCallback(() => {
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
      ThoiGianBaoHanh: 0,
      TrangThai: "Đang kinh doanh",
      BaoHanh: "Có bảo hành",
      HinhAnh: "",
      MoTa: "",
    });
  }, [dispatch]);

  const handleOk = React.useCallback(() => {
    console.log(data);
    if (data.BaoHanh == "Có bảo hành" && data.ThoiGianBaoHanh < 1)
    {messageError("Vui lòng nhập thời gian bảo hành lớn hơn 0")}
    else
    if (
      data.GiaBan < 0 ||
      data.Size < 0 ||
      data.ThoiGianBaoHanh < 0 ) {
      messageError("Vui lòng nhập đúng thông tin");
    } else if (
      data.MaSP == "" ||
      data.TenSP == "" ||
      data.MauSac == "" ||
      data.LoaiHang == "" ||
      data.GiaBan == ""
    ) {
      messageError("Vui lòng nhập đầy đủ thông tin");
    } else {
      if (currentId) {
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
        validateMessages={validateMessages}
        form={form}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 30,
        }}
        layout="horizontal"
      >
        <Form.Item
          label="Mã sản phẩm"
          tooltip="Mã sản phẩm là thông tin duy nhất"
          required
          disabled={currentId == null ? false : true}
        >
          <Input.Group compact>
            <Input
              allowClear
              style={{ width: "calc(100% - 31px)" }}
              placeholder="Nhập mã sản phẩm"
              value={data.MaSP}
              onChange={(e) => setData({ ...data, MaSP: e.target.value })}
              defaultValue={data.MaSP}
              disabled={currentId == null ? false : true}
            />
            <Button icon={<RetweetOutlined />} onClick={RandomMa} />
          </Input.Group>
        </Form.Item>
        {/* <Form.Item
          label="Mã sản phẩm"
          tooltip="Mã sản phẩm là thông tin duy nhất"
          required
        >
          <Input
            placeholder="Nhập mã sản phẩm"
            value={data.MaSP}
            onChange={(e) => setData({ ...data, MaSP: e.target.value })}
            defaultValue={data.MaSP}
          />
        </Form.Item> */}
        <Form.Item
          label="Tên sản phẩm"
          tooltip="Tên sản phẩm là tên hàng hóa"
          required
        >
          <Input
            allowClear
            placeholder="Nhập tên sản phẩm"
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
        <Form.Item label="Loại sản phẩm" tooltip="Nhập loại sản phẩm" required>
          <Input
            allowClear
            value={data.LoaiHang}
            defaultValue={data.LoaiHang}
            onChange={(e) => setData({ ...data, LoaiHang: e.target.value })}
            placeholder="Nhập loại sản phẩm"
          />
        </Form.Item>
        {/* <Form.Item
          label="Giá vốn"
          tooltip="Giá vốn để tính lợi nhuận cho sản phẩm, sẽ được cập nhật tự động khi nhập hàng"
          required
        >
          <InputNumber
            value={data.GiaVon}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            defaultValue={data.GiaVon}
            onChange={(e) => setData({ ...data, GiaVon: e })}
            style={{ width: 120 }}
            placeholder="VNĐ"
          />
        </Form.Item> */}
        <Form.Item label="Giá bán" required>
          <InputNumber
            value={data.GiaBan}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            defaultValue={data.GiaBan}
            onChange={(e) => setData({ ...data, GiaBan: e })}
            style={{ width: 120 }}
            placeholder="VNĐ"
          />
        </Form.Item>
        {/* <Form.Item
          label="Tồn kho"
          tooltip="Số lượng tồn kho của sản phẩm"
          required
        >
          <InputNumber
            value={data.TonKho}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
        </Form.Item> */}
        <Form.Item label="Trạng thái" tooltip="Trạng thái kinh doanh sản phẩm">
          <Select
            disabled={data.TrangThai == "Hết hàng"}
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
        <Form.Item
          label="Thời gian bảo hành"
          defaultValue={data.ThoiGianBaoHanh}
          tooltip="Số tháng bảo hành của sản phẩm"
        >
          <InputNumber
            disabled={data.BaoHanh !== "Có bảo hành"}
            value={data.ThoiGianBaoHanh}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            onChange={(e) => {
              setData({ ...data, ThoiGianBaoHanh: e });
            }}
            defaultValue={data.TonKho}
            style={{ width: 120 }}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            allowClear
            value={data.MoTa}
            defaultValue={data.MoTa}
            onChange={(e) => setData({ ...data, MoTa: e.target.value })}
            placeholder="Nhập mô tả"
          />
        </Form.Item>
        <Form.Item label="Hình ảnh" tooltip="Hình ảnh của sản phẩm">
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
