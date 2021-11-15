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
import { PhieuDoiTrasState$ } from "../../../redux/selectors";
const { Search } = Input;

export default function TraHangTable() {
  const dispatch = useDispatch();
  const PhieuDoiTras = useSelector(PhieuDoiTrasState$);

  React.useEffect(() => {
    dispatch(actions.getPhieuDoiTras.getPhieuDoiTrasRequest());
  }, [dispatch]);

  const dataSource = PhieuDoiTras;

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
        {selectedRowKeys.length > 0
          ? `Có ${selectedRowKeys.length} phiếu trả hàng được chọn`
          : ""}
      </span>
      <Table
        loading={false}
        pagination={true}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => <FormHoaDon />,
          rowExpandable: (record) => record.MaPDT !== "Not Expandable",
        }}
        dataSource={dataSource}
        rowKey="_id"
      ></Table>
    </div>
  );
}
