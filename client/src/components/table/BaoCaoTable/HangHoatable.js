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
      dataIndex: "TonDau",
      key: "TonDau",
      sorter: (a, b) => a.TonDau - b.TonDau,
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
      title: "Số lượng bán",
      dataIndex: "SLBan",
      key: "SLBan",
      sorter: (a, b) => a.SLBan - b.SLBan,
    },

    {
      title: "Giá trị bán",
      dataIndex: "GTBan",
      key: "GTBan",
      sorter: (a, b) => a.GTBan - b.GTBan,
    },
    
    {
      title: "Tồn cuối",
      dataIndex: "TonCuoi",
      key: "TonCuoi",
      sorter: (a, b) => a.TonCuoi - b.TonCuoi,
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
