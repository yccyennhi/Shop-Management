import React, { useState } from "react";
import { Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import { useSelector, useDispatch } from "react-redux";
// import * as actions from "../../../redux/actions";

// import { KhuyenMaisState$ } from "../../../redux/selectors";
import ExpandedRowRender from "./ExpandedRowRender";
import moment from "moment";
import { ExportTableButton, Table } from "ant-table-extensions";

const { Search } = Input;

function KhuyenMaitable({ dataSource, setCurrentId }) {
  const columns = [
    {
      title: "",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    },
    {
      title: "Mã KM",
      dataIndex: "MaKM",
      key: "MaKM",
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
      title: "Tên chương trình",
      dataIndex: "TenKM",
      key: "TenKM",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            placeholder="Nhập tên chương trình cần tìm"
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
      title: "Ngày bắt đầu",
      dataIndex: "NgayBD",
      key: "NgayBD",
      render: (date) => {
        return moment(date).format("DD/MM/YYYY");
      },
      sorter: (a, b) => moment(a.NgayBD) - moment(b.NgayBD),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
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
        return record.NgayBD == value;
      },
    },

    {
      title: "Ngày kết thúc",
      dataIndex: "NgayKT",
      key: "NgayKT",
      render: (date) => {
        return moment(date).format("DD/MM/YYYY");
      },
      sorter: (a, b) => a.NgayKT - b.NgayKT,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
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
        return record.NgayKT == value;
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      render: (TrangThai) => {
        return <p>{TrangThai == false ? "Không áp dụng" : "Đang áp dụng"}</p>;
      },
      sorter: (a, b) => a.TrangThai - b.TrangThai,
      defaultSortOrder: "descend",
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
      <Row></Row>

      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length > 0 ? `${selectedRowKeys.length} đã chọn` : ""}
      </span>

      <Table
        tableLayout={"auto"}
        loading={false}
        searchable
        searchableProps={{
          inputProps: {
            placeholder: "Nhập mã, tên khuyến mãi",
            prefix: <SearchOutlined />,
            width: 200,
          },
        }}
        scroll={{ x: 1000 }}
        pagination={true}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <ExpandedRowRender record={record} setCurrentId={setCurrentId} />
          ),

          rowExpandable: (record) => record.TenKM !== "Not Expandable",
        }}
        rowKey="_id"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default KhuyenMaitable;
