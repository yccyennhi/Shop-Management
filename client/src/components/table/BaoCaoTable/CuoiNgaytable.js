import React, { useState } from "react";
import { Input, Space } from "antd";
import { ExportTableButton, Table } from "ant-table-extensions";

import {
  SearchOutlined,
  FileExcelOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";

import moment from "moment";

const { Search } = Input;

function CuoiNgaytable(currentDataSource, type) {
  const dataSource = Array.from(currentDataSource, (HoaDon) =>
    type === 1
      ? {
          ...HoaDon,
          TenNV: HoaDon.idNV.TenNV,
          LoiNhuan: HoaDon.TongTienHang - HoaDon.GiaVon,
        }
      : type === 2
      ? {
          ...HoaDon,
          MaHD: HoaDon.MaPDT,
          TenNV: HoaDon.idNV.TenNV,
          GiamGia: 0,
          TongTienHang: 0,
          ThanhTien: HoaDon.TongTien,
          LoiNhuan: -HoaDon.TongTien,
        }
      : {
          ...HoaDon,
          MaHD: HoaDon.MaPN,
          TenNV: HoaDon.NguoiTao,
          ThoiGian: HoaDon.NgayTao,
          SoLuong: HoaDon.TongSoLuong,
          TongTienHang: HoaDon.TongTien,
          GiamGia: HoaDon.GiamGiaTongTien ? HoaDon.GiamGiaTongTien : 0,
          LoiNhuan:  HoaDon.TongTien - HoaDon.TienTra,
          ThanhTien: HoaDon.TienTra
        }
  );
  console.log("type", type, dataSource);

  const columns = [
    {
      title: "Mã chứng từ",
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
        return moment(date).format("HH:MM:SS");
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
      render: (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      sorter: (a, b) => a.TongTienHang - b.TongTienHang,
    },

    {
      title: "Giảm giá",
      dataIndex: "GiamGia",
      key: "GiamGia",
      render: (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      sorter: (a, b) => a.GiamGia - b.GiamGia,
    },

    {
      title: type == 3 ? "Tiền trả" : "Thành tiền",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
      render: (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      sorter: (a, b) => a.ThanhTien - b.ThanhTien,
    },
    {
      title: "Lợi nhuận",
      dataIndex: "LoiNhuan",
      key: "LoiNhuan",
      render: (value) => {
        return `${value > 0 ? "" : "-"} ${Math.abs(value)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      },
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
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space direction="vertical" align="end" style={{ width: "100%" }}>
          <ExportTableButton
            dataSource={dataSource}
            columns={columns}
            btnProps={{ icon: <FileExcelOutlined /> }}
            fileName="BaoCaoCuoiNgay"
          >
            Tải file CSV
          </ExportTableButton>
        </Space>
        <Table
          tableLayout={"auto"}
          loading={false}
          pagination={true}
          searchableProps={{
            inputProps: {
              placeholder: "Nhập mã, tên khuyến mãi",
              prefix: <SearchOutlined />,
            },
          }}
          columns={columns}
          rowKey="MaHD"
          dataSource={dataSource}
        ></Table>
      </Space>
    </div>
  );
}

export default CuoiNgaytable;
