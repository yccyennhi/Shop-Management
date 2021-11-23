import React, { useState } from "react";
import { Input, Row, Space } from "antd";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { ExportTableButton, Table } from "ant-table-extensions";
import {
  PhieuHensState$,
  isloadingPhieuHensState$,
  SanPhamsState$,
} from "../../../redux/selectors";
import ExpandedRowRender from "./ExpandedRowRender";

const { Search } = Input;

function PhieuHentable({ trangthai, thoigian, ngayBD, ngayKT, setCurrentId }) {
  const dispatch = useDispatch();
  const PH = useSelector(PhieuHensState$);
  const dateNow = moment().toDate();

  const SPCH = PH.filter(function (e) {
    return moment(e.NgayHen) <= dateNow;
  });

  const SPHH = PH.filter(function (e) {
    return moment(e.NgayHen) > dateNow;
  });

  const SPHHT = PH.filter(function (e) {
    return e.TrangThai == "Hoàn thành";
  });
  const SPHCHT = PH.filter(function (e) {
    return e.TrangThai == "Chưa hoàn thành";
  });

  React.useEffect(() => {
    dispatch(actions.getPhieuHens.getPhieuHensRequest());
  }, [dispatch]);
  const [PhieuHens, setPhieuHens] = useState(useSelector(PhieuHensState$));
  const loadingPhieuHens = useSelector(isloadingPhieuHensState$);

  React.useEffect(() => {
    setPhieuHens(PH);
  }, [PH]);

  React.useEffect(() => {
    if (trangthai === 0 && thoigian === 0) {
      setPhieuHens(PH);
    }
    if (trangthai === 1 && thoigian === 0) {
      setPhieuHens(SPHHT);
    }
    if (trangthai === 2 && thoigian === 0) {
      setPhieuHens(SPHCHT);
    }
    if (trangthai === 0 && thoigian === 1) {
      if (ngayBD != null) {
        const listPH = PH.filter(function (e) {
          return moment(e.NgayHen) <= moment(ngayKT) && moment(e.NgayHen) >= moment(ngayBD);
        });
        setPhieuHens(listPH);
      }
    }
    if (trangthai === 1 && thoigian === 1) {
      if (ngayBD != null) {
        const listPH = SPHHT.filter(function (e) {
          return moment(e.NgayHen) <= moment(ngayKT) && moment(e.NgayHen) >= moment(ngayBD);
        });
        setPhieuHens(listPH);
      }
    }
    if (trangthai === 2 && thoigian === 1) {
      if (ngayBD != null) {
        const listPH = SPHCHT.filter(function (e) {
          return moment(e.NgayHen) <= moment(ngayKT) && moment(e.NgayHen) >= moment(ngayBD);
        });
        setPhieuHens(listPH);
      }
    }
  }, [trangthai, thoigian, ngayBD, ngayKT]);
  const dataSource = PhieuHens;
  const columns = [
    {
      title: "Mã phiếu hẹn",
      dataIndex: "MaPH",
      key: "MaPH",
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
        return record.MaPH.toLowerCase().includes(value.toLowerCase());
      },
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
        return record.MaPBH.toLowerCase().includes(value.toLowerCase());
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
        return record.MaSP.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ngày hẹn",
      dataIndex: "NgayHen",
      key: "NgayHen",
      render: (NgayHen) => moment(NgayHen).format("DD-MM-YYYY"),
      // sorter: (a, b) => a.NgayHen - b.NgayHen,
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
        return record.NgayHen == value;
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      sorter: (a, b) => a.TrangThai - b.TrangThai,
      filters: [
        {
          text: "Hoàn thành",
          value: "Hoàn thành",
        },
        {
          text: "Chưa hoàn thành",
          value: "Chưa hoàn thành",
        },
      ],
      onFilter: (value, record) => record.TrangThai.indexOf(value) === 0,
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
      key: "GhiChu",
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
            placeholder="Nhập ghi chú cần tìm"
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
        return record.MaPH.toLowerCase().includes(value.toLowerCase());
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
            showColumnPickerProps={{ id: "PhieuHen" }}
            fileName="PhieuHenCSV"
          >
            Tải file CSV
          </ExportTableButton>
        </Space>
      </Row>

      <Table
        tableLayout={"auto"}
        loading={loadingPhieuHens}
        pagination={false}
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

export default PhieuHentable;
