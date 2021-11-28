import React, { useState } from "react";
import { Input, Space } from "antd";
import { ExportTableButton, Table } from "ant-table-extensions";

import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
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

function BanHangtable({ currentDataSource }) {
  const dataSource = currentDataSource
    ? Array.from(currentDataSource, (HoaDon) => ({
        ...HoaDon[1],
        ThoiGian: HoaDon[0],
      }))
    : null;

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "ThoiGian",
      key: "ThoiGian",
      render: (date) => {
        return moment(date).format("DD/MM/YYYY");
      },
      sorter: (a, b) => a.ThoiGian - b.ThoiGian,
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
            placeholder="Nhập ngày cần tìm"
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
      title: "Số lượng đơn",
      dataIndex: "SoLuong",
      key: "SoLuong",
      sorter: (a, b) => a.SoLuong - b.SoLuong,
    },

   
    columnMoneySample("Tổng tiền hàng", "TongTienHang"),

    columnMoneySample("Giảm giá", "GiamGia"),

    columnMoneySample("Thành tiền", "ThanhTien"),

    columnMoneySample("Lợi nhuận", "LoiNhuan")
  ];

  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space direction="vertical" align="end" style={{ width: "100%" }}>
          <ExportTableButton
            dataSource={dataSource}
            columns={columns}
            btnProps={{ icon: <FileExcelOutlined /> }}
            fileName="HangHoaCSV"
          >
            Tải file CSV
          </ExportTableButton>
        </Space>
        <Table
          tableLayout={"auto"}
          loading={false}
          pagination={true}
          searchable
          searchableProps={{
            inputProps: {
              placeholder: "Nhập thông tin cần tìm",
              prefix: <SearchOutlined />,
            },
          }}
          columns={columns}
          rowKey="ThoiGian"
          dataSource={dataSource}
        ></Table>
      </Space>
    </div>
  );
}

export default BanHangtable;
