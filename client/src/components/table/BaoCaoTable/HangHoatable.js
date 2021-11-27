import React, { useState } from "react";
import { Table, Input, Row} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";


const { Search } = Input;

function HangHoatable({currentDataSource}) {

 const dataSource = Object.keys(currentDataSource).map((key) => ({...currentDataSource[key], MaSP: key }));

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "MaSP",
      key: "MaSP",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        return ('' + a.MaSP).localeCompare(b.MaSP);
      },
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
            placeholder="nhập mã cần tìm"
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
      title: "Tên sản phẩm",
      dataIndex: "TenSP",
      key: "TenSP",
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
            placeholder="nhập tên cần tìm"
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
      title: "Tồn đầu",
      dataIndex: "SLDau",
      key: "SLDau",
      sorter: (a, b) => a.SLDau - b.SLDau,
    },

    {
      title: "Giá trị đầu",
      dataIndex: "GTDau",
      key: "GTDau",
      sorter: (a, b) => a.GTDau - b.GTDau,
    },
  

    {
      title: "Số lượng nhập",
      dataIndex: "SLNhap",
      key: "SLNhap",
      sorter: (a, b) => a.SLNhap - b.SLNhap,
    },

    {
      title: "Giá trị nhập",
      dataIndex: "GTNhap",
      key: "GTNhap",
      sorter: (a, b) => a.GTNhap - b.GTNhap,
    },

    {
      title: "Số lượng xuất",
      dataIndex: "SLXuat",
      key: "SLXuat",
      sorter: (a, b) => a.SLXuat - b.SLXuat,
    },

    {
      title: "Giá trị xuất",
      dataIndex: "GTXuat",
      key: "GTXuat",
      sorter: (a, b) => a.GTXuat - b.GTXuat,
    },
    
    {
      title: "Tồn cuối",
      dataIndex: "SLCuoi",
      key: "SLCuoi",
      sorter: (a, b) => a.SLCuoi - b.SLCuoi,
    },

    {
      title: "Giá trị cuối",
      dataIndex: "GTCuoi",
      key: "GTCuoi",
      sorter: (a, b) => a.GTCuoi - b.GTCuoi,
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
        rowKey="MaSP"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default HangHoatable;
