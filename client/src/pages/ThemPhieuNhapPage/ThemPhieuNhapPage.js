import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Layout,
  PageHeader,
  DatePicker,
  Select,
  InputNumber,
  Button,
  Input,
  Form,
  Divider,
  Row,
  AutoComplete,
  Tooltip,
} from "antd";
import { AuthContext } from "../../contexts/AuthContext";
import "./styles.css";
import moment from "moment";
import "../../App.css";
import { PlusOutlined, RetweetOutlined } from "@ant-design/icons";
import * as actions from "../../redux/actions";
import {
  PhieuNhapsState$,
  SanPhamsState$,
  ThemPhieuNhapPageState$,
  ArrHangHoaNhapState$,
  NhanViensState$,
} from "../../redux/selectors";
import SanPhamModal from "../../components/modal/SanPhamModal/SanPhamModal";

import ThemPhieuNhaptable from "../../components/table/ThemPhieuNhaptable/ThemPhieuNhaptable";
import { messageError, messageSuccess } from "../../components/message";
import Menubar from "../../components/header/Menubar/Menubar";
const { Content, Sider, Header } = Layout;

const { Option } = AutoComplete;
export default function ThemPhieuNhapPage({}) {
  const [currentId, setCurrentId] = useState(null);
  const [MaAuto, setMaAuto] = useState("");
  const [MaSP, setMaSP] = useState(null);
  const [CanTra, setCanTra] = useState(0);
  const [NhanVien, setNhanVien] = useState();
  const dateNow = moment().toDate();
  const SP = useSelector(SanPhamsState$);
  const NV = useSelector(NhanViensState$);
  const PN = useSelector(PhieuNhapsState$);
  const id = useSelector(ThemPhieuNhapPageState$);
  const Arr = useSelector(ArrHangHoaNhapState$);

  const history = useHistory();
  const handleNhapHang = () => {
    history.push("/PhieuNhaps");
  };
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);
  React.useEffect(() => {
    setNhanVien(NV.find((nv) => nv._id === TaiKhoan.MaNV));
  }, [TaiKhoan, NV]);

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
    NguoiTao: NhanVien?.TenNV,
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
  }, [PhieuNhapValue]);

  const dispatch = useDispatch();

  const RandomMa = React.useCallback(() => {
    let PhieuNhap;
    do {
      const min = 1000000;
      const max = 9999999;
      const rand = min + Math.random() * (max - min);
      const Ma = "PN" + Math.round(rand);
      setMaAuto(Ma);
      setData({ ...data, MaPN: Ma });
      PhieuNhap = PN.find((data) => data.MaPN == Ma);
    } while (PhieuNhap !== undefined);
  }, [dispatch, data]);

  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
    if (Arr != null) {
      if (Arr?.arr?.payload?.length > 0) {
        let listSP = SP.find((e) => e._id == Arr?.arr?.payload[0]);
        setMaSP(listSP?.MaSP);
        const move = Arr?.arr?.payload?.shift();
      }
    }
  }, [dispatch, MaSP, Arr]);

  const openCreateSanPhamModal = React.useCallback(() => {
    dispatch(actions.showTaoSanPhamModal());
  }, [dispatch]);

  const tinhGiaVon = React.useCallback(() => {
    const MaSanPham = dataSource.map((data) => data.MaSP);
    for (let i = 0; i < MaSanPham.length; i++) {
      //Lưu mảng sản phẩm tìm được trong danh sách sản phẩm theo phiếu nhập
      let SanPham = SP.find((data) => data.MaSP == MaSanPham[i]);
      if (SanPham != undefined) {
        let arrGiaNhap = [];
        let arrSoLuong = [];
        for (let j = 0; j < PN?.length; j++) {
          for (let k = 0; k < PN[j]?.MaSP?.length; k++) {
            if (
              PN[j].MaSP[k] == SanPham.MaSP &&
              PN[j].TrangThai == "Đã nhập hàng"
            ) {
              arrGiaNhap.push(PN[j].GiaNhap[k]);
              arrSoLuong.push(PN[j].SoLuong[k]);
            }
          }
        }
        let GiaNhap = 0;
        for (let item = 0; item < arrGiaNhap.length; item++) {
          GiaNhap = GiaNhap + arrGiaNhap[item] * arrSoLuong[item];
        }

        let SoLuong = arrSoLuong.reduce((sum, data) => {
          return (sum += data);
        }, 0);
        SanPham.GiaVon = Math.round(
          (GiaNhap + data.GiaNhap[i] * data.SoLuong[i]) /
            (SoLuong + data.SoLuong[i])
        );
        if (SanPham.TonKho==0) {SanPham.TrangThai="Đang kinh doanh"}
        SanPham.TonKho = SanPham.TonKho + data.SoLuong[i];
        //Cập nhật giá vốn, số lượng sản phẩm, trạng thái kinh doanh
        dispatch(actions.updateSanPham.updateSanPhamRequest(SanPham));
      }
      //handleNhapHang();
    }
  }, [data, dispatch]);
  const onHoanThanh = React.useCallback(() => {
    if (
      data.MaPN == "" ||
      data.NguoiNhap == "" ||
      data.TenNCC == "" ||
      data.TongSoLuong == 0
    ) {
      messageError("Vui lòng nhập đầy đủ thông tin!");
    } else if (data.GiamGiaTongTien > data.TongTien) {
      messageError("Tiền giảm giá phải bé hơn tổng tiền!");
    } else {
      let PhieuNhap = PN.find(function (e) {
        return e.MaPN == data.MaPN;
      });
      if (id.payload == "" || id.payload == null) {
        if (PhieuNhap != undefined) {
          messageError("Mã phiếu nhập đã tồn tại!");
        } else {
          if (data.TrangThai == "Đã nhập hàng") {
            if (data.TienTra < data.TongTien - data.GiamGiaTongTien) {
              messageError("Vui lòng nhập đủ tiền trả nhà cung cấp!");
            } else if (data.TienTra > data.TongTien - data.GiamGiaTongTien) {
              messageError("Tiền trả không được quá số tiền cần trả!");
            } else {
              tinhGiaVon();
              const d = data;
              let ten = "";
              if (NhanVien != undefined) {
                ten = NhanVien.TenNV;
              } else ten = "ADMIN";
              d.NguoiTao = ten;
              dispatch(actions.createPhieuNhap.createPhieuNhapRequest(d));
            }
          } else {
            const d = data;
            let ten = "";
            if (NhanVien != undefined) {
              ten = NhanVien.TenNV;
            } else ten = "ADMIN";
            d.NguoiTao = ten;
            dispatch(actions.createPhieuNhap.createPhieuNhapRequest(d));
          }

          handleNhapHang();
        }
      } else {
        //Trang thai nhap hang thi tinh gia von va cap nhat san pham
        if (data.TrangThai == "Đã nhập hàng") {
          if (data.TienTra < data.TongTien - data.GiamGiaTongTien) {
            messageError("Vui lòng nhập đủ tiền trả nhà cung cấp!");
          } else if (data.TienTra > data.TongTien - data.GiamGiaTongTien) {
            messageError("Tiền trả không được quá số tiền cần trả!");
          } else {
            tinhGiaVon();
            dispatch(actions.updatePhieuNhap.updatePhieuNhapRequest(data));
          }
          //Lấy Mã sản phẩm trong phiếu nhập
        } else {
          dispatch(actions.updatePhieuNhap.updatePhieuNhapRequest(data));
        }
        handleNhapHang();
      }
    }
  }, [data, dispatch]);

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
          title={
            id.payload == "" || id.payload == null
              ? "Thêm phiếu nhập"
              : "Cập nhật phiếu nhập"
          }
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
                      allowClear
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
                <Input.Group compact>
                  <Input
                    allowClear
                    style={{ width: "calc(100% - 31px)" }}
                    placeholder="Nhập mã phiếu nhập"
                    value={data.MaPN}
                    onChange={(e) => setData({ ...data, MaPN: e.target.value })}
                    defaultValue={data.MaPN}
                    disabled={
                      id.payload == "" || id.payload == null ? false : true
                    }
                  />
                  <Button
                    disabled={
                      id.payload == "" || id.payload == null ? false : true
                    }
                    icon={<RetweetOutlined />}
                    onClick={RandomMa}
                  />
                </Input.Group>
              </Form.Item>

              <Form.Item label="Người tạo phiếu" required>
                <Input
                  allowClear
                  placeholder="Nhập người tạo phiếu"
                  value={NhanVien?.TenNV}
                  defaultValue={NhanVien?.TenNV}
                />
              </Form.Item>
              <Form.Item
                label="Người nhập"
                tooltip="Người nhập hàng đến từ NCC"
                required
              >
                <Input
                  allowClear
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
                  allowClear
                  placeholder="Nhập nhà cung cấp"
                  value={data.TenNCC}
                  onChange={(e) => setData({ ...data, TenNCC: e.target.value })}
                  defaultValue={data.TenNCC}
                />
              </Form.Item>
              <Form.Item tooltip="Trạng thái phiếu nhập" label="Trạng thái">
                <Select
                  disabled={PhieuNhapValue?.TrangThai == "Đã nhập hàng"}
                  placeholder="Chọn trạng thái"
                  value={data.TrangThai}
                  onChange={(e) => setData({ ...data, TrangThai: e })}
                  defaultValue={data.TrangThai}
                >
                  <Option value="Phiếu tạm">Phiếu tạm</Option>
                  <Option value="Đã nhập hàng">Đã nhập hàng</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Ghi chú">
                <Input
                  allowClear
                  value={data.GhiChu}
                  onChange={(e) => setData({ ...data, GhiChu: e.target.value })}
                  defaultValue={data.GhiChu}
                />
              </Form.Item>
              <Form.Item label="Số lượng SP">
                <InputNumber
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: 270 }}
                  disabled="true"
                  value={data.TongSoLuong}
                  defaultValue={data.TongSoLuong}
                />
              </Form.Item>

              <Form.Item label="Tổng tiền hàng">
                <InputNumber
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
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
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
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
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: 270 }}
                  tooltip="Cần trả cho NCC"
                  disabled={true}
                  value={CanTra}
                  defaultValue={CanTra}
                />
              </Form.Item>

              <Form.Item label="Tiền trả NCC">
                <InputNumber
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
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
                    onHoanThanh();
                  }}
                >
                  OK
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}
