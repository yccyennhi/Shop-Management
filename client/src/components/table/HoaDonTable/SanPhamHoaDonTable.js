import { Row, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
export default function SanPhamHoaDonTable({ SPsInfo, onListSPclick }) {
  console.log("Table",SPsInfo);
  const dispatch = useDispatch();

  const [data, setData] = useState(SPsInfo);
  React.useEffect(() => {
    setData(SPsInfo);
  }, [SPsInfo]);
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
      title: "Màu sắc",
      dataIndex: "MauSac",
      key: "MauSac",
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
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  });
  return (
    <>
      <Table
        tableLayout={"auto"}
        pagination={true}
        loading={false}
        size={'small'}
        columns={columns}
        onRow={(record, index) => {
            return{
                onDoubleClick:event => {onListSPclick()}
            }
        }}
        dataSource={data}
        rowKey="_id"
      />
    </>
  );
}
