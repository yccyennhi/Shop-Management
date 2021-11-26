import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportTableButton, Table } from "ant-table-extensions";
import { useHistory } from "react-router-dom";
import {
  Layout,
  PageHeader,
  Card,
  DatePicker,
  Space,
  Select,
  InputNumber,
  Radio,
  Button,
  Input,
  Form,
  Typography,
  Image,
  Divider,
  Row,
  Col,
  AutoComplete,
  Tooltip,
} from "antd";
import "./styles.css";
import moment from "moment";
import "../../App.css";
import {
  SafetyCertificateTwoTone,
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import * as actions from "../../redux/actions";
import PhieuNhaptable from "../../components/table/PhieuNhaptable/PhieuNhaptable";
import {
  PhieuNhapsState$,
  isloadingPhieuNhapsState$,
  SanPhamsState$,
  ThemPhieuNhapPageState$,
} from "../../redux/selectors";
import SanPhamModal from "../../components/modal/SanPhamModal/SanPhamModal";

import ThemPhieuNhaptable from "../../components/table/ThemPhieuNhaptable/ThemPhieuNhaptable";
import { messageError, messageSuccess } from "../../components/message";
const { Text } = Typography;
const { Content, Sider } = Layout;
const { Search } = Input;

const { OptGroup, Option } = AutoComplete;
export default function ThemPhieuNhapPage({}) {
  const [currentId, setCurrentId] = useState(null);
  const [MaSP, setMaSP] = useState(null);
  const [CanTra, setCanTra] = useState(0);
  const dateNow = moment().toDate();
  const SP = useSelector(SanPhamsState$);
  const PN = useSelector(PhieuNhapsState$);
  const id = useSelector(ThemPhieuNhapPageState$);
  const history = useHistory();
  const handleNhapHang = () => {
    history.push("/PhieuNhaps");
  };
  const [dataSource, setDataSource] = useState([
    {
      MaSP: "",
      TenSP: "",
      MauSac: "",
      Size: "",
      LoaiHang: "",
      SoLuong: 0,
      GiamGia: 0,
      GiaNhap: 0,
      ThanhTien: 0,
    },
  ]);

  const [data, setData] = useState({
    MaPN: "",
    MaSP: [],
    NguoiNhap: "",
    NguoiTao: "",
    NgayTao: new Date(Date.now()),
    NgayCapNhat: new Date(Date.now()),
    TenNCC: "",
    SoLuong: [],
    GiaNhap: [],
    ThanhTien: [],
    GiamGia: [],
    GiamGiaTongTien: 0,
    TongSoLuong: 0,
    TongTien: 0,
    TienTra: 0,
    TrangThai: "Phiếu tạm",
    GhiChu: "",
  });
  const PhieuNhapValue = useSelector((state) =>
    state.PhieuNhaps.data.find((PhieuNhap) =>
      PhieuNhap.MaPN === id.payload ? PhieuNhap : null
    )
  );
  useEffect(() => {
    if (PhieuNhapValue != undefined) {
      setData(PhieuNhapValue);
    }
    console.log("pnv", data);
  }, [ PhieuNhapValue]);
  // React.useEffect(() => {
  //   console.log("datâPge", data);
  // }, [data]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);

  const openCreateSanPhamModal = React.useCallback(() => {
    dispatch(actions.showTaoSanPhamModal());
  }, [dispatch]);

  const onHoanThanh = React.useCallback(() => {
    if (
      data.MaPN == "" ||
      data.NguoiNhap == "" ||
      data.NguoiTao == "" ||
      data.TenNCC == "" ||
      data.TongSoLuong == 0
    ) {
      messageError("Vui lòng nhập đầy đủ thông tin!");
    } else {
      let PhieuNhap = PN.find(function (e) {
        return e.MaPN == data.MaPN;
      });
      if (id.payload == "") {
        if (PhieuNhap != undefined) {
          messageError("Mã phiếu nhập đã tồn tại!");
        } else {
          dispatch(actions.createPhieuNhap.createPhieuNhapRequest(data));
        }
      } else {
        dispatch(actions.updatePhieuNhap.updatePhieuNhapRequest(data));
        // messageSuccess("Cập nhật nhập hàng thành công!");
      }
    }
  }, [data, dispatch]);
  
  useEffect(() => {}, [data]);

  React.useEffect(() => {
    const MaSanPham = dataSource.map((data) => data.MaSP);
    const TenSP = dataSource.map((data) => data.TenSP);
    const MauSac = dataSource.map((data) => data.MauSac);
    const Size = dataSource.map((data) => data.Size);
    const LoaiHang = dataSource.map((data) => data.LoaiHang);
    const SoLuong = dataSource.map((data) => data.SoLuong);
    let TongSoLuong = dataSource.reduce((sum, data) => {
      return (sum += data.SoLuong);
    }, 0);
    const GiaNhap = dataSource.map((data) => data.GiaNhap);
    const GiamGia = dataSource.map((data) => data.GiamGia);
    const ThanhTien = dataSource.map((data) => data.ThanhTien);
    let TongTien = dataSource.reduce((sum, data) => {
      return (sum += data.ThanhTien);
    }, 0);
    setCanTra(TongTien - data.GiamGiaTongTien);
    setData({
      ...data,
      NgayCapNhat: dateNow,
      MaSP: MaSanPham,
      TenSP: TenSP,
      MauSac: MauSac,
      Size: Size,
      GiamGia: GiamGia,
      LoaiHang: LoaiHang,
      SoLuong: SoLuong,
      GiaNhap: GiaNhap,
      ThanhTien: ThanhTien,
      TongSoLuong: TongSoLuong,
      TongTien: TongTien,
    });
  }, [dataSource]);

  React.useEffect(() => {}, [data]);

  const onLuuTam = React.useCallback(() => {}, [dispatch]);

  const options = SP.map((data) => {
    var o = Object.assign({});
    o.value = data.MaSP;
    o.label = `${data.MaSP}: ${data.TenSP}. Giá bán: ${data.GiaBan}. Tồn kho: ${data.TonKho}`;
    return o;
  });

  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  const { selectedRowKeys, loading } = select;

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelect({
        ...select,
        selectedRowKeys: selectedRowKeys,
      });
    },
  };

  return (
    <Layout>
      <Layout>
        <PageHeader
          onBack={() => window.history.back()}
          className="site-page-header"
          title={id.payload == "" ? "Thêm phiếu nhập" : "Cập nhật phiếu nhập"}
        />
      </Layout>
      <Layout>
        <Content>
          <Layout style={{ padding: "0px 24px 24px" }}>
            <div
              className="site-layout-content"
              style={{ padding: "0px 24px 24px 24px" }}
            >
              <PageHeader title="Thêm sản phẩm muốn nhập" />
              <Row justify="start">
                <Tooltip
                  placement="topRight"
                  title="Nhập mã sản phẩm cần tìm và chọn sản phẩm trong danh sách đổ xuống để thêm vào phiếu nhập, nếu chưa có vui lòng tạo mới sản phẩm!"
                >
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    style={{
                      width: 250,
                    }}
                    dropdownMatchSelectWidth={500}
                    style={{ width: "880px" }}
                    options={options}
                    filterOption
                    onSelect={(e) => {
                      setMaSP(e);
                    }}
                  >
                    <Input.Search
                      size="medium"
                      placeholder="Nhập mã sản phẩm muốn nhập kho"
                    />
                  </AutoComplete>
                </Tooltip>
                <Tooltip title="Thêm mới sản phẩm">
                  <Button
                    style={{
                      marginLeft: "10px",
                    }}
                    icon={<PlusOutlined />}
                    size="medium"
                    onClick={openCreateSanPhamModal}
                  />
                </Tooltip>
              </Row>
              <Divider orientation="left"></Divider>
              <ThemPhieuNhaptable MaSP={MaSP} id={id} setData={setDataSource} />
            </div>
            <SanPhamModal currentId={currentId} setCurrentId={setCurrentId} />
          </Layout>
        </Content>
        <Sider
          width={500}
          style={{ padding: "0px 24px 0px 24px" }}
          className="site-layout-sider"
        >
          <div
            className="site-layout-content"
            style={{ padding: "0px 24px 24px 24px" }}
          >
            <PageHeader title="Thông tin phiếu nhập" />
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              layout="horizontal"
            >
              <Form.Item
                tooltip="Ngày tạo phiếu nhập là mặc định"
                label="Ngày tạo phiếu"
              >
                <DatePicker
                  defaultValue={moment(data.NgayTao)}
                  value={moment(data.NgayTao)}
                  disabled={true}
                  onChange={(e) => {
                    if (e) setData({ ...data, NgayTao: dateNow });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Mã phiếu nhập"
                tooltip="Mã phiếu nhập là thông tin duy nhất"
                required
              >
                <Input
                  placeholder="Nhập mã phiếu nhập"
                  value={data.MaPN}
                  onChange={(e) => setData({ ...data, MaPN: e.target.value })}
                  defaultValue={data.MaPN}
                  disabled={id.payload == "" ? false : true}
                />
              </Form.Item>
              <Form.Item label="Người tạo phiếu" required>
                <Input
                  placeholder="Nhập người tạo phiếu"
                  value={data.NguoiTao}
                  onChange={(e) =>
                    setData({ ...data, NguoiTao: e.target.value })
                  }
                  defaultValue={data.NguoiTao}
                />
              </Form.Item>
              <Form.Item
                label="Người nhập"
                tooltip="Người nhập hàng đến từ NCC"
                required
              >
                <Input
                  placeholder="Nhập người nhập"
                  value={data.NguoiNhap}
                  onChange={(e) =>
                    setData({ ...data, NguoiNhap: e.target.value })
                  }
                  defaultValue={data.NguoiNhap}
                />
              </Form.Item>
              <Form.Item
                label="Nhà cung cấp"
                tooltip="Tên nhà cung cấp"
                required
              >
                <Input
                  placeholder="Nhập nhà cung cấp"
                  value={data.TenNCC}
                  onChange={(e) => setData({ ...data, TenNCC: e.target.value })}
                  defaultValue={data.TenNCC}
                />
              </Form.Item>
              <Form.Item tooltip="Trạng thái phiếu nhập" label="Trạng thái">
                <Select
                  placeholder="Trạng thái"
                  disabled={true}
                  value={data.TrangThai}
                  defaultValue={data.TrangThai}
                >
                  <Option value="Phiếu tạm">Phiếu tạm</Option>
                  <Option value="Đã nhập hàng">Đã nhập hàng</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Ghi chú">
                <Input
                  value={data.GhiChu}
                  onChange={(e) => setData({ ...data, GhiChu: e.target.value })}
                  defaultValue={data.GhiChu}
                />
              </Form.Item>
              <Form.Item label="Số lượng SP">
                <InputNumber
                  style={{ width: 270 }}
                  disabled="true"
                  value={data.TongSoLuong}
                  defaultValue={data.TongSoLuong}
                />
              </Form.Item>

              <Form.Item label="Tổng tiền hàng">
                <InputNumber
                  style={{ width: 270 }}
                  disabled="true"
                  value={data.TongTien}
                  defaultValue={data.TongTien}
                />
              </Form.Item>
              <Form.Item
                tooltip="Số tiền được giảm"
                label="Giảm giá"
                tooltip="Giảm giá trên tổng số tiền"
              >
                <InputNumber
                  style={{ width: 270 }}
                  placeholder="Nhập số tiền được giảm"
                  value={data.GiamGiaTongTien}
                  defaultValue={data.GiamGiaTongTien}
                  onChange={(e) => {
                    setData({ ...data, GiamGiaTongTien: e });
                    setCanTra(data.TongTien - e);
                  }}
                />
              </Form.Item>
              <Form.Item label="Cần trả NCC">
                <InputNumber
                  style={{ width: 270 }}
                  tooltip="Cần trả cho NCC"
                  disabled={true}
                  value={CanTra}
                  defaultValue={CanTra}
                />
              </Form.Item>

              <Form.Item label="Tiền trả NCC">
                <InputNumber
                  style={{ width: 270 }}
                  tooltip="Tiền đã trả cho NCC"
                  value={data.TienTra}
                  defaultValue={data.TienTra}
                  onChange={(e) => setData({ ...data, TienTra: e })}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    setData({ ...data, TrangThai: "Đã nhập hàng" });
                    
                    onHoanThanh();
                  }}
                >
                  Hoàn thành
                </Button>
                <Button htmlType="button">Lưu tạm</Button>
              </Form.Item>
            </Form>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}
