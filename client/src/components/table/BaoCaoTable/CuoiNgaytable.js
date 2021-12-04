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

const columnMoneySample = (title, index) => ({
  title:  title ,
  dataIndex:  index ,
  key:  index ,
  render: (value) => {
    return `${(value<0?'-':'')} ${(Math.abs(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}`;
  },
  sorter: (a, b) => a.index - b.index,
});

function CuoiNgaytable(currentDataSource, type) {
  const dataSource = Array.from(currentDataSource, (HoaDon) =>
    type === 1
      ? {
          ...HoaDon,
          TenNV: HoaDon.idNV.TenNV,
          LoiNhuan: HoaDon.ThanhTien - HoaDon.GiaVon,
        }
      : type === 2
      ? {
          ...HoaDon,
          MaHD: HoaDon.MaPDT,
          TenNV: HoaDon.idNV.TenNV,
          LoiNhuan: -(HoaDon.ThanhTien - HoaDon.GiaVon),
        }
      : {
          ...HoaDon,
          MaHD: HoaDon.MaPN,
          TenNV: HoaDon.NguoiTao,
          ThoiGian: HoaDon.NgayTao,
          SoLuong: HoaDon.TongSoLuong,
          TongTienHang: HoaDon.TongTien,
          GiamGia: HoaDon.GiamGiaTongTien,
          ThanhTien: HoaDon.TongTien - HoaDon.GiamGiaTongTien,
        }
  );
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

   
    columnMoneySample("Tổng tiền hàng", "TongTienHang"),

    columnMoneySample("Giảm giá", "GiamGia"),

    columnMoneySample("Thành tiền", "ThanhTien"),

    type != 3
      ? columnMoneySample("Lợi nhuận", "LoiNhuan")
      : columnMoneySample("Trả NCC", "TienTra"),
    ,
  ];

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
          scroll={{x:200}}
          searchableProps={{
            inputProps: {
              placeholder: "Nhập thông tin cần tìm",
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
