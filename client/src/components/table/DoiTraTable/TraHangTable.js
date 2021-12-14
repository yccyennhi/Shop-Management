import React, { useState } from "react";
import { Input, Row } from "antd";
import { Table, ExportTableButton } from "ant-table-extensions";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import FormTraHang from "./FormTraHang";
import moment from "moment";
const { Search } = Input;

export default function TraHangTable({ PhieuDoiTras }) {
  const dataSource = PhieuDoiTras;

  const columns = [
    {
      title: "Mã phiếu trả hàng",
      dataIndex: "MaPDT",
      key: "MaPDT",
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
            style={{ width: 200 }}
            placeholder="Nhập mã phiếu trả hàng cần tìm"
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
        return record.MaPDT.toLowerCase().includes(value.toLowerCase());
      },
    },
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
            style={{ width: 200 }}
            placeholder="Nhập mã hóa đơn cần tìm"
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
        return record.MaHD.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Thời gian",
      dataIndex: "ThoiGian",
      key: "ThoiGian",
      sorter: (a, b) => moment(a.ThoiGian) > moment(b.ThoiGian),
      render: (date) => {
        return <label>{moment(date).format("DD/MM/YYYY  HH:mm:ss")}</label>;
      },
      defaultSortOrder: "descend",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "MaNV",
      key: "MaNV",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            style={{ width: 200 }}
            placeholder="Nhập mã nhân viên cần tìm"
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
        return record.MaNV.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
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
      <Row justify="end" style={{ marginBottom: 16 }}>
        <ExportTableButton
          dataSource={dataSource}
          columns={columns}
          btnProps={{ icon: <FileExcelOutlined /> }}
          showColumnPicker={true}
          showColumnPickerProps={{ id: "Xuất hóa đơn" }}
          fileName="HoaDonCSV"
        >
          Tải file CSV
        </ExportTableButton>
      </Row>
      <Table
        loading={false}
        pagination={true}
        columns={columns}
        searchable
        searchableProps={{
          inputProps: {
            placeholder: "Nhập nội dung cần tìm",
            prefix: <SearchOutlined />,
            width: 200,
          },
        }}
        scroll={{ y: 600 }}
        expandable={{
          expandedRowRender: (record) => <FormTraHang record={record} />,
          rowExpandable: (record) => record.MaPDT !== "Not Expandable",
        }}
        dataSource={dataSource}
        rowKey="_id"
      ></Table>
    </div>
  );
}
