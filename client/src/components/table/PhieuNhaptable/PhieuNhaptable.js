import React, { useState } from "react";
import { ExportTableButton, Table } from "ant-table-extensions";

import {
  Input,
  Row,
  Button,
  Dropdown,
  message,
  Menu,
  Space,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import ExpandedRowRender from "./ExpandedRowRender";
import {
  SearchOutlined,
  DownOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import {
  PhieuNhapsState$,
  isloadingPhieuNhapsState$,
} from "../../../redux/selectors";
import * as actions from "../../../redux/actions";
const { Search } = Input;

function PhieuNhaptable({ trangthai, baohanh, currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const loadingPhieuNhaps = useSelector(isloadingPhieuNhapsState$);
  React.useEffect(() => {
    dispatch(actions.getPhieuNhaps.getPhieuNhapsRequest());
  }, [dispatch]);
  const PN = useSelector(PhieuNhapsState$);

  const dataSource = PN;
  console.log(PN);
  const columns = [
    {
      title: "Mã nhập hàng",
      dataIndex: "MaPN",
      key: "MaPN",
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
            placeholder="Nhập mã PN cần tìm"
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
        return record.MaPN.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Thời gian",
      dataIndex: "NgayTao",
      key: "NgayTao",
      render: (NgayTao) => moment(NgayTao).format("DD-MM-YYYY"),
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "TenNCC",
      key: "TenNCC",
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
        return record.TenNCC.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tổng tiền hàng",
      dataIndex: "TongTien",
      key: "TongTien",
      sorter: (a, b) => a.TongTien - b.TongTien,
    },
    {
      title: "Tiền đã trả NCC",
      dataIndex: "TienTra",
      key: "TienTra",
      sorter: (a, b) => a.TienTra - b.TienTra,
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      filters: [
        {
          text: "Phiếu tạm",
          value: "Phiếu tạm",
        },
        {
          text: "Đã nhập hàng",
          value: "Đã nhập hàng",
        },
        {
          text: "Đã hủy",
          value: "Đã hủy",
        },
      ],
      onFilter: (value, record) => record.TrangThai.indexOf(value) === 0,
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
      <Menu.Item key="1">Nhập hàng</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Row justify="end">
        <Space
          direction="horizontal"
          style={{ paddingTop: 10, marginBottom: 16 }}
        >
          <span style={{ marginRight: 8 }}>
            {hasSelected
              ? `Có ${selectedRowKeys.length} phiếu nhập được chọn`
              : ""}
          </span>
          <Dropdown overlay={menu} disabled={!hasSelected}>
            <Button>
              Thao tác <DownOutlined />
            </Button>
          </Dropdown>
          <ExportTableButton
            dataSource={dataSource}
            columns={columns}
            btnProps={{ icon: <FileExcelOutlined /> }}
            showColumnPicker={true}
            showColumnPickerProps={{ id: "Thêm hàng hóa" }}
            fileName="PhieuNhapCSV"
          >
            Tải file CSV
          </ExportTableButton>
        </Space>
      </Row>

      <Table
        columns={columns}
        searchable
        searchableProps={{
          inputProps: {
            placeholder: "Nhập nội dung cần tìm",
            prefix: <SearchOutlined />,
            width: 200,
          },
        }}
        loading={loadingPhieuNhaps}
        pagination={true}
        scroll={{ x: 1000, y: 500 }}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <ExpandedRowRender record={record} setCurrentId={setCurrentId} />
          ),

          rowExpandable: (record) => record.TenSP !== "Not Expandable",
        }}
        rowKey="_id"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default PhieuNhaptable;
