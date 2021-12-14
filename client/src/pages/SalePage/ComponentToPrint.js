import React, { useEffect, useState } from "react";
import Logo from "../../../src/assets/Logo.png";
import { Col, Image, Row, Divider, Table, Form } from "antd";
import moment from "moment";
export const ComponentToPrint = React.forwardRef((props, ref) => {
  const HoaDon = JSON.parse(localStorage.getItem("HoaDon"));
  const KhachHang = JSON.parse(localStorage.getItem("KH"));
  const NhanVien = JSON.parse(localStorage.getItem("NV"));
  const CTHDs = JSON.parse(localStorage.getItem("CTHDs"));

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên Hàng",
      dataIndex: "TenSP",
      key: "TenSP",
    },
    {
      title: "Size",
      dataIndex: "Size",
      key: "Size",
    },
    {
      title: "Màu sắc",
      dataIndex: "MauSac",
      key: "MauSac",
    },
    {
      title: "Số lượng",
      dataIndex: "SoLuong",
      key: "SoLuong",
    },
    {
      title: "Đơn giá",
      dataIndex: "DonGia",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "DonGia",
    },
    {
      title: "Bảo hành",
      dataIndex: "BaoHanh",
      key: "BaoHanh",
    },
    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "ThanhTien",
    },
  ];

  const footer = () => (
    <Col style={{ width: 200, float: "right", marginRight: 50, marginTop: 20 }}>
      <Row style={{ float: "right", width: 200 }}>
        <Col flex="140px">
          <label>Tổng số lượng:</label>
        </Col>
        <Col flex="60px">
          <label style={{ float: "right" }}>{HoaDon.SoLuong}</label>
        </Col>
      </Row>
      <Row style={{ float: "right", width: 200 }}>
        <Col flex="140px">
          <label>Tổng tiền hàng:</label>
        </Col>
        <Col flex="60px">
          <label style={{ float: "right" }}>{HoaDon.TongTienHang}</label>
        </Col>
      </Row>
      <Row style={{ float: "right", width: 200 }}>
        <Col flex="140px">
          <label>Giảm giá:</label>
        </Col>
        <Col flex="60px">
          <label style={{ float: "right" }}>
            {`${HoaDon.GiamGia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </label>
        </Col>
      </Row>
      <Row style={{ float: "right", width: 200 }}>
        <Col flex="140px">
          <label>Thành tiền:</label>
        </Col>
        <Col flex="60px">
          <label
            style={{
              float: "right",
            }}
          >
            {`${HoaDon.ThanhTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </label>
        </Col>
      </Row>
      <Row style={{ float: "right", width: 200 }}>
        <Col flex="140px">
          <label>Tiền khách trả:</label>
        </Col>
        <Col flex="60px">
          <label style={{ float: "right" }}>
            {`${HoaDon.TienKhachTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </label>
        </Col>
      </Row>
      <Row style={{ float: "right", width: 200 }}>
        <Col flex="140px">
          <label>Tiền thừa trả khách:</label>
        </Col>
        <Col flex="60px">
          <label style={{ float: "right" }}>
            {`${HoaDon.TienTraKhach}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </label>
        </Col>
      </Row>
    </Col>
  );
  return (
    <div ref={ref}>
      <Row style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}>
        <Col flex="40%" style={{ marginLeft: "10%" }}>
          <Image src={Logo} width={150} />
          <h3>Dynamic Store</h3>
        </Col>
        <Col flex="50%">
          <span>
            {"Đơn vị bán hàng: "}
            <label style={{ fontWeight: 600 }}>
              Cửa hàng bán lẻ Giày dép Dynamic store
            </label>
            <br />
          </span>
          <span style={{ textAlign: "right" }}>
            {"Địa chỉ: Khu phố 6, P.Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh"}
            <br />
          </span>
          <span>{"Điện thoại: 0337651201"}</span>
        </Col>
      </Row>
      <h1 style={{ textAlign: "center", marginTop: 10 }}>HÓA ĐƠN BÁN HÀNG</h1>
      <Row>
        <ol>
          <li>
            {"Tên nhân viên: "}
            {NhanVien.TenNV}
          </li>
          <li>
            {"Mã hóa đơn: "}
            {HoaDon.MaHD}
          </li>
          <li>
            {"Thời gian: "}
            {moment(HoaDon.ThoiGian).format("DD/MM/YYYY  HH:mm:ss")}
          </li>
          <li>
            {"Họ tên khách hàng: "}
            {KhachHang ? KhachHang.TenKH : ""}
          </li>
          <li>
            {"Số điện thoại: "}
            {KhachHang ? KhachHang.SDT : ""}
          </li>
          <li>
            {"Điểm tích lũy: "}
            {KhachHang
              ? KhachHang.DiemTichLuy +
                parseInt(HoaDon.ThanhTien / 100) -
                HoaDon.DiemTru
              : ""}
          </li>
          <li>
            {"Địa chỉ: "}
            {KhachHang ? KhachHang.DiaChi : ""}
          </li>
        </ol>
      </Row>
      <Table
        tableLayout={"auto"}
        pagination={false}
        dataSource={CTHDs}
        bordered={true}
        columns={columns}
        style={{ marginRight: 20, marginLeft: 20 }}
        footer={() => HoaDon.GhiChu}
        rowKey="MaSP"
      />
      {footer()}
    </div>
  );
});
