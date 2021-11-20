import React, { useState } from "react";
import {
  Table,
  ExportTableButton,
  SearchTableInput,
} from "ant-table-extensions";

import {
  Input,
  Row,
  Col,
  Button,
  Dropdown,
  message,
  Menu,
  Switch,
  Radio,
  Form,
  Space,
} from "antd";
import UpdateSanPhamModal from "../../../components/modal/TaoSanPhamModal/updateSanPhamModal";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import ExpandedRowRender from "./ExpandedRowRender";
import {
  SearchOutlined,
  DownOutlined,
  FileExcelOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  SanPhamsState$,
  isloadingSanPhamsState$,
} from "../../../redux/selectors";
import * as actions from "../../../redux/actions";
const { Search } = Input;

function HangHoatable({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const SanPhams = useSelector(SanPhamsState$);
  const loadingSanPhams = useSelector(isloadingSanPhamsState$);

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
      onFilter: (value, record, nameSearch) => {
        if (value == "") {
          value = nameSearch;
        }
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
      sorter: (a, b) => a.TrangThai - b.TrangThai,
    },
    {
      title: "Bảo hành",
      dataIndex: "BaoHanh",
      sorter: (a, b) => a.BaoHanh - b.BaoHanh,
    },
  ];
  const [select, setSelect] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  console.log("selectedRowKeys", select);

  const { selectedRowKeys, loading } = select;

  const openUpdateSanPhamModal = React.useCallback(() => {
    dispatch(actions.showUpdateSanPhamModal());
  }, [dispatch]);


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
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openUpdateSanPhamModal}
          >
            Thêm hàng hóa
          </Button>
          <ExportTableButton
            dataSource={dataSource}
            columns={columns}
            btnProps={{ type: "primary", icon: <FileExcelOutlined /> }}
            showColumnPicker={true}
            showColumnPickerProps={{ id: "Thêm hàng hóa" }}
            fileName="HangHoaCSV"
          >
            Tải file CSV
          </ExportTableButton>
        </Space>
      </Row>
      <Row justify="end">
        <div style={{ paddingTop: 10, marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>
            {hasSelected
              ? `Có ${selectedRowKeys.length} hàng hóa được chọn`
              : ""}
          </span>
          <Dropdown overlay={menu} disabled={!hasSelected}>
            <Button>
              Thao tác <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Row>

      <Row></Row>

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
        loading={loadingSanPhams}
        pagination={true}
        scroll={{ x: 1500, y: 500 }}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <ExpandedRowRender record={record} setCurrentId={setCurrentId} />
          ),

          rowExpandable: (record) => record.TenSP !== "Not Expandable",
        }}
        rowKey="MaSP"
        dataSource={dataSource}
      ></Table>
      <UpdateSanPhamModal currentId={currentId} setCurrentId={setCurrentId} />

      {/* <Button
        onClick={() => {
          <ReactHTMLTableToExcel
            table="table1"
            filename="Emp file"
            sheet="Sheet 1"
          ></ReactHTMLTableToExcel>;
        }}
      >
        xuat <DownOutlined />
      </Button> */}
    </div>
  );
}

export default HangHoatable;
