import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
  Col,
  Row,
  Cascader,
} from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TaoHoaDonModalState$,
  SanPhamsState$,
  KhuyenMaisState$,
  NhanViensState$,
  KhachHangsState$,
} from "../../../redux/selectors/index.js";
import { hideTaoHoaDonModal } from "../../../redux/actions";
import {
  DeleteOutlined,
  NodeExpandOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import * as actions from "../../../redux/actions";
import SanPhamHoaDonTable from "../../table/HoaDonTable/SanPhamHoaDonTable.js";
import moment from "moment";

export default function TaoHoaDonModal({ HoaDons }) {
  const dateNow = moment().toDate();
  const dispatch = useDispatch();
  const { isShow } = useSelector(TaoHoaDonModalState$);
  const SanPhams = useSelector(SanPhamsState$);
  const NhanViens = useSelector(NhanViensState$);
  const KhachHangs = useSelector(KhachHangsState$);
  const KhuyenMais = useSelector(KhuyenMaisState$);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
    dispatch(actions.getKhuyenMais.getKhuyenMaisRequest());
    dispatch(actions.getNhanViens.getNhanViensRequest());
    dispatch(actions.getKhachHangs.getKhachHangsRequest());
  }, [dispatch]);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 50 },
  };
  const [status, setStatus] = useState(false);
  const [dataHD, setDataHD] = React.useState({
    MaHD: "",
    MaNV: "",
    idNV: "",
    MaKH: "",
    idKH: "61957aa9e198c2fe3f3f53f6",
    MaKM: "",
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
  });
  const [dataSP, setDataSP] = React.useState({
    MaSP: "",
    SoLuong: 0,
  });
  const [SPsInfo, setSPsInfo] = React.useState([]);
  const btnAddSP = () => {
    const result = SanPhams.find((SanPham) => SanPham.MaSP === dataSP.MaSP);
    if (!result) {
      message.error("Mã sản phẩm không tồn tại");
      return;
    }
    if (result.TrangThai === "Ngừng kinh doanh") {
      message.error("Sản phẩm đã ngừng kinh doanh");
      return;
    }
    if (result.TrangThai === "Hết hàng") {
      message.error("Sản phẩm đã hết hàng");
      return;
    }
    if (result.SoLuong < dataHD.SoLuong) {
      message.error("Số lượng sản phẩm không đủ");
      return;
    } else {
      const SPInfo = {
        MaHD: "",
        idSP: result._id,
        MaSP: result.MaSP,
        TenSP: result.TenSP,
        SoLuong: dataSP.SoLuong,
        MauSac: result.MauSac,
        Size: result.Size,
        GiaVon: result.GiaVon,
        DonGia: result.GiaBan,
        BaoHanh: result.BaoHanh,
        ThoiGian: dataHD.ThoiGian,
        ThanhTien: result.GiaBan * dataSP.SoLuong,
      };
      SPsInfo.push(SPInfo);
      setDataSP({
        MaSP: "",
        SoLuong: 0,
      });
      dataHD.SoLuong = 0;
      dataHD.TongTienHang = 0;
      dataHD.GiaVon = 0;
      SPsInfo.forEach((SP) => {
        dataHD.SoLuong = dataHD.SoLuong + SP.SoLuong;
        dataHD.TongTienHang = dataHD.TongTienHang + SP.ThanhTien;
        dataHD.GiaVon = dataHD.GiaVon + SP.GiaVon;
      });

      dataHD.ThanhTien = dataHD.TongTienHang - dataHD.GiamGia;
    }
  };

  const btnAddMaKM = () => {
    const KM = KhuyenMais.find((e) => e.MaKM === dataHD.MaKM);
    if (!KM) {
      message.error("Mã khuyến mãi không tồn tại");
      return;
    }
    if (
      KM.SoLuong == 0 ||
      KM.TrangThai == false ||
      KM.NgayKT < dateNow ||
      KM.GiaTri > dataHD.ThanhTien
    ) {
      message.error("Mã khuyến mãi không phù hợp");
      dataHD.GiamGia = 0;
      return;
    } else {
      const G_gia = parseInt((KM.PhanTram * dataHD.TongTienHang) / 100);
      setDataHD({
        ...dataHD,
        GiamGia: G_gia,
        idKM: KM._id,
        ThanhTien: dataHD.TongTienHang - G_gia,
        TienTraKhach:
          dataHD.TienKhachTra > 0
            ? dataHD.TienKhachTra - dataHD.TongTienHang + G_gia
            : 0,
      });
      setStatus(true);
    }
  };

  const btnCancelKM = () => {
    setDataHD({
      ...dataHD,
      MaKM: "",
      GiamGia: 0,
      ThanhTien: dataHD.TongTienHang,
      idKM: "",
      TienTraKhach:
        dataHD.TienKhachTra > 0 ? dataHD.TienKhachTra - dataHD.TongTienHang : 0,
    });
    setStatus(false);
  };

  const onListSPclick = (record, index) => {
    //const SP = SPsInfo.find(sp => sp.MaSP=record.MaSP);
    const ListSPtamp = new [...SPsInfo]();
    ListSPtamp.splice(index, 1);
    setDataSP(ListSPtamp);
  };

  const onCancel = React.useCallback(() => {
    dispatch(hideTaoHoaDonModal());
    setDataHD({
      MaHD: "",
      MaNV: "",
      idNV: "",
      MaKH: "",
      idKH: "61957aa9e198c2fe3f3f53f6",
      MaKM: "",
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
    });
    setDataSP({
      MaSP: "",
      SoLuong: 0,
    });
    setSPsInfo([]);
    console.log(dataHD);
  }, [dispatch]);

  const onFinish = React.useCallback(() => {
    if (!dataHD.MaNV) {
      message.warning("Vui lòng thêm nhân viên");
      return;
    }
    if (dataHD.MaKM) {
      if (dataHD.id == "619f673906c0b162302fb7f2") {
        message.warning("Mã khuyến mãi chưa được thêm thành công");
        return;
      }
    } else {
      dataHD.MaKM = "KM000";
    }
    if (!dataHD.SoLuong) {
      message.warning("Vui lòng thêm sản phẩm vào hóa đon");
      return;
    }
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
    if (dataHD.MaKH === "") {
      dataHD.idKH = "61957aa9e198c2fe3f3f53f6";
    } else {
      const kh = KhachHangs.find((KH) => KH.MaKH === dataHD.MaKH);
      dataHD.idKH = kh._id;
    }
    dispatch(actions.createHoaDon.createHoaDonRequest(dataHD));
    SPsInfo.map((sp) => {
      sp.MaHD = dataHD.MaHD;
      dispatch(actions.createCTHD.createCTHDRequest(sp));
    });
    onCancel();
  }, [dataHD, dispatch, SPsInfo, onCancel]);

  const optionNV = React.useMemo(() => {
    return NhanViens.map((NV) => ({
      value: NV.MaNV,
      label: NV.MaNV + ' ' + NV.TenNV,
    }));
  }, [NhanViens]);

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  const optionKH = React.useMemo(() => {
    return KhachHangs.map((KH) => ({
      value: KH.MaKH,
      label: KH.MaKH + ' ' + KH.TenKH,
    }));
  }, [KhachHangs]);

  const optionKM = React.useMemo(()=>{
    return KhuyenMais.map(km => ({
      value: km.MaKM,
      label: km.MaKM + ' ' + km.TenKM
    }));
  })
  const body = (
    <>
      <Form
        {...layout}
        name="nest-messages"
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          label="Mã nhân viên"
          name="MaNV"
          rules={[{ required: true }]}
          style={{
            marginBottom: 3,
          }}
        >
          <Cascader
            options={optionNV}
            placeholder="Nhập mã nhân viên"
            allowClear
            showSearch={filter}
            size="small"
            onChange={(e) => setDataHD({ ...dataHD, MaNV: e[0] })}
          />
        </Form.Item>
        <Form.Item
          label="Mã khách hàng"
          name="MaKH"
          rules={[{ required: false }]}
          style={{
            marginBottom: 3,
          }}
        >
          <Cascader
            options={optionKH}
            placeholder="Nhập mã khách hàng"
            size="small"
            showSearch={filter}
            onChange={(e) => setDataHD({ ...dataHD, MaKH: e[0] })}
          />
        </Form.Item>
        <Form.Item
          label="Mã khuyến mãi"
          style={{
            marginBottom: 0,
          }}
        >
          <Cascader
            options = {optionKM}
            disabled={status}
            placeholder="Nhập mã khuyến mãi"
            size="small"
            style={{ width: "calc(30%)" }}
            onChange={(e) => setDataHD({ ...dataHD, MaKM: e[0] })}
          />
          <Button
            disabled={!dataHD.MaKM}
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            style={{ marginLeft: "10px" }}
            onClick={btnAddMaKM}
          />
          <Button
            danger
            disabled={!status}
            size="small"
            icon={<DeleteOutlined />}
            style={{ marginLeft: "10px" }}
            onClick={btnCancelKM}
          />
        </Form.Item>
        <Form.Item name="date-time-picker" label="Thời gian">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            Value={moment(dataHD.ThoiGian)}
            disabled={true}
          />
        </Form.Item>
        <Form.Item label="Mã sản phẩm" style={{ marginBottom: 0 }}>
          <Form.Item style={{ display: "inline-block", width: "calc(15%)" }}>
            <Input
              size="small"
              value={dataSP.MaSP}
              onChange={(e) => setDataSP({ ...dataSP, MaSP: e.target.value })}
            />
          </Form.Item>
          <span
            style={{
              display: "inline-block",
              lineHeight: "32px",
              textAlign: "center",
              margin: "0 10px",
            }}
          >
            Số lượng
          </span>
          <Form.Item style={{ display: "inline-block", width: "calc(13%)" }}>
            <InputNumber
              size="small"
              style={{ width: "100%" }}
              value={dataSP.SoLuong}
              onChange={(e) => setDataSP({ ...dataSP, SoLuong: e })}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(5%)",
              marginLeft: "10px",
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              style={{ float: "right" }}
              onClick={btnAddSP}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <SanPhamHoaDonTable SPsInfo={SPsInfo} onListSPclick={onListSPclick} />
        </Form.Item>
        <Form.Item required={true}>
          <Col style={{ float: "right", marginRight: "100px", width: "220px" }}>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Tổng số lượng:
                </label>
              </Col>
              <Col flex="100px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.SoLuong}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Tổng tiền hàng:
                </label>
              </Col>
              <Col flex="100px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.TongTienHang}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Giảm giá:
                </label>
              </Col>
              <Col flex="100px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.GiamGia}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Thành tiền:
                </label>
              </Col>
              <Col flex="100px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.ThanhTien}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Tiền khách trả:
                </label>
              </Col>
              <Col flex="100px">
                <InputNumber
                  value={dataHD.TienKhachTra}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  onChange={(e) =>
                    setDataHD({
                      ...dataHD,
                      TienKhachTra: e,
                      TienTraKhach: e - dataHD.ThanhTien,
                    })
                  }
                  size="small"
                  bordered={false}
                  style={{
                    borderBottomStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "lightgreen",
                    textAlign: "center",
                    top: "-3px",
                  }}
                />
              </Col>
            </Row>
            <Row
              style={{
                borderTopStyle: "solid",
                borderWidth: "2px",
                borderColor: "lightblue",
              }}
            >
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Tiền trả khách:
                </label>
              </Col>
              <Col flex="100px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.TienTraKhach}
                </label>
              </Col>
            </Row>
          </Col>
        </Form.Item>
      </Form>
      ,
    </>
  );
  return (
    <div>
      <Modal
        title="Thêm hóa đơn"
        width={1000}
        visible={isShow}
        onOk={onFinish}
        onCancel={onCancel}
        okText="Thêm"
        okButtonProps={{
          disabled: !(dataHD.TienTraKhach >= 0 && dataHD.TienKhachTra),
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
