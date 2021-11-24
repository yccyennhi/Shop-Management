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
  //KhachHangsState$
  //NhanViensState$
} from "../../../redux/selectors/index.js";
import { hideTaoHoaDonModal } from "../../../redux/actions";
import { PlusOutlined } from "@ant-design/icons";
import * as actions from "../../../redux/actions";
import SanPhamHoaDonTable from "../../table/HoaDonTable/SanPhamHoaDonTable.js";

export default function TaoHoaDonModal() {
  //const dateNow = moment().toDate();
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
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 50 },
  };
  const [dataHD, setDataHD] = useState({
    MaHD: "",
    MaNV: "",
    idNV: "",
    MaKH: "",
    idKH: "",
    MaKM: "",
    idKM: "",
    SoLuong: 0,
    ThoiGian: new Date(Date.now()),
    GiamGia: 0,
    TongTienHang: 0,
    ThanhTien: 0,
    TienKhachTra: 0,
    TienTraKhach: 0,
  });
  const [dataSP, setDataSP] = useState({
    MaSP: "",
    TenSP: "",
    MauSac: "",
    Size: 0,
    SoLuong: 0,
    BaoHanh: 0,
    GiaBan: 0,
    ThanhTien: 0,
  });
  const [SPsInfo, setSPsInfo] = useState([]);
  const btnAddSP = useCallback(() => {
    const result = SanPhams.find((SanPham) => SanPham.MaSP === dataSP.MaSP);
    if (result) {
      setDataSP({
        ...dataSP,
        TenSP: result.TenSP,
        ThanhTien: result.GiaBan * dataSP.SoLuong,
        GiaBan: result.GiaBan,
        BaoHanh: result.BaoHanh,
      });
      SPsInfo.push(dataSP);
      setDataSP({
        MaSP: "",
        TenSP: "",
        MauSac: "",
        Size: 0,
        SoLuong: 0,
        BaoHanh: 0,
        GiaBan: 0,
        ThanhTien: 0,
      });

      SPsInfo.forEach((SP) => {
        dataHD.SoLuong += SP.SoLuong;
        dataHD.TongTienHang += SP.ThanhTien;
      });
      dataHD.ThanhTien = dataHD.TongTienHang - dataHD.GiamGia;
      dataHD.TienTraKhach = dataHD.TienKhachTra - dataHD.ThanhTien;
    } else {
      message.error("Mã sản phẩm không tồn tại");
    }
  }, [dataSP, SPsInfo]);

  const onListSPclick = (record, index) => {
    //const SP = SPsInfo.find(sp => sp.MaSP=record.MaSP);
    const ListSPtamp = new [...SPsInfo]();
    ListSPtamp.splice(index, 1);
    setDataSP(ListSPtamp);
  };
  const onFinish = () => {
    if (dataHD.idKM) {
      message.error("Mã khuyến mãi không tồn tại");
      return;
    }

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
  };
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
          name="MaKM"
          style={{
            marginBottom: 3,
          }}
        >
          <Input
            value={dataHD.MaKM}
            placeholder="Nhập mã khuyến mãi"
            size="small"
            onChange={(e) => {
              setDataHD({ ...dataHD, MaKM: e.target.value });
              const KM = KhuyenMais.find((e) => e.MaKM === dataHD.MaKM);
              if (KM) {
                dataHD.idKM = KM.id;
                dataHD.GiamGia = KM.GiaTri;
              } else {
                dataHD.idKM = "";
                dataHD.GiamGia = 0;
              }
            }}
          />
        </Form.Item>
        <Form.Item name="date-time-picker" label="Thời gian">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={dataHD.ThoiGian}
            onChange={(e) => {
              if (e) setDataHD({ ...dataHD, NgayBD: e.toDate() });
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
            Màu sắc:
          </span>
          <Form.Item style={{ display: "inline-block", width: "calc(12%)" }}>
            <Input
              size="small"
              value={dataSP.MauSac}
              onChange={(e) => setDataSP({ ...dataSP, MauSac: e.target.value })}
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
            Kích thước:
          </span>
          <Form.Item style={{ display: "inline-block", width: "calc(15%)" }}>
            <InputNumber
              size="small"
              style={{ width: "100%" }}
              value={dataSP.Size}
              onChange={(e) => setDataSP({ ...dataSP, Size: e })}
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
        <Form.Item>
          <Col style={{ float: "right", marginRight: "100px", width: "170px" }}>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Tổng số lượng:{" "}
                </label>
              </Col>
              <Col>
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.SoLuong}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Tổng tiền hàng:{" "}
                </label>
              </Col>
              <Col>
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.TongTienHang}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Giảm giá:{" "}
                </label>
              </Col>
              <Col>
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.GiamGia}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Thành tiền:{" "}
                </label>
              </Col>
              <Col>
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.ThanhTien}
                </label>
              </Col>
            </Row>
            <Row>
              <Col flex="120px">
                <label style={{ float: "right", fontWeight: "bold" }}>
                  Tiền khách trả:{" "}
                </label>
              </Col>
              <Col>
                <InputNumber
                  value={dataHD.TienKhachTra}
                  onChange={(e) => setDataHD({ ...dataHD, TienKhachTra: e })}
                  size="small"
                  bordered={false}
                  style={{
                    width: "50px",
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
                  Tiền trả khách:{" "}
                </label>
              </Col>
              <Col>
                <label style={{ float: "right", fontWeight: "bold" }}>
                  {dataHD.ThanhTien}
                </label>
              </Col>
            </Row>
          </Col>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
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
        onCancel={onCloseHoaDonModal}
      >
        {body}
      </Modal>
    </div>
  );
}
{
  /* <Descriptions>
        <Descriptions.Item label="Mã nhân viên">
          <Input
            value={textInputMaSP}
            required={true}
            placeholder="Nhập mã nhân viên"
            style={{ width: "70%" }}
            size="small"
            onChange={(e) => settextInputMaSP(e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Mã khách hàng">
          <Input
            //value={}
            placeholder="Nhập mã khách hàng"
            style={{ width: "70%" }}
            size="small"
            onChange={(e) => settextInputMaSP(e.target.value)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Mã khuyến mãi">
          <Input
            //value={}
            placeholder="Nhập mã khuyến mãi"
            style={{ width: "70%" }}
            size="small"
            onChange={(e) => settextInputMaSP(e.target.value)}
          />
        </Descriptions.Item>
      </Descriptions> */
}
{
  /* <Descriptions>
            <Descriptions.Item >
              <Input
                value={textInputMaSP}
                required={true}
                placeholder="Mã SP"
                style={{ width: "50%" }}
                size="small"
                onChange={(e) => settextInputMaSP(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label = 'Màu sắc'> 
              <Input
                required={true}
                placeholder="Màu sắc"
                style={{ width: "50%" }}
                size="small"
                onChange={(e) => settextInputMaSP(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label = 'Size'>
              <InputNumber
                required={true}
                placeholder="Size"
                style={{ width: "50%" }}
                size="small"
                onChange={(e) => settextInputMaSP(e.target.value)}
              />
            </Descriptions.Item>
            <Descriptions.Item label = 'Số lượng'>
              <InputNumber
                required={true}
                placeholder="Số lượng"
                style={{ width: "10%" }}
                size="small"
                onChange={(e) => settextInputMaSP(e.target.value)}
              />
            </Descriptions.Item>            
          </Descriptions> */
}
