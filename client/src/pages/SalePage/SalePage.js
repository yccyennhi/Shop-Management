import {
  Layout,
  Button,
  Input,
  Collapse,
  Row,
  Col,
  Image,
  InputNumber,
  Cascader,
  List,
  Tooltip,
  Form,
  message,
  Divider,
  Popover,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useCallback, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import "./styles.css";
import moment from "moment";
import {
  SanPhamsState$,
  HoaDonsState$,
  KhachHangsState$,
  KhuyenMaisState$,
  NhanViensState$,
} from "../../redux/selectors";
import SanPhamHoaDonPanel from "../../components/ControlPanel/SanPhamHoaDonPanel";
import {
  showKhachHangModal,
  showThanhToanTichDiemModal,
} from "../../redux/actions";
import KhachHangModal from "../../components/modal/KhachHangModal/KhachHangModal";
import PrintModal from "../../components/modal/PrintModal/PrintModal";
import MenubarBanHang from "../../components/header/Menubar/MenubarBanHang";
import { AuthContext } from "../../contexts/AuthContext";
const { Content, Sider } = Layout;

export default function SalePage() {
  //Khai báo
  const dispatch = useDispatch();
  const dateNow = moment().toDate();
  const SanPhams = useSelector(SanPhamsState$);
  const HoaDons = useSelector(HoaDonsState$);
  const NhanViens = useSelector(NhanViensState$);
  const KhachHangs = useSelector(KhachHangsState$);
  const KhuyenMais = useSelector(KhuyenMaisState$);
  const [SPsInfo, setSPsInfo] = React.useState([]);
  const [GiaTriKM, setGTKM] = React.useState([0]);
  const [form] = Form.useForm();
  const [currentId, setCurrentId] = useState(null);
  const [onCollap, setonCollap] = useState(0);
  const [pagesize, setpagesize] = useState(7);
  const [SPSearchs, setSPSearch] = useState([]);
  const [KH, setKH] = useState(null);
  const [NV, setNV] = useState();
  const [optionKM, setOptionKM] = useState();
  const [optionKH, setOptionKH] = useState();
  //Đọc + load dữ liệu
  useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
    dispatch(actions.getHoaDons.getHoaDonsRequest());
    dispatch(actions.getKhuyenMais.getKhuyenMaisRequest());
    dispatch(actions.getKhachHangs.getKhachHangsRequest());
    dispatch(actions.getNhanViens.getNhanViensRequest());
    setDataHD({
      MaHD: "",
      MaNV: "",
      idNV: "",
      MaKH: "KH0000000",
      idKH: "61b769ba26b4dbbca417c4de",
      MaKM: "KM000",
      idKM: "619f673906c0b162302fb7f2",
      SoLuong: 0,
      ThoiGian: "",
      GiamGia: 0,
      PhanTram: 0,
      GiaVon: 0,
      DiemTru: 0,
      TongTienHang: 0,
      ThanhTien: 0,
      TienKhachTra: 0,
      TienTraKhach: 0,
      GhiChu: "",
      CTHD: [],
    });
    setSPsInfo([]);
    localStorage.setItem("KH", JSON.stringify(null));
  }, [HoaDons.length, dispatch]);

  const openKhachHangModal = useCallback(() => {
    dispatch(showKhachHangModal());
  }, [dispatch]);

  useEffect(() => {
    setSPSearch(SanPhams.filter((sp) => sp.TrangThai === "Đang kinh doanh"));
  }, [SanPhams]);
  const [dataHD, setDataHD] = React.useState({
    MaHD: "",
    MaNV: "",
    idNV: "",
    MaKH: "KH0000000",
    idKH: "61b769ba26b4dbbca417c4de",
    MaKM: "KM000",
    idKM: "619f673906c0b162302fb7f2",
    SoLuong: 0,
    ThoiGian: new Date(Date.now()),
    GiamGia: 0,
    PhanTram: 0,
    GiaVon: 0,
    DiemTru: 0,
    TongTienHang: 0,
    ThanhTien: 0,
    TienKhachTra: 0,
    TienTraKhach: 0,
    GhiChu: "",
    CTHD: [],
  });

  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);

  useEffect(() => {
    setNV(NhanViens.find((nv) => nv._id === TaiKhoan.MaNV));
  }, [TaiKhoan, NhanViens]);
  useEffect(() => {
    setOptionKM(
      KhuyenMais.filter((km) => km.TrangThai === true).map((KM) => ({
        value: KM.MaKM,
        label: KM.MaKM + " " + KM.TenKM,
      }))
    );
  }, [KhuyenMais]);

  useEffect(() => {
    setOptionKH(
      KhachHangs.filter((kh) => kh.TrangThai === true).map((KH) => ({
        value: KH.MaKH,
        label:
          KH.TenKH +
          (KH.MaKH != "KH0000000" ? "-" + KH.SDT : "") +
          " (" +
          KH.DiemTichLuy +
          "điểm)",
      }))
    );
  }, [KhachHangs]);

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  const SPPanelClick = (result) => {
    const SPInfo = {
      STT: SPsInfo.length + 1,
      idSP: result._id,
      MaSP: result.MaSP,
      TenSP: result.TenSP,
      SoLuong: 1,
      TonKho: result.TonKho,
      MauSac: result.MauSac,
      Size: result.Size,
      GiaVon: result.GiaVon,
      DonGia: result.GiaBan,
      BaoHanh: result.ThoiGianBaoHanh,
      ThanhTien: result.GiaBan,
    };
    const index = SPsInfo.findIndex((sp) => sp.MaSP === result.MaSP);
    if (index < 0) SPsInfo.push(SPInfo);
    else {
      if (SPsInfo[index].SoLuong >= result.TonKho) {
        message.warn("Không thể chọn số lượng vượt quá số tồn kho");
        return;
      }
      const tam = SPsInfo[index];
      tam.SoLuong += 1;
      tam.ThanhTien += result.GiaBan;
      SPPanelChange(tam);
    }
    setDataHD({
      ...dataHD,
      SoLuong: dataHD.SoLuong + 1,
      TongTienHang: dataHD.TongTienHang + Number(result.GiaBan),
      GiaVon: dataHD.GiaVon + Number(result.GiaVon),
    });
  };

  const SPPanelChange = (SP) => {
    setDataHD({
      ...dataHD,
      SoLuong: dataHD.SoLuong - SPsInfo[SP.STT - 1].SoLuong + SP.SoLuong,
      TongTienHang:
        dataHD.TongTienHang - SPsInfo[SP.STT - 1].ThanhTien + SP.ThanhTien,
    });
    SPsInfo.splice(SP.STT - 1, 1, SP);
  };

  const SPPanelRemove = (index) => {
    setDataHD({
      ...dataHD,
      SoLuong: dataHD.SoLuong - SPsInfo[index].SoLuong,
      TongTienHang: dataHD.TongTienHang - SPsInfo[index].ThanhTien,
    });
    for (let i = index; i < SPsInfo.length - 1; i++) {
      SPsInfo[i] = SPsInfo[i + 1];
      SPsInfo[i].STT = i + 1;
    }
    SPsInfo.splice(SPsInfo.length - 1, 1);
    console.log(SPsInfo);
  };

  const KhuyenMaiChange = (e) => {
    const KM = KhuyenMais.find((km) => e === km.MaKM);
    if (
      !e ||
      KM.TrangThai == false ||
      KM.NgayKT < dateNow ||
      KM.GiaTri > dataHD.ThanhTien
    ) {
      if (e) message.error("Mã khuyến mãi không phù hợp");
      setGTKM(0);
      setDataHD({
        ...dataHD,
        MaKM: "KM000",
        idKM: "619f673906c0b162302fb7f2",
        GiamGia: 0,
      });
      return;
    }
    setGTKM(KM.PhanTram);
    setDataHD({
      ...dataHD,
      idKM: KM._id,
      MaKM: e,
    });
  };

  const KhachHangChange = (e) => {
    if (!e || e === "KH0000000") setKH(null);
    else {
      const KH = KhachHangs.find((kh) => e === kh.MaKH);
      setKH(KH);
    }
    setDataHD({ ...dataHD, DiemTru: 0 });
  };

  if (GiaTriKM > 0) {
    dataHD.GiamGia = parseInt((GiaTriKM * dataHD.TongTienHang) / 100);
  } else dataHD.ThanhTien = dataHD.TongTienHang;

  dataHD.ThanhTien = dataHD.TongTienHang - dataHD.GiamGia;
  dataHD.TienTraKhach =
    dataHD.TienKhachTra - dataHD.TongTienHang + dataHD.GiamGia + dataHD.DiemTru;

  useEffect(() => {
    setDataHD({ ...dataHD, TienKhachTra: dataHD.ThanhTien });
  }, [dataHD.ThanhTien]);

  const onSubmit = React.useCallback(() => {
    if (!dataHD.SoLuong) {
      message.warning("Vui lòng thêm sản phẩm vào hóa đon");
      return;
    }
    form.resetFields();
    let Ma = "";
    let HD;
    do {
      const min = 1000000;
      const max = 9999999;
      const rand = min + Math.random() * (max - min);
      Ma = "HD" + Math.round(rand);
      HD = HoaDons.find((data) => data.MaHD == Ma);
    } while (HD !== undefined);
    dataHD.MaHD = Ma;
    dataHD.idNV = NV._id;
    dataHD.MaNV = NV.MaNV;
    localStorage.setItem("NV", JSON.stringify(NV));
    if (KH) {
      dataHD.idKH = KH._id;
      dataHD.MaKH = KH.MaKH;
      localStorage.setItem("KH", JSON.stringify(KH));
    }
    dataHD.CTHD = SPsInfo;
    dataHD.ThoiGian = moment().toDate();
    localStorage.setItem("HoaDon", JSON.stringify(dataHD));
    localStorage.setItem("CTHDs", JSON.stringify(SPsInfo));
    dispatch(showThanhToanTichDiemModal());
  }, [dispatch, dataHD, SPsInfo]);

  const headerTable = (
    <Row
      style={{
        textAlign: "center",
        width: "100%",
        marginLeft: "2%",
        marginRight: "2%",
        fontWeight: 800,
        marginTop: 5,
        marginBottom: 10,
      }}
    >
      <Col flex="4%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>STT</label>
      </Col>
      <Divider type="vertical" />
      <Col flex="8%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>Mã SP</label>
      </Col>
      <Divider type="vertical" />
      <Col flex="48%">
        <label style={{ fontWeight: "500", textAlign: "center" }}>
          Tên sản phẩm
        </label>
      </Col>
      <Divider type="vertical" />
      <Col flex="8%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>
          Số lượng
        </label>
      </Col>
      <Divider type="vertical" />
      <Col flex="8%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>
          Đơn giá
        </label>
      </Col>
      <Divider type="vertical" />
      <Col flex="8%">
        <label style={{ textAlign: "right", fontWeight: "500" }}>
          Thành tiền
        </label>
      </Col>
      <Divider type="vertical" />
      <Col flex="4%">
        <label style={{ textAlign: "right", fontWeight: "500" }}>Xóa</label>
      </Col>
    </Row>
  );

  const ObjectSP = (sp) => (
    <Tooltip
      title={
        <>
          {sp.TenSP}
          <br />
          {"Size: "}
          {sp.Size}
          <br />
          {"Tồn kho: "}
          {sp.TonKho}
        </>
      }
    >
      <Button style={{ height: 130, width: 130 }}>
        <Row style={{ marginLeft: 3 }}>
          <Image width={90} height={90} src={sp.HinhAnh} />
        </Row>
        <Row>
          <h5 style={{ marginBottom: -2 }}>Mã SP: {sp.MaSP}</h5>
          <h5>Giá: {sp.GiaBan}</h5>
        </Row>
      </Button>
    </Tooltip>
  );
  const SearchSP = (info) => {
    const list = SanPhams.filter(
      (sp) => sp.TrangThai === "Đang kinh doanh"
    ).filter(
      (sp) =>
        sp.TenSP.toLowerCase().indexOf(info.toLowerCase()) !== -1 ||
        sp.MaSP.toLowerCase().indexOf(info.toLowerCase()) !== -1
    );
    setSPSearch(list);
  };

  const contentPopOver = (
    <Col flex="400">
      <Divider orientation="left">
        <label style={{ fontWeight: 500, fontSize: 14 }}>
          {"Nhập số tiền mặt: "}
        </label>
      </Divider>
      <Row>
        <InputNumber
          placeholder="Tiền khách trả"
          min={0}
          bordered={false}
          value={dataHD.TienKhachTra}
          size="small"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          onChange={(e) =>
            setDataHD({
              ...dataHD,
              TienKhachTra: e ? e : 0,
            })
          }
          style={{
            width: 120,
            borderBottomStyle: "solid",
            borderColor: "lightgray",
            borderBottomWidth: 1,
            marginLeft: 100,
          }}
        />
      </Row>
      <Divider orientation="left">
        <label style={{ fontWeight: 500, fontSize: 14 }}>
          {"Dùng điểm tích lũy: "}
        </label>
      </Divider>
      <Row>
        <InputNumber
          placeholder="Điểm tích lũy"
          min={0}
          max={
            KH
              ? Math.min(dataHD.TongTienHang - dataHD.GiamGia, KH.DiemTichLuy)
              : 0
          }
          bordered={false}
          size="small"
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
          value={dataHD.DiemTru}
          disabled={!KH}
          onChange={(e) => setDataHD({ ...dataHD, DiemTru: e })}
          style={{
            width: 120,
            borderBottomStyle: "solid",
            borderColor: "lightgray",
            borderBottomWidth: 1,
            marginLeft: 100,
          }}
        />
      </Row>
    </Col>
  );

  const bodySider = (
    <>
      {NV ? (
        <Form
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 14,
          }}
          form={form}
          layout="horizontal"
        >
          <Form.Item labelCol={{ span: 50 }} style={{ marginBottom: 10 }}>
            <h1 style={{ fontSize: 20 }}>Thông tin hóa đơn</h1>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 5 }}
            wrapperCol={30}
            rules={[{ required: true }]}
          >
            <Button
              icon={<UserOutlined />}
              shape="circle"
              size="small"
              type="link"
              style={{ float: "left", marginRight: 5 }}
            />
            <Input
              value={NV ? NV.TenNV : null}
              readOnly
              style={{ width: "90%" }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 25 }} name="KH" wrapperCol={30}>
            <Button size="small" icon={<SearchOutlined />} type="link" />
            <Cascader
              options={optionKH}
              bordered={false}
              style={{
                borderWidth: 1,
                borderColor: "lightgrey",
                borderBottomStyle: "solid",
                width: "87%",
              }}
              //defaultValue="Khách lẻ"
              placeholder="Tìm khách hàng"
              showSearch={filter}
              onChange={(e) => {
                KhachHangChange(e[0]);
              }}
              allowClear
            />
            <Button
              size="small"
              icon={<PlusOutlined />}
              type="link"
              onClick={() => openKhachHangModal()}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: 10, margin: 0 }}
            label="Tổng tiền hàng"
            labelAlign="left"
          >
            <label style={{ float: "right", marginRight: 10 }}>
              {`${dataHD.TongTienHang}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
          </Form.Item>
          <Form.Item style={{ margin: 0 }} label="Số lượng" labelAlign="left">
            <label style={{ float: "right", marginRight: 10 }}>
              {dataHD.SoLuong}
            </label>
          </Form.Item>
          <Form.Item
            style={{ margin: 0 }}
            label="Mã khuyến mãi"
            name="KM"
            labelAlign="left"
          >
            <Cascader
              options={optionKM}
              style={{ width: "70%", float: "right", marginRight: 10 }}
              suffixIcon={<SearchOutlined />}
              placeholder="Nhập mã KM"
              showSearch={filter}
              onChange={(e) => {
                KhuyenMaiChange(e[0]);
              }}
              allowClear
            />
          </Form.Item>
          <Form.Item style={{ margin: 0 }} label="Giảm giá" labelAlign="left">
            <label style={{ float: "right", marginRight: 10 }}>
              {`${dataHD.GiamGia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
          </Form.Item>
          <Form.Item style={{ margin: 0 }} label="Thành tiền" labelAlign="left">
            <label
              style={{
                float: "right",
                marginRight: 10,
              }}
            >
              {`${dataHD.ThanhTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
          </Form.Item>
          <Form.Item
            style={{ margin: 0 }}
            label="Tiền khách trả"
            labelAlign="left"
          >
            <Popover
              content={contentPopOver}
              placement="leftBottom"
              trigger="click"
            >
              <span
                style={{
                  float: "right",
                  width: 70,
                  textAlign: "right",
                  marginRight: 10,
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                }}
                type="text"
              >
                {`${dataHD.TienKhachTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </Popover>
          </Form.Item>
          <Form.Item
            style={{ margin: 0 }}
            label="Tiền thừa trả khách"
            labelAlign="left"
          >
            <label style={{ float: "right", marginRight: 10 }}>
              {`${dataHD.TienTraKhach}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
          </Form.Item>
          <Form.Item style={{ marginTop: 20, height: 30 }} wrapperCol={30}>
            <Input.TextArea
              maxLength={150}
              showCount={true}
              prefix={<EditOutlined />}
              bordered={false}
              autoSize={true}
              value={dataHD.GhiChu}
              placeholder="Ghi chú"
              style={{
                borderBottomStyle: "solid",
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              onChange={(e) => setDataHD({ ...dataHD, GhiChu: e.target.value })}
            />
          </Form.Item>
          <Form.Item wrapperCol={30} style={{ marginTop: 70 }}>
            <Button
              type="primary"
              block
              size="large"
              disabled={
                !(
                  dataHD.TienTraKhach >= 0 &&
                  (dataHD.TienKhachTra || dataHD.DiemTru)
                )
              }
              onClick={() => {
                onSubmit();
              }}
            >
              <p> Thanh toán </p>
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </>
  );
  return (
    <Layout>
      <Layout>
        <MenubarBanHang />
      </Layout>
      <Layout
        style={{
          overflow: "auto",
          width: "100%",
          height: "calc(100% - 110px)",
          top: 110,
          position: "fixed",
        }}
      >
        <KhachHangModal currentId={currentId} setCurrentId={setCurrentId} />
        <PrintModal />
        <Layout
          className="content"
          style={{
            padding: "0 24",
            overflow: "auto",
            width: "68%",
            height: "100%",
            top: 10,
            left: 10,
            position: "absolute",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Row style={{ marginTop: 10 }}>{headerTable}</Row>
            <Row justify="center">
              <List
                grid={{ gutter: 0, column: 1 }}
                pagination={{
                  pageSize: pagesize,
                  style: { marginRight: 15 },
                }}
                dataSource={SPsInfo}
                itemLayout="vertical"
                style={{ width: "100%" }}
                size="small"
                renderItem={(item) => (
                  <List.Item key={item.MaSP}>
                    <SanPhamHoaDonPanel
                      sp={item}
                      SPPanelChange={SPPanelChange}
                      SPPanelRemove={SPPanelRemove}
                    />
                  </List.Item>
                )}
              />
            </Row>
            <Row>
              <Collapse
                bordered={false}
                collapsible="header"
                style={{ width: "100%", position: "absolute", bottom: 0 }}
              >
                <Collapse.Panel
                  header={
                    <span
                      style={{ fontWeight: 500 }}
                      onClick={() => {
                        setonCollap(!onCollap);
                        setpagesize(!onCollap ? 3 : 7);
                      }}
                    >
                      Danh sách sản phẩm
                    </span>
                  }
                >
                  <Row justify="end">
                    <Input.Search
                      style={{ width: 330, marginLeft: 550 }}
                      enterButton
                      placeholder="Tìm kiếm sản phẩm"
                      onSearch={(e) => SearchSP(e)}
                      allowClear
                      onPressEnter={(e) => SearchSP(e)}
                    />
                  </Row>
                  <List
                    grid={{ gutter: 0, column: 6 }}
                    pagination={{
                      pageSize: 6,
                    }}
                    dataSource={SPSearchs}
                    style={{ marginTop: 10 }}
                    itemLayout="horizontal"
                    size="small"
                    renderItem={(item) => (
                      <List.Item
                        key={item._id}
                        onClick={() => {
                          if (
                            item.TonKho &&
                            item.TrangThai === "Đang kinh doanh"
                          )
                            SPPanelClick(item);
                          else
                            message.error(
                              "Không thể đặt hàng sản phẩm " + item.TenSP
                            );
                        }}
                      >
                        {ObjectSP(item)}
                      </List.Item>
                    )}
                  />
                </Collapse.Panel>
              </Collapse>
            </Row>
          </Content>
        </Layout>
        <Sider
          width={"30%"}
          className="site-layout-background"
          style={{
            padding: 15,
            overflow: "auto",
            height: "100%",
            right: 10,
            top: 10,
            position: "absolute",
          }}
        >
          {bodySider}
        </Sider>
      </Layout>
    </Layout>
  );
}
