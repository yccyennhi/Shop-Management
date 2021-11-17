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
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import FormHoaDon from "../../../pages/GiaoDichPage/FormHoaDon";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { HoaDonsState$ } from "../../../redux/selectors";
const { Search } = Input;

export default function HoaDontable() {
  const dispatch = useDispatch();
  const HoaDons = useSelector(HoaDonsState$);

  React.useEffect(() => {
    dispatch(actions.getHoaDons.getHoaDonsRequest());
  }, [dispatch]);

  const dataSource = HoaDons;

  // const [dataSource, setDataSource] = useState([
  //   {
  //     key: 1,
  //     MaHD: "HD0001",
  //     ThoiGian: "10/11/2021 11:00",
  //     MaNV: "NV001",
  //     MaKM: "KM001",
  //     MaKH: "YN",
  //     TongTienHang: 0,
  //     GiamGia: 0,
  //     ThanhTien: 0,
  //   },
  // ]);
  const columns = [
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
      sorter: (a, b) => a.ThoiGian - b.ThoiGian,
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
    {
      title: "Khách hàng",
      dataIndex: "MaKH",
      key: "MaKH",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            style={{ width: 200 }}
            placeholder="Nhập tên khách hàng cần tìm"
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
        return record.MaKH.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Mã khuyến mãi",
      dataIndex: "MaKM",
      key: "MaKM",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            style={{ width: 200 }}
            placeholder="Nhập mã khuyến mãi cần tìm"
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
      title: "Tổng tiền hàng",
      dataIndex: "TongTienHang",
      key: "TongTienHang",
      sorter: (a, b) => a.TongTienHang - b.TongTienHang,
    },
    {
      title: "Giảm giá",
      dataIndex: "GiamGia",
      key: "GiamGia",
      sorter: (a, b) => a.GiamGia - b.GiamGia,
    },
    {
      title: "ThanhTien ",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
      sorter: (a, b) => a.ThanhTien - b.ThanhTien,
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

  console.log("selectedRowKeys", select);

  const { selectedRowKeys, loading } = select;

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
      <Table
        loading={false}
        pagination={true}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <FormHoaDon />,
          rowExpandable: (record) => record.MaHD !== "Not Expandable",
        }}
        dataSource={dataSource}
        rowKey="_id"
      ></Table>
    </div>
  );
}
