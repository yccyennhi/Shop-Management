import React, { useState } from "react";
import { Table, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FormHoaDon from "../../../pages/GiaoDichPage/FormHoaDon";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { PhieuDoiTrasState$ } from "../../../redux/selectors";

const { Search } = Input;

function DoiTraTable() {
  const dispatch = useDispatch();
  const DoiTras = useSelector(PhieuDoiTrasState$);

  React.useEffect(() => {
    dispatch(actions.getPhieuDoiTras.getPhieuDoiTrasRequest());
  }, [dispatch]);

  const dataSource = DoiTras;

  const columns = [
    {
      title: "Mã phiếu đổi trả",
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
            placeholder="Nhập mã phiếu đổi trả cần tìm"
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
        return record.MaHA.toLowerCase().includes(value.toLowerCase());
      },
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
        title: "Thời gian",
        dataIndex: "ThoiGian",
        key: "ThoiGian",
        sorter: (a, b) => Date.compare (a.Date, b.Date),
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
          ? `Có ${selectedRowKeys.length} hóa đơn được chọn`
          : ""}
      </span>
      <Table
        loading={false}
        pagination={true}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => <FormHoaDon record = {record}/>,
          rowExpandable: (record) => record.MaPDT !== "Not Expandable",
        }}
        rowKey="_id"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default DoiTraTable;