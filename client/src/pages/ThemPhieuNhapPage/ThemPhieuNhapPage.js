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
    TrangThai: "Phi???u t???m",
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
      //L??u m???ng s???n ph???m t??m ???????c trong danh s??ch s???n ph???m theo phi???u nh???p
      let SanPham = SP.find((data) => data.MaSP == MaSanPham[i]);
      if (SanPham != undefined) {
        let arrGiaNhap = [];
        let arrSoLuong = [];
        for (let j = 0; j < PN?.length; j++) {
          for (let k = 0; k < PN[j]?.MaSP?.length; k++) {
            if (
              PN[j].MaSP[k] == SanPham.MaSP &&
              PN[j].TrangThai == "???? nh???p h??ng"
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
        if (SanPham.TonKho == 0) {
          SanPham.TrangThai = "??ang kinh doanh";
        }
        SanPham.TonKho = SanPham.TonKho + data.SoLuong[i];
        SanPham.TrangThai='??ang kinh doanh';
        //C???p nh???t gi?? v???n, s??? l?????ng s???n ph???m, tr???ng th??i kinh doanh
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
      messageError("Vui l??ng nh???p ?????y ????? th??ng tin!");
    } else if (data.GiamGiaTongTien > data.TongTien) {
      messageError("Ti???n gi???m gi?? ph???i b?? h??n t???ng ti???n!");
    } else {
      let PhieuNhap = PN.find(function (e) {
        return e.MaPN == data.MaPN;
      });
      if (id.payload == "" || id.payload == null) {
        if (PhieuNhap != undefined) {
          messageError("M?? phi???u nh???p ???? t???n t???i!");
        } else {
          if (data.TrangThai == "???? nh???p h??ng") {
            if (data.TienTra < data.TongTien - data.GiamGiaTongTien) {
              messageError("Vui l??ng nh???p ????? ti???n tr??? nh?? cung c???p!");
            } else if (data.TienTra > data.TongTien - data.GiamGiaTongTien) {
              messageError("Ti???n tr??? kh??ng ???????c qu?? s??? ti???n c???n tr???!");
            } else {
              tinhGiaVon();
              const d = data;
              let ten = "";
              if (NhanVien != undefined) {
                ten = NhanVien.TenNV;
              } else ten = "ADMIN";
              d.NguoiTao = ten;
              dispatch(actions.createPhieuNhap.createPhieuNhapRequest(d));
              handleNhapHang();

            }
          } else {
            const d = data;
            let ten = "";
            if (NhanVien != undefined) {
              ten = NhanVien.TenNV;
            } else ten = "ADMIN";
            d.NguoiTao = ten;
            dispatch(actions.createPhieuNhap.createPhieuNhapRequest(d));
            handleNhapHang();

          }

        }
      } else {
        //Trang thai nhap hang thi tinh gia von va cap nhat san pham
        if (data.TrangThai == "???? nh???p h??ng") {
          if (data.TienTra < data.TongTien - data.GiamGiaTongTien) {
            messageError("Vui l??ng nh???p ????? ti???n tr??? nh?? cung c???p!");
          } else if (data.TienTra > data.TongTien - data.GiamGiaTongTien) {
            messageError("Ti???n tr??? kh??ng ???????c qu?? s??? ti???n c???n tr???!");
          } else {
            tinhGiaVon();
            dispatch(actions.updatePhieuNhap.updatePhieuNhapRequest(data));
            handleNhapHang();
          }
          //L???y M?? s???n ph???m trong phi???u nh???p
        } else {
          dispatch(actions.updatePhieuNhap.updatePhieuNhapRequest(data));
          handleNhapHang();

        }
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
    o.label = `${data.MaSP}: ${data.TenSP}. M??u: ${data.MauSac}. Size: ${data.Size}. Gi?? b??n: ${data.GiaBan}. T???n kho: ${data.TonKho}`;
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
              ? "Th??m phi???u nh???p"
              : "C???p nh???t phi???u nh???p"
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
              <PageHeader title="Th??m s???n ph???m mu???n nh???p" />
              <Row justify="start">
                <Tooltip
                  placement="topRight"
                  title="Nh???p m?? s???n ph???m c???n t??m v?? ch???n s???n ph???m trong danh s??ch ????? xu???ng ????? th??m v??o phi???u nh???p, n???u ch??a c?? vui l??ng t???o m???i s???n ph???m!"
                >
                  <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    style={{
                      width: 250,
                    }}
                    dropdownMatchSelectWidth={500}
                    // style={{ width: "880px" }}
                    options={options}
                    filterOption
                    onSelect={(e) => {
                      setMaSP(e);
                    }}
                  >
                    <Input.Search
                      allowClear
                      size="medium"
                      placeholder="Nh???p m?? s???n ph???m mu???n nh???p kho"
                    />
                  </AutoComplete>
                </Tooltip>
                <Tooltip title="Th??m m???i s???n ph???m">
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
            <PageHeader title="Th??ng tin phi???u nh???p" />
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
                tooltip="Ng??y t???o phi???u nh???p l?? m???c ?????nh"
                label="Ng??y t???o phi???u"
              >
                <DatePicker
                  defaultValue={moment(data.NgayTao)}
                  format={"DD/MM/YYYY"}
                  value={moment(data.NgayTao)}
                  disabled={true}
                  onChange={(e) => {
                    if (e) setData({ ...data, NgayTao: dateNow });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="M?? phi???u nh???p"
                tooltip="M?? phi???u nh???p l?? th??ng tin duy nh???t"
                required
              >
                <Input.Group compact>
                  <Input
                    allowClear
                    style={{ width: "calc(100% - 31px)" }}
                    placeholder="Nh???p m?? phi???u nh???p"
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

              <Form.Item label="Ng?????i t???o phi???u" required>
                <Input
                  allowClear
                  placeholder="Nh???p ng?????i t???o phi???u"
                  value={NhanVien?.TenNV}
                  defaultValue={NhanVien?.TenNV}
                />
              </Form.Item>
              <Form.Item
                label="Ng?????i nh???p"
                tooltip="Ng?????i nh???p h??ng ?????n t??? NCC"
                required
              >
                <Input
                  allowClear
                  placeholder="Nh???p ng?????i nh???p"
                  value={data.NguoiNhap}
                  onChange={(e) =>
                    setData({ ...data, NguoiNhap: e.target.value })
                  }
                  defaultValue={data.NguoiNhap}
                />
              </Form.Item>
              <Form.Item
                label="Nh?? cung c???p"
                tooltip="T??n nh?? cung c???p"
                required
              >
                <Input
                  allowClear
                  placeholder="Nh???p nh?? cung c???p"
                  value={data.TenNCC}
                  onChange={(e) => setData({ ...data, TenNCC: e.target.value })}
                  defaultValue={data.TenNCC}
                />
              </Form.Item>
              <Form.Item tooltip="Tr???ng th??i phi???u nh???p" label="Tr???ng th??i">
                <Select
                  disabled={PhieuNhapValue?.TrangThai == "???? nh???p h??ng"}
                  placeholder="Ch???n tr???ng th??i"
                  value={data.TrangThai}
                  onChange={(e) => setData({ ...data, TrangThai: e })}
                  defaultValue={data.TrangThai}
                >
                  <Option value="Phi???u t???m">Phi???u t???m</Option>
                  <Option value="???? nh???p h??ng">???? nh???p h??ng</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Ghi ch??">
                <Input
                  allowClear
                  value={data.GhiChu}
                  onChange={(e) => setData({ ...data, GhiChu: e.target.value })}
                  defaultValue={data.GhiChu}
                />
              </Form.Item>
              <Form.Item label="S??? l?????ng SP">
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

              <Form.Item label="T???ng ti???n h??ng">
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
                tooltip="Gi???m gi?? tr??n t???ng s??? ti???n"
                label="Gi???m gi??"
              >
                <InputNumber
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: 270 }}
                  placeholder="Nh???p s??? ti???n ???????c gi???m"
                  value={data.GiamGiaTongTien}
                  defaultValue={data.GiamGiaTongTien}
                  onChange={(e) => {
                    setData({ ...data, GiamGiaTongTien: e });
                    setCanTra(data.TongTien - e);
                  }}
                />
              </Form.Item>
              <Form.Item label="C???n tr??? NCC">
                <InputNumber
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: 270 }}
                  tooltip="C???n tr??? cho NCC"
                  disabled={true}
                  value={CanTra}
                  defaultValue={CanTra}
                />
              </Form.Item>

              <Form.Item label="Ti???n tr??? NCC">
                <InputNumber
                  allowClear
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: 270 }}
                  tooltip="Ti???n ???? tr??? cho NCC"
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
