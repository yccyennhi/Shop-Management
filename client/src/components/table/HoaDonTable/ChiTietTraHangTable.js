import React from "react";
import { Table } from "antd";

export default function ChiTietTraHangTable({ dataCTPDTs }) {
  const dataSource = dataCTPDTs;
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
      title: "Số lượng",
      dataIndex: "SoLuong",
      key: "SoLuong",
    },
    {
      title: "Giá nhập",
      dataIndex: "GiaBan",
      key: "GiaBan",
    },
    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
    },
  ];

  return (
    <Table
      tableLayout={"auto"}
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey="_id"
    />
  );
}
