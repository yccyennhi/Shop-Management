import React, { useState } from "react";
import { Input, Row, Space, Descriptions, Tag } from "antd";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { ExportTableButton, Table } from "ant-table-extensions";
import { PhieuBaoHanhsState$, isloadingPhieuBaoHanhsState$ } from "../../../redux/selectors";
import ExpandedRowRender from "./ExpandedRowRender";

const { Search } = Input;

function PhieuBaoHanhtable({ baohanh, setCurrentId }) {
  const dispatch = useDispatch();
  const [PhieuBaoHanhs, setPhieuBaoHanhs] = useState(useSelector(PhieuBaoHanhsState$));
  const PBH = useSelector(PhieuBaoHanhsState$);
  const loadingPhieuBaoHanhs = useSelector(isloadingPhieuBaoHanhsState$);
  React.useEffect(() => {
    dispatch(actions.getPhieuBaoHanhs.getPhieuBaoHanhsRequest());
  }, [dispatch]);

  const dataSource = PhieuBaoHanhs;

  const columns = [
    {
      title: "Mã phiếu bảo hành",
      dataIndex: "MaPBH",
      key: "MaPBH",
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
        return record.MaSP.toLowerCase().includes(value.toLowerCase());
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
        return record.MaHD.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Tên sản phẩm",
      dataIndex: "TenSP",
      key: "TenSP",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            placeholder="Nhập tên sản phẩm cần tìm"
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
        return record.TenPBH.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Thời hạn bảo hành",
      dataIndex: "NgayKetThucBH",
      key: "NgayKetThucBH",
      sorter: (a, b) => a.NgayKetThucBH - b.NgayKetThucBH,
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
        return record.NgayKetThucBH == value;
      },
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
      <Row justify="end">
        <Space
          direction="horizontal"
          style={{ paddingTop: 10, marginBottom: 16 }}
        >
          <span style={{ marginLeft: 8 }}>
            {selectedRowKeys.length > 0
              ? `${selectedRowKeys.length} đã chọn`
              : ""}
          </span>
          <ExportTableButton
            dataSource={dataSource}
            columns={columns}
            btnProps={{ icon: <FileExcelOutlined /> }}
            showColumnPicker={true}
            showColumnPickerProps={{ id: "Thêm hàng hóa" }}
            fileName="HangHoaCSV"
          >
            Tải file CSV
          </ExportTableButton>
        </Space>
      </Row>

      <Table
        tableLayout={"auto"}
        loading={false}
        pagination={true}
        scroll={{ x: 1500, y: 500 }}
        searchableProps={{
          inputProps: {
            placeholder: "Nhập nội dung cần tìm",
            prefix: <SearchOutlined />,
            width: 200,
          },
        }}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => (
            <ExpandedRowRender record={record} setCurrentId={setCurrentId} />
          ),

          rowExpandable: (record) => record.TenPBH !== "Not Expandable",
        }}
        rowKey="_id"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default PhieuBaoHanhtable;
