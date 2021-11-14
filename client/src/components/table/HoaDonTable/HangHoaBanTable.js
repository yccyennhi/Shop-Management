import React, { useState } from "react";
import { Table } from "antd";

function HangHoaBanTable() {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      MaSP: "MA001",
      TenSP: "Giày Sandal quai hậu da",
      Size: 39,
      SoLuong: 1,
      GiaBan: 320000,
      GiaVon: 250000,
      BaoHanh: 0,
      ThanhTien: 640000,
    },
    {
      key: 2,
      MaSP: "MA002",
      TenSP: "Giày cao gót quai trong",
      Size: 38,
      SoLuong: 2,
      GiaBan: 400000,
      GiaVon: 350000,
      BaoHanh: 1,
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
      key: "GiaVon",
    },
    {
      title: "Giá bán",
      dataIndex: "GiaBan",
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
      key: "ThanhTien",
    },
  ];

  return <Table pagination={false} dataSource={dataSource} columns={columns} />;
}

export default HangHoaBanTable;
