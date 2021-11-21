import React from "react";
import { Table } from "antd";
function HangHoaBanTable({ dataCTHDs }) {

  const dataSource = dataCTHDs;
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

  return (
    <Table
      tableLayout={"auto"}
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey='_id'
    />
  );
}

export default HangHoaBanTable;
