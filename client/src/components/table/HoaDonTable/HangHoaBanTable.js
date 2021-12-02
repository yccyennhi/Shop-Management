import React from "react";
import { Table } from "antd";
function HangHoaBanTable({ dataCTHDs }) {

  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "MaSP",
      key: "MaSP",
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
      title: "Số lượng",
      dataIndex: "SoLuong",
      key: "SoLuong",
    },
    {
      title: "Đơn giá",
      dataIndex: "GiaVon",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "GiaVon",
    },
    {
      title: "Giá bán",
      dataIndex: "DonGia",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "GiaBan",
    },
    {
      title: "Bảo hành",
      dataIndex: "BaoHanh",
      render: (BaoHanh) => {
        return <p>{BaoHanh == 0 ? "Không bảo hành" : "Có bảo hành"}</p>;
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "ThanhTien",
    },
  ];

  return (
    <Table
      tableLayout={"auto"}
      pagination={false}
      dataSource={dataCTHDs.CTHD}
      columns={columns}
      rowKey='_id'
      footer = {()=>dataCTHDs.GhiChu}
    />
  );
}

export default HangHoaBanTable;
