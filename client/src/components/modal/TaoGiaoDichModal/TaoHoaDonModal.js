import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Descriptions,
  message,
  Col,
  Row,
} from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TaoHoaDonModalState$,
  SanPhamsState$,
  KhuyenMaisState$,
  HoaDonsState$,
  //KhachHangsState$
  //NhanViensState$
} from "../../../redux/selectors/index.js";
import {
  hideTaoHoaDonModal,
  updateSanPham,
  createHoaDon,
  createCTHD,
} from "../../../redux/actions";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import * as actions from "../../../redux/actions";
import SanPhamHoaDonTable from "../../table/HoaDonTable/SanPhamHoaDonTable.js";
import moment from "moment";

export default function TaoHoaDonModal({ HoaDons }) {
  const dateNow = moment().toDate();
  const dispatch = useDispatch();
  const { isShow } = useSelector(TaoHoaDonModalState$);
  const onCloseHoaDonModal = React.useCallback(() => {
    dispatch(hideTaoHoaDonModal());
  }, [dispatch]);
  const SanPhams = useSelector(SanPhamsState$);
  //const KhachHangs = useSelector(KhachHangsState$);
  //const NhanViens = useSelector(NhanViensState$);
  const KhuyenMais = useSelector(KhuyenMaisState$);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getKhuyenMais.getKhuyenMaisRequest());
  }, [dispatch]);

  // React.useEffect(() => {
  //   dispatch(actions.getKhachHangs.getKhachHangsRequest());
  // }, [dispatch]);
  // React.useEffect(() => {
  //   dispatch(actions.getNhanViens.getNhanViensRequest());
  // }, [dispatch]);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 50 },
  };
  const [status, setStatus] = useState(false);
  const [dataHD, setDataHD] = React.useState({
    MaHD: "",
    MaNV: "",
    idNV: "61957eace198c2fe3f3f5402",
    MaKH: "Không",
    idKH: "61957aa9e198c2fe3f3f53f6",
    MaKM: "",
    idKM: "619f673906c0b162302fb7f2",
    SoLuong: 0,
    ThoiGian: new Date(),
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
    TenSP: "",
  });
  const [SPsInfo, setSPsInfo] = React.useState([]);
  const btnAddSP = useCallback(() => {
    const result = SanPhams.find((SanPham) => SanPham.MaSP === dataSP.MaSP);
    if (result) {
      const SPInfo = {
        idSP: result._id,
        MaSP: result.MaSP,
        TenSP: result.TenSP,
        MauSac: result.MauSac,
        Size: result.Size,
        GiaVon: result.GiaVon,
        SoLuong: dataSP.SoLuong,
        ThanhTien: result.GiaBan * dataSP.SoLuong,
        DonGia: result.GiaBan,
        BaoHanh: result.BaoHanh,
      };
      SPsInfo.push(SPInfo);
      setDataSP({
        MaSP: "",
        TenSP: "",
      });
      dataHD.SoLuong = 0;
      dataHD.TongTienHang = 0;
      dataHD.GiaVon = 0;
      SPsInfo.forEach((SP) => {
        dataHD.SoLuong += SP.SoLuong;
        dataHD.TongTienHang += SP.ThanhTien;
        dataHD.GiaVon += SP.GiaVon;
      });
      dataHD.ThanhTien = dataHD.TongTienHang - dataHD.GiamGia;
    } else {
      message.error("Mã sản phẩm không tồn tại");
    }
  }, [dataSP, SPsInfo]);

  const btnAddMaKM = () => {
    const KM = KhuyenMais.find((e) => e.MaKM === dataHD.MaKM);
    console.log(KM);
    if (
      KM.SoLuong == 0 ||
      KM.TrangThai == false ||
      KM.NgayKT < dateNow ||
      KM.GiaTri > dataHD.ThanhTien
    ) {
      message.error("Mã khuyến mãi không phù hợp");
      dataHD.idKM = "";
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

  const onFinish = React.useCallback(() => {
    console.log(dataHD.MaHD);
    if (dataHD.MaKM) {
      if (dataHD.id == "619f673906c0b162302fb7f2") {
        message.warning("Mã khuyến mãi chưa được thêm thành công");
        return;
      }
    } else {
      dataHD.MaKM = "Không";
    }
    if (!dataHD.MaNV) {
      message.warning("Vui lòng thêm nhân viên");
      return;
    }
    if (!dataHD.ThoiGian) {
      message.warning("Xin thiết lập thời gian");
      return;
    }
    if (!dataHD.SoLuong) {
      message.warning("Vui lòng thêm sản phẩm vào hóa đon");
      return;
    }
    if (!dataHD.MaKH) dataHD.MaKH = "Không";
    const length = HoaDons.length + 1;
    if (length < 10) {
      dataHD.MaHD = "HD00" + length;
    } else if (length < 100) {
      dataHD.MaHD = "HD0" + length;
    } else {
      dataHD.MaHD = "HD" + length;
    }
    //dispatch(createHoaDon.createHoaDonRequest(dataHD));
    const KhuyenMai = KhuyenMais.find((km) => km.MaKM === dataHD.MaKM);
    KhuyenMai.SoLuong -= 1;
    dispatch(actions.updateKhuyenMai.updateKhuyenMaiRequest(KhuyenMai));
    // console.log(HoaDons);

    // const HoaDon = HoaDons.find((e) => e.MaHD === dataHD.MaHD);

    // console.log(HoaDon);
    // if (HoaDon) {
    //   SPsInfo.forEach((SP) => {
    //     dispatch(createCTHD.createCTHDRequest(SP));
    //   });
    // }
    // if (dataHD.MaKH) {
    //   const KH = KhachHangs.find((e) => e.MaKH === dataHD.MaKH);
    //   if (KH) setDataHD({ ...dataHD, idKH: KH._id });
    //   else {
    //     message.error('Mã khách hàng không tồn tại');
    //     return;
    //   }
    // }
    // if (dataHD.MaNV) {
    //   const NV = KhuyenMais.find((e) => e.MaNV === dataHD.MaNV);
    //   if (NV) setDataHD({ ...dataHD, idKM: NV._id });
    //   else {
    //     message.error('Mã nhân viên không đúng');
    //     return;
    //   }
    // }
  }, [dataHD, dispatch]);

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
          <Input
            value={dataHD.MaNV}
            placeholder="Nhập mã nhân viên"
            size="small"
            onChange={(e) => setDataHD({ ...dataHD, MaNV: e.target.value })}
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
          <Input
            value={dataHD.MaKH}
            placeholder="Nhập mã khách hàng"
            size="small"
            onChange={(e) => setDataHD({ ...dataHD, MaKH: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Mã khuyến mãi"
          style={{
            marginBottom: 0,
          }}
        >
          <Input
            value={dataHD.MaKM}
            disabled={status}
            placeholder="Nhập mã khuyến mãi"
            size="small"
            style={{ width: "calc(30%)" }}
            onChange={(e) => setDataHD({ ...dataHD, MaKM: e.target.value })}
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
        <Form.Item name="date-time-picker" label="Thời gian" required={true}>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={dataHD.ThoiGian}
            onChange={(e) => {
              if (e) {
                setDataHD({ ...dataHD, ThoiGian: e.toDate() });
              }
            }}
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
        // {
        //   <>
        //     <h3 style={{ float: "left", marginRight: "5px" }}>
        //       Thêm hóa đơn:{" "}
        //     </h3>{" "}
        //     <span style={{ fontWeight: "initial" }}>#{MaHD}</span>
        //   </>
        // }
        width={1000}
        visible={isShow}
        onOk={onFinish}
        okText="Thêm"
        okButtonProps={{ disabled: dataHD.TienTraKhach <= 0 }}
        onCancel={onCloseHoaDonModal}
      >
        {body}
      </Modal>
    </div>
  );
}
