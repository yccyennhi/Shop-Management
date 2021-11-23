import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Descriptions,
  message,
} from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TaoHoaDonModalState$,
  SanPhamsState$,
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
    ThoiGian: new Date(Date.now()),
    GiamGia: "",
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
        ThanhTien: result.ThanhTien,
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
    } else {
      message.error("Mã sản phẩm không tồn tại");
    }
  }, [dataSP, SPsInfo]);

  const onListSPclick = () => {};

  const onFinish = () => {};
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
            onChange={(e) => setDataHD({ ...dataHD, MaKM: e.target.value })}
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
          <SanPhamHoaDonTable SPsInfo={SPsInfo} onListSPclick={onListSPclick}/>
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
        width={800}
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
