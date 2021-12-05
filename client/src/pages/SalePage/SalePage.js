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
  DatePicker,
  List,
  Tooltip,
  Form,
  message,
  PageHeader,
  Divider,
  Popover,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import "./styles.css";
import moment from "moment";
import {
  HoaDonsState$,
  KhachHangsState$,
  KhuyenMaisState$,
  NhanViensState$,
  SanPhamsState$,
} from "../../redux/selectors";
import SanPhamHoaDonPanel from "../../components/ControlPanel/SanPhamHoaDonPanel";
import { showKhachHangModal } from "../../redux/actions";
import KhachHangModal from "../../components/modal/KhachHangModal/KhachHangModal";
import { useHistory } from "react-router-dom";
const { Content, Sider } = Layout;

export default function SalePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const dateNow = moment().toDate();
  const HoaDons = useSelector(HoaDonsState$);
  const SanPhams = useSelector(SanPhamsState$);
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
  React.useEffect(() => {
    dispatch(actions.getHoaDons.getHoaDonsRequest());
    dispatch(actions.getSanPhams.getSanPhamsRequest());
    dispatch(actions.getKhuyenMais.getKhuyenMaisRequest());
    dispatch(actions.getNhanViens.getNhanViensRequest());
    dispatch(actions.getKhachHangs.getKhachHangsRequest());
  }, [dispatch]);
  const openKhachHangModal = useCallback(() => {
    dispatch(showKhachHangModal());
  }, [dispatch]);

  const [dataHD, setDataHD] = React.useState({
    MaHD: "",
    MaNV: "",
    idNV: "",
    MaKH: "KH000",
    idKH: "61957aa9e198c2fe3f3f53f6",
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

  const [textInputKH, setTextInputKH] = useState();

  const optionNV = React.useMemo(() => {
    return NhanViens.map((NV) => ({
      value: NV.MaNV,
      label: NV.MaNV + " " + NV.TenNV,
    }));
  }, [NhanViens]);

  const optionKM = React.useMemo(() => {
    return KhuyenMais.map((km) => ({
      value: km.MaKM,
      label: km.MaKM + " " + km.TenKM,
    }));
  }, [KhuyenMais]);

  const optionKH = React.useMemo(() => {
    return KhachHangs.map((KH) => ({
      value: KH.MaKH,
      label: KH.MaKH + " " + KH.TenKH,
    }));
  }, [KhachHangs]);

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  const ObjectSP = (sp) => (
    <Tooltip title={sp.TenSP + " (" + sp.MoTa + ")"}>
      <Button style={{ height: "130px", width: "110px", margin: "1px" }}>
        <Row>
          <Image width={90} height={90} src={sp.HinhAnh} />
        </Row>
        <Row>
          <h5 style={{ width: "100px", textAlign: "center", marginBottom: -2 }}>
            Mã SP: {sp.MaSP}
          </h5>
          <h5 style={{ width: "100px", textAlign: "center" }}>
            Giá: {sp.GiaBan}
          </h5>
        </Row>
      </Button>
    </Tooltip>
  );

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
      BaoHanh: result.BaoHanh,
      ThanhTien: result.GiaBan,
    };
    const index = SPsInfo.findIndex((sp) => sp.MaSP === result.MaSP);
    if (index < 0) SPsInfo.push(SPInfo);
    else {
      SPsInfo[index].SoLuong += 1;
      SPsInfo[index].ThanhTien += result.GiaBan;
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
      SPsInfo[i].STT = index + 1;
    }
    SPsInfo.splice(SPsInfo.length - 1, 1);
    console.log(SPsInfo);
  };

  const KhuyenMaiChange = (e) => {
    const KM = KhuyenMais.find((km) => e === km.MaKM);
    if (
      !e ||
      KM.SoLuong == 0 ||
      KM.TrangThai == false ||
      KM.NgayKT < dateNow ||
      KM.GiaTri > dataHD.ThanhTien
    ) {
      message.error("Mã khuyến mãi không phù hợp");
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

  if (GiaTriKM > 0) {
    dataHD.GiamGia = parseInt((GiaTriKM * dataHD.TongTienHang) / 100);
  } else dataHD.ThanhTien = dataHD.TongTienHang;
  if (dataHD.TienKhachTra > 0) {
    dataHD.TienTraKhach =
      dataHD.TienKhachTra - dataHD.TongTienHang + dataHD.GiamGia;
  }
  dataHD.ThanhTien = dataHD.TongTienHang - dataHD.GiamGia;

  const onSubmit = React.useCallback(() => {
    if (!dataHD.MaNV) {
      message.warning("Vui lòng thêm nhân viên");
      return;
    }
    if (!dataHD.SoLuong) {
      message.warning("Vui lòng thêm sản phẩm vào hóa đon");
      return;
    }
    form.resetFields();
    const length = HoaDons.length + 1;
    if (length < 10) {
      dataHD.MaHD = "HD00" + length;
    } else if (length < 100) {
      dataHD.MaHD = "HD0" + length;
    } else {
      dataHD.MaHD = "HD" + length;
    }
    const nv = NhanViens.find((NV) => NV.MaNV === dataHD.MaNV);
    dataHD.idNV = nv._id;
    if (textInputKH) {
      const kh = KhachHangs.find((KH) => KH.MaKH === dataHD.MaKH);
      dataHD.idKH = kh._id;
      localStorage.setItem("KH", JSON.stringify(kh));
    } else {
      dataHD.MaKH = "KH000";
      dataHD.idKH = "61957aa9e198c2fe3f3f53f6";
    }
    dataHD.CTHD = SPsInfo;
    dispatch(actions.createHoaDon.createHoaDonRequest(dataHD));

    localStorage.setItem("HoaDon", JSON.stringify(dataHD));
    localStorage.setItem("CTHDs", JSON.stringify(SPsInfo));
    localStorage.setItem("NV", JSON.stringify(nv));
    history.push("/PrintHD");
    setDataHD({
      MaHD: "",
      MaNV: "",
      idNV: "",
      MaKH: "",
      idKH: "61957aa9e198c2fe3f3f53f6",
      MaKM: "KM000",
      idKM: "619f673906c0b162302fb7f2",
      SoLuong: 0,
      ThoiGian: dateNow,
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
  }, [dispatch, dataHD, SPsInfo]);

  const headerTable = (
    <Row
      style={{
        textAlign: "center",
        marginRight: 20,
        marginLeft: 20,
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
      <Col flex="44%">
        <label style={{ float: "left", marginLeft: "10%", fontWeight: "500" }}>
          Tên sản phẩm
        </label>
      </Col>
      <Divider type="vertical" />
      <Col flex="10%" style={{ marginRight: "2%" }}>
        <label style={{ float: "center", fontWeight: "500" }}>Số lượng</label>
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

  const SearchSP = (info) => {
    const list = SanPhams.filter(
      (sp) =>
        sp.TenSP.toLowerCase().indexOf(info.toLowerCase()) !== -1 ||
        sp.MaSP.toLowerCase().indexOf(info.toLowerCase()) !== -1
    );
    setSPSearch(list);
  };

  const contentPopOver = (
    <>
      <label style={{ fontWeight: 600 }}>{"Nhập số tiền: "}</label>
      <InputNumber
        placeholder="Tiền khách trả"
        min={0}
        bordered={false}
        value={dataHD.TienKhachTra}
        size="small"
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        onChange={(e) =>
          setDataHD({
            ...dataHD,
            TienKhachTra: e,
            TienTraKhach: e - dataHD.ThanhTien,
          })
        }
        style={{
          float: "right",
          width: "100px",
          textAlign: "right",
          borderBottomStyle: "solid",
          borderColor: "lightgray",
          borderBottomWidth: 1,
        }}
      />
    </>
  );

  return (
    <Layout
      style={{
        overflow: "auto",
        width: "500vh",
        height: "200vh",
        top: 128,
        left: 0,
        position: "fixed",
      }}
    >
 
          <PageHeader
            onBack={() => window.history.back()}
            className="site-page-header"
            title="Báo cáo hàng hóa"
          />

      <KhachHangModal currentId={currentId} setCurrentId={setCurrentId} />
      <Layout
        className="content"
        style={{
          padding: "0 24",
          overflow: "auto",
          width: "134vh",
          height: "82vh",
          top: 128,
          left: 10,
          position: "fixed",
        }}
      >
        <Content
          className="site-layout-background"
          style={{
            padding: 10,
          }}
        >
          {headerTable}
          <List
            grid={{ gutter: 0, column: 1 }}
            pagination={{
              pageSize: pagesize,
            }}
            dataSource={SPsInfo}
            itemLayout="vertical"
            style={{ marginTop: 5 }}
            size="small"
            renderItem={(item) => (
              <List.Item key={item.MaSP}>
                <SanPhamHoaDonPanel
                  //key={sp.MaSP}
                  sp={item}
                  SPPanelChange={SPPanelChange}
                  SPPanelRemove={SPPanelRemove}
                />
              </List.Item>
            )}
          />
        </Content>
        <Collapse bordered={false} collapsible="header">
          <Collapse.Panel
            header={
              <span
                style={{ fontWeight: 500 }}
                onClick={() => {
                  setonCollap(!onCollap);
                  setpagesize(!onCollap ? 3 : 7);
                  setSPSearch(
                    SanPhams.filter((sp) => sp.TrangThai === "Đang kinh doanh")
                  );
                }}
              >
                Danh sách sản phẩm
              </span>
            }
          >
            <Input.Search
              style={{ width: 330, marginLeft: 570 }}
              enterButton
              placeholder="Tìm kiếm sản phẩm"
              onSearch={(e) => SearchSP(e)}
              allowClear
              onPressEnter={(e) => SearchSP(e)}
            />
            <List
              grid={{ gutter: 0, column: 7 }}
              pagination={{
                pageSize: 7,
              }}
              dataSource={SPSearchs}
              style={{ marginTop: 5 }}
              itemLayout="horizontal"
              size="small"
              renderItem={(item) => (
                <List.Item
                  key={item._id}
                  onClick={() => {
                    if (item.TonKho && item.TrangThai === "Đang kinh doanh")
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
      </Layout>
      <Sider
        width={400}
        className="site-layout-background"
        style={{
          padding: 15,
          overflow: "auto",
          height: "100vh",
          right: 10,
          position: "fixed",
        }}
      >
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
          <Form.Item labelCol={{ span: 50 }} style={{ margin: 0 }}>
            <h1 style={{ fontSize: 20 }}>Thông tin hóa đơn</h1>
          </Form.Item>
          <Form.Item style={{ margin: 0 }} wrapperCol={{ span: 30 }}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              style={{
                float: "right",
                width: "165px",
              }}
              bordered={false}
              showTime
              value={moment(dataHD.ThoiGian)}
              size="small"
              defaultValue={moment(new Date())}
              onChange={(e) => setDataHD({ ...dataHD, ThoiGian: e })}
            />
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
              style={{ float: "left", marginRight: "5px" }}
            />
            <Cascader
              options={optionNV}
              style={{ width: "340px" }}
              suffixIcon={<SearchOutlined />}
              placeholder="Chọn nhân viên"
              showSearch={filter}
              onChange={(e) => {
                setDataHD({ ...dataHD, MaNV: e[0] });
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }} wrapperCol={30}>
            <Button size="small" icon={<SearchOutlined />} type="link" />
            <Cascader
              options={optionKH}
              bordered={false}
              style={{
                borderWidth: "1px",
                borderColor: "lightgrey",
                borderBottomStyle: "solid",
                width: 320,
              }}
              placeholder="Tìm khách hàng"
              showSearch={filter}
              onChange={(e) => {
                setDataHD({ ...dataHD, MaKH: e[0] });
                setTextInputKH(e);
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
            name="CasKM"
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
            labelAlign="left"
          >
            <Cascader
              options={optionKM}
              style={{ width: 150, float: "right" }}
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
              //title= 'Nhập số tiền'
              //title = {contentPopOver}
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
          <Form.Item style={{ margin: 0, height: 30 }} wrapperCol={30}>
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
                borderWidth: "2px",
              }}
              onChange={(e) => setDataHD({ ...dataHD, GhiChu: e.target.value })}
            />
          </Form.Item>
          <Form.Item wrapperCol={30} style={{ marginTop: 70 }}>
            <Button
              type="primary"
              block
              size="large"
              disabled={!(dataHD.TienTraKhach >= 0 && dataHD.TienKhachTra)}
              onClick={() => {
                onSubmit();
              }}
            >
              <p> Thanh toán </p>
            </Button>
          </Form.Item>
        </Form>
      </Sider>
    </Layout>
  );
}
