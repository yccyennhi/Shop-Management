import React, { useState } from "react";
import { Table, Input, Row, Switch, Radio, Form, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Search } = Input;

function HangHoatable() {
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      MaSP: "MA001",
      TenSP: "Giày Sandal quai hậu da",
      Size: 39,
      Loaihang: "Giày Sandals",
      Giaban: 320000,
      Giavon: 250000,
      Tonkho: 10,
      Trangthai: 0,
      Baohanh: 0,
      Mota: "Giày Sandal đơn giản thoải mái",
    },
    {
      key: 2,
      MaSP: "MA002",
      TenSP: "Giày cao gót quai trong",
      Size: 38,
      Loaihang: "Giày cao gót",
      Giaban: 400000,
      Giavon: 350000,
      Tonkho: 10,
      Trangthai: 1,
      Baohanh: 1,
      Mota: "Giày cao gót sang trọng",
    },
    {
      key: 3,
      MaSP: "MA003",
      TenSP: "Nike Air Force 1",
      Size: 42,
      Loaihang: "Giày Sneaker",
      Giaban: 3000000,
      Giavon: 2500000,
      Tonkho: 3,
      Trangthai: 2,
      Baohanh: 1,
      Mota: "Sneaker năng động trẻ trung",
    },
    {
        key: 4,
        MaSP: "MA003",
        TenSP: "Nike Air Force 1",
        Size: 42,
        Loaihang: "Giày Sneaker",
        Giaban: 3000000,
        Giavon: 2500000,
        Tonkho: 3,
        Trangthai: 2,
        Baohanh: 1,
        Mota: "Sneaker năng động trẻ trung",
      },
      {
        key: 3,
        MaSP: "MA003",
        TenSP: "Nike Air Force 1",
        Size: 42,
        Loaihang: "Giày Sneaker",
        Giaban: 3000000,
        Giavon: 2500000,
        Tonkho: 3,
        Trangthai: 2,
        Baohanh: 1,
        Mota: "Sneaker năng động trẻ trung",
      },
  ]);
  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "MaSP",
      key: "MaSP",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (
          <Search
            allowClear
            autoFocus
            style={{ width: 200 }}
            placeholder="Nhập mã SP cần tìm"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({closeDropdown: false});
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
        return record.MaSP.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên Hàng",
      dataIndex: "TenSP",
      key: "TenSP",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            style={{ width: 200 }}
            placeholder="Nhập tên SP cần tìm"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({closeDropdown: false});
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
        return record.TenSP.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Size",
      dataIndex: "Size",
      key: "Size",
      sorter: (a, b) => a.Size - b.Size,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            style={{ width: 200 }}
            placeholder="Nhập Size SP cần tìm"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({closeDropdown: false});
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
        return record.Size == value;
      },
    },
    {
      title: "Loại Hàng",
      dataIndex: "Loaihang",
      key: "Loaihang",
      filters: [
        {
          text: "Giày cao gót",
          value: "Giày cao gót",
        },
        {
          text: "Giày Sandals",
          value: "Giày Sandals",
        },
      ],
      onFilter: (value, record) => record.Loaihang.indexOf(value) === 0,
    },
    {
      title: "Giá bán",
      dataIndex: "Giaban",
      key: "Giaban",
      sorter: (a, b) => a.Giaban - b.Giaban,
    },
    {
      title: "Giá vốn",
      dataIndex: "Giavon",
      key: "Giavon",
      sorter: (a, b) => a.Giavon - b.Giavon,
    },
    {
      title: "Tồn kho",
      dataIndex: "Tonkho",
      key: "Tonkho",
      sorter: (a, b) => a.Tonkho - b.Tonkho,
    },
    {
      title: "Trạng thái",
      dataIndex: "Trangthai",
      key: "Trangthai",
      render: (trangthai) => {
        return (
          <p>
            {trangthai == 0
              ? "Ngừng kinh doanh"
              : trangthai == 1
              ? "Hết hàng"
              : "Đang kinh doanh"}
          </p>
        );
      },
      sorter: (a, b) => a.Trangthai - b.Trangthai,
    },
    {
      title: "Bảo hành",
      dataIndex: "Baohanh",
      render: (baohanh) => {
        return <p>{baohanh == 0 ? "Không bảo hành" : "Có bảo hành"}</p>;
      },
      sorter: (a, b) => a.Baohanh - b.Baohanh,
    },
  ];
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  console.log("selectedRowKeys", select);

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
      <Row>
        
      </Row>

      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length > 0
          ? `Có ${selectedRowKeys.length} hàng hóa được chọn`
          : ""}
      </span>
      <Table
        loading={false}
        pagination={false}
        scroll={{ x: 200, y: 500 }}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.Mota}</p>
          ),
          rowExpandable: (record) => record.TenSP !== "Not Expandable",
        }}
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default HangHoatable;
