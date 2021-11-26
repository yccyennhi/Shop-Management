import React, { useState } from "react";
import { Table, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { Search } = Input;

function CuoiNgaytable({ currentDataSource }) {
  // const dataSource = Array.from(currentDataSource, (HoaDon) => ({
  //   MaHD: HoaDon.MaHD,
  //   TenNV: HoaDon.idNV.TenNV,
  //   ThoiGian: HoaDon.ThoiGian,
  //   SoLuong: HoaDon.SoLuong,
  //   TongTienHang: HoaDon.TongTienHang,
  //   GiamGia: HoaDon.GiamGia,
  //   ThanhTien: HoaDon.ThanhTien,
  //   LoiNhuan: HoaDon.TongTienHang - HoaDon.GiaVon,
  // }));
  const dataSource = Array.from(currentDataSource, (HoaDon) => ({
    ...HoaDon,
    TenNV: HoaDon.idNV.TenNV,
    LoiNhuan: HoaDon.TongTienHang - HoaDon.GiaVon,
  }));
  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "MaHD",
      key: "MaHD",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <Search
            allowClear
            autoFocus
            placeholder="Nhập mã cần tìm"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            onSearch={() => {
              confirm();
            }}
          ></Search>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.MaKM.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Nhân viên",
      dataIndex: "TenNV",
      key: "TenNV",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            placeholder="Nhập tên nhân viên cần tìm"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            onSearch={() => {
              confirm();
            }}
          ></Search>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.TenKM.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Thời gian",
      dataIndex: "ThoiGian",
      key: "ThoiGian",
      render: (date) => {
        return <p>{moment(date).format("HH:MM:SS")}</p>;
      },
      sorter: (a, b) => a.ThoiGian - b.ThoiGian,
    },

    {
      title: "Số lượng sản phẩm",
      dataIndex: "SoLuong",
      key: "SoLuong",
      sorter: (a, b) => a.SoLuong - b.SoLuong,
    },

    {
      title: "Tổng tiền hàng",
      dataIndex: "TongTienHang",
      key: "TongTienHang",
      sorter: (a, b) => a.TongTienHang - b.TongTienHang,
    },

    {
      title: "Giảm giá",
      dataIndex: "GiamGia",
      key: "GiamGia",
      sorter: (a, b) => a.GiamGia - b.GiamGia,
    },

    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
      sorter: (a, b) => a.ThanhTien - b.ThanhTien,
    },
    {
      title: "Lợi nhuận",
      dataIndex: "LoiNhuan",
      key: "LoiNhuan",
      sorter: (a, b) => a.LoiNhuan - b.LoiNhuan,
    },
  ];

  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  const { selectedRowKeys, loading } = select;

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelect({
        ...select,
        selectedRowKeys: selectedRowKeys,
      });
    },
  };

  return (
    <div>
      <Table
        tableLayout={"auto"}
        loading={false}
        pagination={true}
        //  scroll={{ x: 1500, y: 500 }}
        columns={columns}
        rowKey="MaHD"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default CuoiNgaytable;
