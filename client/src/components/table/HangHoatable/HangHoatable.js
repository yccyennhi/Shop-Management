import React, { useState } from "react";
import {
  Table,
  Input,
  Row,
  Button,
  Dropdown,
  message,
  Menu,
  Switch,
  Radio,
  Form,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { SanPhamsState$ } from "../../../redux/selectors";
import * as actions from "../../../redux/actions";

const { Search } = Input;

function HangHoatable() {
  const dispatch = useDispatch();
  const SanPhams = useSelector(SanPhamsState$);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);
  const dataSource = SanPhams;
  
  const columns = [
    {
      title: "Mã hàng",
      dataIndex: "MaSP",
      key: "MaSP",
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
            placeholder="Nhập mã SP cần tìm"
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
        return record.Size == value;
      },
    },
    {
      title: "Loại Hàng",
      dataIndex: "LoaiHang",
      key: "LoaiHang",
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
      onFilter: (value, record) => record.LoaiHang.indexOf(value) === 0,
    },
    {
      title: "Giá bán",
      dataIndex: "GiaBan",
      key: "GiaBan",
      sorter: (a, b) => a.GiaBan - b.GiaBan,
    },
    {
      title: "Giá vốn",
      dataIndex: "GiaVon",
      key: "GiaVon",
      sorter: (a, b) => a.GiaVon - b.GiaVon,
    },
    {
      title: "Tồn kho",
      dataIndex: "TonKho",
      key: "TonKho",
      sorter: (a, b) => a.TonKho - b.TonKho,
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      render: (TrangThai) => {
        return (
          <p>
            {TrangThai == 0
              ? "Ngừng kinh doanh"
              : TrangThai == 1
              ? "Hết hàng"
              : "Đang kinh doanh"}
          </p>
        );
      },
      sorter: (a, b) => a.TrangThai - b.TrangThai,
    },
    {
      title: "Bảo hành",
      dataIndex: "BaoHanh",
      render: (BaoHanh) => {
        return <p>{BaoHanh == 0 ? "Không bảo hành" : "Có bảo hành"}</p>;
      },
      sorter: (a, b) => a.BaoHanh - b.BaoHanh,
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
  const hasSelected = selectedRowKeys.length > 0;
  function handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }

  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Row></Row>
      <div style={{ marginBottom: 16 }}>
        <Dropdown overlay={menu} disabled={!hasSelected}>
          <Button>
            Thao tác <DownOutlined />
          </Button>
        </Dropdown>

        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Có ${selectedRowKeys.length} hàng hóa được chọn` : ""}
        </span>
      </div>

      <Table
        loading={false}
        pagination={true}
        scroll={{ x: 1500, y: 500 }}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.Mota}</p>
          ),
          rowExpandable: (record) => record.TenSP !== "Not Expandable",
        }}
        rowKey="_id"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default HangHoatable;
