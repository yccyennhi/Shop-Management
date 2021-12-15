import {
  Modal,
  Form,
  Select,
  Button,
  InputNumber,
  Input,
  Space,
  message,
  AutoComplete,
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
  DatabaseFilled,
} from "@ant-design/icons";
import {
  messageError,
  messageLoadingSuccess,
  messageSuccess,
} from "../../message";
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
      TrangThai: "Hết hàng",
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
      TrangThai: "Hết hàng",
      BaoHanh: "Có bảo hành",
      HinhAnh: "",
      MoTa: "",
    });
  }, [dispatch]);

  const handleOk = React.useCallback(() => {
    console.log(data);
    if (data.BaoHanh == "Có bảo hành" && data.ThoiGianBaoHanh < 1) {
      messageError("Vui lòng nhập thời gian bảo hành lớn hơn 0");
    } else if (data.GiaBan < 0 || data.Size < 0 || data.ThoiGianBaoHanh < 0) {
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
          messageSuccess("Cập nhật sản phẩm thành công!");
          handleCancel();
        }
      } else {
        let listSP = SP.find(function (e) {
          return e.MaSP === data.MaSP;
        });
        if (listSP) {
          messageError("Mã sản phẩm đã tồn tại!");
        } else {
          const d = data;
          d.TrangThai = "Hết hàng";
          if (d.BaoHanh == "Không bảo hành") d.ThoiGianBaoHanh = 0;
          dispatch(createSanPham.createSanPhamRequest(d));
          messageSuccess("Tạo mới sản phẩm thành công!");
          handleCancel();
        }
      }
    }
  }, [data, dispatch, handleCancel, messageLoadingSuccess]);
  
  const SPLoai = SP.map((data) => data.LoaiHang);
  const SPLoais = SPLoai.filter((item, index) => (
    SPLoai.indexOf(item) === index));
  const optionsLoaiSP = SPLoais.map((data) => {
    var o = Object.assign({});
    o.value = data;
    o.label = `${data}`;
    return o;
  });
  const SPMau = SP.map((data) => data.MauSac);
  const SPMaus = SPMau.filter((item, index) => (
  SPMau.indexOf(item) === index));
  const optionsMau = SPMaus.map((data) => {
    var o = Object.assign({});
    o.value = data;
    o.label = `${data}`;
    return o;
  });


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
          {/* <Input
            value={data.MauSac}
            defaultValue={data.MauSac}
            onChange={(e) => setData({ ...data, MauSac: e.target.value })}
            placeholder="Nhập màu"
          /> */}
          <AutoComplete
            dropdownClassName="certain-category-search-dropdown"
            options={optionsMau}
            value={data.MauSac}
            filterOption
            onSelect={(e) => {
              setData({ ...data, MauSac: e });
            }}
          >
            <Input.Search
              allowClear
              size="medium"
              placeholder="Nhập màu sắc sản phẩm"
              onChange={(e)=>setData({ ...data, MauSac: e.target.value })}
              value={data.MauSac}
            />
          </AutoComplete>
        </Form.Item>
        <Form.Item label="Loại sản phẩm" tooltip="Nhập loại sản phẩm" required>
          {/* <Input
            allowClear
            value={data.LoaiHang}
            defaultValue={data.LoaiHang}
            onChange={(e) => setData({ ...data, LoaiHang: e.target.value })}
            placeholder="Nhập loại sản phẩm"
          /> */}
          <AutoComplete
            dropdownClassName="certain-category-search-dropdown"
            options={optionsLoaiSP}
            value={data.LoaiHang}
            filterOption
            onSelect={(e) => {
              setData({ ...data, LoaiHang: e });
            }}
          >
            <Input.Search
              allowClear
              size="medium"
              placeholder="Nhập loại sản phẩm"
              value={data.LoaiHang}
              onChange={(e)=>setData({ ...data, LoaiHang: e.target.value })}
            />
          </AutoComplete>
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
            disabled={
              currentId == null
                ? true
                : data.TrangThai == "Hết hàng"
                ? true
                : false
            }
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
          defaultValue={
            data.BaoHanh == "Có bảo hành" ? data.ThoiGianBaoHanh : 0
          }
          tooltip="Số tháng bảo hành của sản phẩm"
        >
          <InputNumber
            disabled={data.BaoHanh !== "Có bảo hành"}
            value={data.BaoHanh == "Có bảo hành" ? data.ThoiGianBaoHanh : 0}
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
        title={currentId ? "Câp nhật sản phẩm" : "Thêm sản phẩm"}
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
