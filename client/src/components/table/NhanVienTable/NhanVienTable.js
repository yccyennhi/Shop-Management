import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Table } from "ant-table-extensions";
import { Button, Dropdown, Input, Menu, Row } from "antd";
import moment from "moment";
import { useState } from "react";
import ExpandedRowRender from "./ExpandedRowRender";

export default function NhanVienTable({ dataSource, setCurrentId }) {
  // NVởi tạo cột table
  const columns = [
    {
      title: "",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    },
    {
      title: "Mã NV",
      dataIndex: "MaNV",
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
              placeholder="Nhập mã NV cần tìm"
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
        return record.MaNV.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên NV",
      dataIndex: "TenNV",
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
              placeholder="Nhập tên NV cần tìm"
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
        return record.TenNV.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      render: (date) => {
        return <p>{moment(date).format("DD/MM/YYYY")}</p>;
      },
      sorter: (a, b) => moment(a.NgaySinh) - moment(b.NgaySinh),
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
      title: "Ngày vào làm",
      dataIndex: "NgayVaoLam",
      render: (date) => {
        return <p>{moment(date).format("DD/MM/YYYY")}</p>;
      },
      sorter: (a, b) => moment(a.NgayVaoLam) - moment(b.NgayVaoLam),
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
              placeholder="Nhập ngày vào làm cần tìm"
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
        return record.NgayVaoLam.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      render: (trangThai) => {
        return <p>{trangThai == true ? "Đang làm việc" : "Đã nghỉ"}</p>;
      },
      sorter: (a, b) => a.TrangThai - b.TrangThai,
      filters: [
        {
          text: "Đang làm việc",
          value: 0,
        },
        {
          text: "Đang nghỉ",
          value: 1,
        },
      ],
      onFilter: (value, record) => record.TrangThai == value,
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
        <span style={{ marginLeft: 8 }}>
          {hasSelected
            ? `Có ${selectedRowKeys.length} khách hàng được chọn`
            : ""}
        </span>
        <Table
          tableLayout="auto"
          searchable
          searchableProps={{
            inputProps: {
              placeholder: "Nhập mã, tên khách hàng",
              prefix: <SearchOutlined />,
              width: 200,
            },
          }}
          columns={columns}
          dataSource={dataSource}
          expandable={{
            expandedRowRender: (record) => (
              <ExpandedRowRender record={record} setCurrentId={setCurrentId} />
            ),
            rowExpandable: (record) => true,
          }}
          pagination={true}
          rowKey="_id"
          rowSelection={rowSelection}
          scroll={{ x: 1300}}
        ></Table>
      </div>
    </>
  );
}
