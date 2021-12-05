import React, { useState } from "react";
import { Input, Row, Space } from "antd";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { ExportTableButton, Table } from "ant-table-extensions";
import {
  PhieuBaoHanhsState$,
  isloadingPhieuBaoHanhsState$,
  SanPhamsState$,
} from "../../../redux/selectors";
import ExpandedRowRender from "./ExpandedRowRender";

const { Search } = Input;

function PhieuBaoHanhtable({ trangthai, thoigian, thang, setCurrentId }) {
  const dispatch = useDispatch();
  const SP = useSelector(SanPhamsState$);
  const PBH = useSelector(PhieuBaoHanhsState$);
  const dateNow = moment().toDate();
  React.useEffect(() => {
    dispatch(actions.getPhieuBaoHanhs.getPhieuBaoHanhsRequest());
  }, [dispatch]);
  const SPCH = PBH.filter(function (e) {
    return moment(e.NgayKT) >= dateNow;
  });

  const SPHH = PBH.filter(function (e) {
    return moment(e.NgayKT) < dateNow;
  });

  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
    dispatch(actions.getPhieuBaoHanhs.getPhieuBaoHanhsRequest());
  }, [dispatch]);
  const [PhieuBaoHanhs, setPhieuBaoHanhs] = useState(
    useSelector(PhieuBaoHanhsState$)
  );
  const loadingPhieuBaoHanhs = useSelector(isloadingPhieuBaoHanhsState$);

  React.useEffect(() => {
    setPhieuBaoHanhs(PBH);
  }, [PBH]);

  React.useEffect(() => {
    if (trangthai === 0 && thoigian === 0) {
      setPhieuBaoHanhs(PBH);
    }
    if (trangthai === 1 && thoigian === 0) {
      setPhieuBaoHanhs(SPCH);
    }
    if (trangthai === 2 && thoigian === 0) {
      setPhieuBaoHanhs(SPHH);
    }
    if (trangthai === 0 && thoigian === 1) {
      if (thang != null) {
        const listPBH = PBH.filter(function (e) {
          return moment(e.NgayBD).format("M") == thang;
        });
        setPhieuBaoHanhs(listPBH);
      }
    }
    if (trangthai === 1 && thoigian === 1) {
      if (thang != null) {
        const listPBH = SPCH.filter(function (e) {
          return moment(e.NgayBD).format("M") == thang;
        });
        setPhieuBaoHanhs(listPBH);
      }
    }
    if (trangthai === 2 && thoigian === 1) {
      if (thang != null) {
        const listPBH = SPHH.filter(function (e) {
          return moment(e.NgayBD).format("M") == thang;
        });
        setPhieuBaoHanhs(listPBH);
      }
    }
  }, [trangthai, thoigian, thang]);
  const dataSource = PhieuBaoHanhs;
  const columns = [
    {
      title: "",
      key: "createdAt",
      sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    },
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
      title: "Mã sản phẩm",
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
      render: (TenSP, record) => {
        let listSP = SP.find(function (e) {
          return e.MaSP === record.MaSP;
        });
        if (listSP !== undefined) return listSP.TenSP;
      },
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
      dataIndex: "NgayKT",
      key: "NgayKT",
      render: (NgayKT) => moment(NgayKT).format("DD-MM-YYYY"),
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
            fileName="PhieuBaoHanhCSV"
          >
            Tải file CSV
          </ExportTableButton>
        </Space>
      </Row>

      <Table
        tableLayout={"auto"}
        loading={loadingPhieuBaoHanhs}
        pagination={true}
        scroll={{ x: 1000, y: 500 }}
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
