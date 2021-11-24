import React, { useState } from "react";
import { Table, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FormHoaDon from "../../../pages/GiaoDichPage/FormHoaDon";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { HoaDonsState$, CTHDsState$ } from "../../../redux/selectors";
const { Search } = Input;

export default function HoaDontable() {
  const dispatch = useDispatch();
  const HoaDons = useSelector(HoaDonsState$);
  const CTHDs = useSelector(CTHDsState$);

  React.useEffect(() => {
    dispatch(actions.getHoaDons.getHoaDonsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(actions.getCTHDs.getCTHDsRequest());
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

  return (
    <div>
      <Row></Row>
      <Table
        tableLayout={"auto"}
        loading={false}
        scroll={{ x: 1100 }}
        pagination={true}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <FormHoaDon record={record} dataCTHDs={CTHDs} />
          ),
          rowExpandable: (record) => record.MaHD !== "Not Expandable",
        }}
        dataSource={dataSource}
        rowKey="_id"
      ></Table>
    </div>
  );
}
