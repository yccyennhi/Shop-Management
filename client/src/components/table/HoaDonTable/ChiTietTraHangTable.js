import React, { useState } from "react";
import { Table } from "antd";

export default function ChiTietTraHangTable() {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      MaSP: "MA001",
      TenSP: "Giày Sandal quai hậu da",
      SoLuong: 1,
      GiaBan: 320000,
      GiaNhapLai: 320000,
      ThanhTien: 640000,
    },
    {
      key: 2,
      MaSP: "MA002",
      TenSP: "Giày cao gót quai trong",
      Size: 38,
      SoLuong: 2,
      GiaBan: 400000,
      GiaNhapLai: 400000,
      ThanhTien: 800000,
    },
  ]);
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
      title: "Giá bán",
      dataIndex: "GiaBan",
      key: "GiaBan",
    },
    {
        title: "Giá nhập lại",
        dataIndex: "GiaNhapLai",
        key: "GiaNhapLai",
    },
    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
    },
  ];

  return <Table pagination={false} dataSource={dataSource} columns={columns} />;
}
