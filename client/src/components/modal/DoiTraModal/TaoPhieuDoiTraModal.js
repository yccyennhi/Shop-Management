import {
  Modal,
  Form,
  Row,
  DatePicker,
  message,
  List,
  Col,
  Divider,
  Cascader,
  Input,
} from "antd";
import React, { useCallback, useState, useContext } from "react";
import { useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { hideTaoPhieuTraHangModal } from "../../../redux/actions";
import { TaoPhieuTraHangState$, HoaDonsState$ } from "../../../redux/selectors";
import { useDispatch } from "react-redux";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import SanPhamTraHang from "./SanPhamTraHang";
import { AuthContext } from "../../../contexts/AuthContext";

export default function TaoPhieuTraHang({ PhieuDoiTras, NhanViens }) {
  const dispatch = useDispatch();
  const HoaDons = useSelector(HoaDonsState$);
  const [event, setHD] = useState();
  const [form] = Form.useForm();
  const [NV, setNV] = useState();
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);

  React.useEffect(() => {
    dispatch(actions.getHoaDons.getHoaDonsRequest());
  }, [dispatch]);
  const [ListSPTraHangs, setListSP] = useState([]);
  const { isShow } = useSelector(TaoPhieuTraHangState$);

  const [data, setData] = React.useState({
    MaPDT: "",
    MaHD: "",
    MaNV: "",
    idNV: "",
    idHD: "",
    idKH: "61957aa9e198c2fe3f3f53f6",
    MaKH: "KH000",
    ThoiGian: new Date(Date.now()),
    SoLuong: 0,
    TongTienHang: 0,
    GiaVon: 0,
    GiamGia: 0,
    ThanhTien: 0,
  });
  const [giamgia, setgiamgia] = useState(0);
  React.useEffect(() => {
    if (NhanViens) setNV(NhanViens.find((nv) => nv._id === TaiKhoan.MaNV));
  }, [TaiKhoan, NhanViens]);
  const onSearch = useCallback((event) => {
    if (!event) {
      setData({
        ...data,
        MaHD: "",
        SoLuong: 0,
        TongTienHang: 0,
        GiaVon: 0,
        GiamGia: 0,
        ThanhTien: 0,
      });
      setListSP([]);
      return;
    } else if (ListSPTraHangs.length > 0) {
      do {
        ListSPTraHangs.pop();
      } while (ListSPTraHangs.length > 0);
    }
    const HD = HoaDons.find((hd) => hd.MaHD === event);
    const listsp = PhieuDoiTras.filter((ctpdt) => ctpdt.MaHD === event);
    const datapdt = {
      SoLuong: 0,
      TongTienHang: 0,
      GiaVon: 0,
    };
    HD.CTHD.map((e) => {
      if (moment(HD.ThoiGian).add(e.BaoHanh, "month") >= moment()) {
        const ctpdt = {
          id: ListSPTraHangs.length,
          MaSP: e.MaSP,
          TenSP: e.TenSP,
          idSP: e.idSP,
          GiaBan: e.DonGia,
          GiaVon: e.GiaVon,
          SoLuong: e.SoLuong,
          SLmax: e.SoLuong,
          ThanhTien: Number(e.ThanhTien),
        };
        listsp.map((p) =>
          p.CTPDT.map((sp) => {
            if (sp.MaSP === e.MaSP) {
              ctpdt.SoLuong -= sp.SoLuong;
              ctpdt.SLmax -= sp.SoLuong;
            }
          })
        );
        if (ctpdt.SoLuong === 0) return;
        ListSPTraHangs.push(ctpdt);
        datapdt.SoLuong = datapdt.SoLuong + ctpdt.SoLuong;
        datapdt.TongTienHang =
          ctpdt.SoLuong * ctpdt.GiaBan + datapdt.TongTienHang;
        datapdt.GiaVon = datapdt.GiaVon + ctpdt.GiaVon * ctpdt.SoLuong;
        setgiamgia(HD.GiamGia / HD.SoLuong);
      }
    });
    setData({
      ...data,
      MaHD: event,
      idKH: HD.idKH,
      MaKH: HD.MaKH,
      SoLuong: datapdt.SoLuong,
      TongTienHang: datapdt.TongTienHang,
      GiaVon: datapdt.GiaVon,
    });
  });
  data.GiamGia = parseInt(giamgia * data.SoLuong);
  data.ThanhTien = data.TongTienHang - data.GiamGia;

  const optionHD = React.useMemo(() => {
    return HoaDons.map((HD) => ({
      value: HD.MaHD,
      label: HD.MaHD + " " + moment(HD.ThoiGian).format("DD/MM/YYYY  HH:mm:ss"),
    }));
  }, [HoaDons]);

  const headerTable = (
    <Row style={{ textAlign: "center", marginLeft: "5%" }}>
      <Col flex="8%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>Mã SP</label>
      </Col>
      <Divider type="vertical" />
      <Col flex="35%">
        <label style={{ float: "left", fontWeight: "500" }}>Tên sản phẩm</label>
      </Col>
      <Divider type="vertical" />
      <Col flex="15%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>
          Số lượng
        </label>
      </Col>
      <Divider type="vertical" />
      <Col flex="10%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>
          Đơn giá
        </label>
      </Col>
      <Divider type="vertical" />
      <Col flex="15%">
        <label style={{ textAlign: "center", fontWeight: "500" }}>
          Thành tiền
        </label>
      </Col>
    </Row>
  );

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };
  const onCancel = () => {
    form.resetFields();
    dispatch(hideTaoPhieuTraHangModal());
    setListSP([]);
    setData({
      MaNV: "",
      MaHD: "",
      ThoiGian: new Date(Date.now()),
      SoLuong: 0,
      TongTienHang: 0,
      GiamGia: 0,
      ThanhTien: 0,
      CTPDT: [],
    });
  };
  const setDataPDT = (SP) => {
    data.SoLuong = data.SoLuong - ListSPTraHangs[SP.id].SoLuong + SP.SoLuong;
    data.TongTienHang =
      data.TongTienHang - ListSPTraHangs[SP.id].ThanhTien + SP.ThanhTien;
    data.GiamGia = parseInt(giamgia * data.SoLuong);
    data.GiaVon =
      data.GiaVon -
      ListSPTraHangs[SP.id].SoLuong * SP.GiaVon +
      SP.GiaVon * SP.SoLuong;
    const newList = [...ListSPTraHangs];
    newList[SP.id].SoLuong = SP.SoLuong;
    newList[SP.id].ThanhTien = SP.ThanhTien;
    setListSP(newList);
  };
  const body = (
    <>
      {NV ? (
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 50,
          }}
          form={form}
          layout="horizontal"
        >
          <Form.Item label="Mã nhân viên">
            <Input value={NV.TenNV} readOnly />
          </Form.Item>
          <Form.Item label="Mã hóa đơn:" name="MaHD">
            <Cascader
              options={optionHD}
              placeholder="Chọn hóa đơn"
              onChange={onSearch}
              allowClear
              suffixIcon={<SearchOutlined />}
              showSearch={filter}
              onChange={(e) => {
                onSearch(e[0]);
              }}
            />
          </Form.Item>
          <Form.Item>
            {headerTable}
            <List
              grid={{ gutter: 0, column: 1 }}
              pagination={{
                pageSize: 5,
              }}
              dataSource={ListSPTraHangs}
              itemLayout="vertical"
              style={{ marginTop: 5 }}
              size="small"
              renderItem={(item) => (
                <List.Item key={item.MaSP}>
                  <SanPhamTraHang setDataPDT={setDataPDT} SP={item} />
                </List.Item>
              )}
            />
          </Form.Item>
          <Form.Item>
            <section
              style={{ float: "right", width: "200px", marginTop: "20px" }}
            >
              <h4 style={{ float: "left", marginRight: "10px" }}>
                Tổng số lượng <span style={{ float: "right" }}> : </span> <br />
                Tổng tiền hàng trả <span style={{ float: "right" }}>: </span>
                <br />
                Giảm Giá <span style={{ float: "right" }}>: </span>
                <br />
                Thành tiền <span style={{ float: "right" }}>: </span>
              </h4>
              <label>
                {data.SoLuong} <br /> {data.TongTienHang} <br /> {data.GiamGia}
                <br /> {data.ThanhTien}
              </label>
            </section>
          </Form.Item>
        </Form>
      ) : null}
    </>
  );

  const onSubmit = () => {
    form.resetFields();
    let Ma = "";
    let PDT;
    do {
      const min = 1000000;
      const max = 9999999;
      const rand = min + Math.random() * (max - min);
      Ma = "PDT" + Math.round(rand);
      PDT = PhieuDoiTras.find((data) => data.MaPDT == Ma);
    } while (PDT !== undefined);
    data.MaPDT = Ma;
    const HD = HoaDons.find((hd) => hd.MaHD === data.MaHD);
    data.idHD = HD._id;
    data.MaNV = NV.MaNV;
    data.idNV = NV._id;
    data.CTPDT = ListSPTraHangs;
    data.ThoiGian = moment();
    dispatch(actions.createPhieuDoiTra.createPhieuDoiTraRequest(data));
    form.resetFields();
    onCancel();
  };
  return (
    <div>
      <Modal
        title="Thêm phiếu trả hàng"
        visible={isShow}
        width={600}
        onOk={onSubmit}
        okButtonProps={{
          disabled: !data.MaHD,
        }}
        okText="Thêm"
        onCancel={onCancel}
      >
        {body}
      </Modal>
    </div>
  );
}
