import React, { useState } from "react";
import { Button, Dropdown, Input, Menu, Row, Table } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

export default function KhachHangTable() {
  //Menu Item cho Dropdown Button Thao tác
  const menu = (
    <Menu>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2st menu item</Menu.Item>
      <Menu.Item key="3">3st menu item</Menu.Item>
    </Menu>
  );

  // Mockup cho table
  const dataSource = [
    {
      key: "1",
      MaKH: "KH001",
      TenKH: "Đinh Trần Văn Minh",
      NgaySinh: "07/06/2001",
      SDT: "0329092681",
      Email: "19520715@gm.uit.edu.vn",
      DiaChi: "",
      DiemTichLuy: 50,
    },
    {
      key: "2",
      MaKH: "KH002",
      TenKH: "Nguyễn Thị Phương Thảo",
      NgaySinh: "29/09/2001",
      SDT: "0358864014",
      Email: "19520280@gm.uit.edu.vn",
      DiaChi: "Kon Tum",
      DiemTichLuy: 10,
    },
    {
      key: "3",
      MaKH: "KH003",
      TenKH: "Nguyễn Yến Nhi",
      NgaySinh: "18/10/2001",
      SDT: "0585502434",
      Email: "19520205@gm.uit.edu.vn",
      DiaChi: "Phú Yên",
      DiemTichLuy: 100,
    },
    {
      key: "4",
      MaKH: "KH004",
      TenKH: "Đoàn Ngọc Lãm",
      NgaySinh: "19/02/2001",
      SDT: "0337651201",
      Email: "19521737@gm.uit.edu.vn",
      DiaChi: "Quảng Trị",
      DiemTichLuy: 20,
    },
  ];

  // Khởi tạo cột table
  const columns = [
    {
      title: "Mã KH",
      dataIndex: "MaKH",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div>
            <Input.Search
              allowClear
              autoFocus
              style={{ width: 200 }}
              placeholder="Nhập mã KH cần tìm"
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
            />
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.MaKH.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên KH",
      dataIndex: "TenKH",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div>
            <Input.Search
              allowClear
              autoFocus
              style={{ width: 200 }}
              placeholder="Nhập tên KH cần tìm"
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
            />
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.TenKH.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      sorter: (a, b) => a.NgaySinh - b.NgaySinh,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div>
            <Input.Search
              allowClear
              autoFocus
              style={{ width: 200 }}
              placeholder="Nhập ngày sinh cần tìm"
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
            />
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.NgaySinh.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "SĐT",
      dataIndex: "SDT",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div>
            <Input.Search
              allowClear
              autoFocus
              style={{ width: 200 }}
              placeholder="Nhập SĐT cần tìm"
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
            />
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.SDT.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "Email",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div>
            <Input.Search
              allowClear
              autoFocus
              style={{ width: 200 }}
              placeholder="Nhập email cần tìm"
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
            />
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.Email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div>
            <Input.Search
              allowClear
              autoFocus
              style={{ width: 200 }}
              placeholder="Nhập địa chỉ cần tìm"
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
            />
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.DiaChi.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Điểm tích lũy",
      dataIndex: "DiemTichLuy",
      sorter: (a, b) => a.DiemTichLuy - b.DiemTichLuy,
    },
  ];

  //State Selection
  const [selection, setSelectionState] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  //
  const { selectedRowKeys, loading } = selection;

  //Các hàng được chọn trong Table
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectionState({
        ...selection,
        selectedRowKeys: selectedRowKeys,
      });
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  //Table
  return (
    <>
      <div>
        <Row>
          <div style={{ marginBottom: 16 }}>
            <Dropdown disabled={!hasSelected} overlay={menu}>
              <Button>
                Thao tác <DownOutlined />
              </Button>
            </Dropdown>
            <span style={{ marginLeft: 8 }}>
              {hasSelected
                ? `Có ${selectedRowKeys.length} khách hàng được chọn`
                : ""}
            </span>
          </div>
        </Row>
        <Table
          columns={columns}
          dataSource={dataSource}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.DiaChi}</p>
            ),
            rowExpandable: (record) => record.DiaChi != "",
          }}
          pagination={true}
          rowSelection={rowSelection}
          scroll={{ x: 1500, y: 500 }}
        ></Table>
      </div>
    </>
  );
}