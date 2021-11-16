import React, { useState } from "react";
import { Table, Input, Row, PageHeader, Descriptions, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";

import { KhuyenMaisState$ } from "../../../redux/selectors";
import ExpandedRowRender from "./ExpandedRowRender";

const { Search } = Input;

function KhuyenMaitable({setCurrentId}) {
  const dispatch = useDispatch();

  const KhuyenMais = useSelector(KhuyenMaisState$);

  React.useEffect(() => {
    dispatch(actions.getKhuyenMais.getKhuyenMaisRequest());
  }, [dispatch]);

  const dataSource = KhuyenMais;

  // //Format Date to Moment(dd/mm/yy)
  // dataSource.map((el) => {
    
  //   //Ngày bắt đầu
  //   let sDate = moment(el.NgayBD);
  //   el.NgayBD = sDate.format("DD/MM/YYYY");

  //   //Ngày kết thúc
  //   let eDate = moment(el.NgayKT);
  //   el.NgayKT = eDate.format("DD/MM/YYYY");
  // });

  const columns = [
    {
      title: "Mã KM",
      dataIndex: "MaKM",
      key: "MaKM",
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
        return record.MaKM.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Tên chương trình",
      dataIndex: "TenKM",
      key: "TenKM",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Search
            allowClear
            autoFocus
            placeholder="Nhập tên chương trình cần tìm"
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
        return record.TenKM.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "NgayBD",
      key: "NgayBD",
      sorter: (a, b) => a.NgayBD - b.NgayBD,
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
        return record.NgayBD == value;
      },
    },

    {
      title: "Ngày kết thúc",
      dataIndex: "NgayKT",
      key: "NgayKT",
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

    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      render: (TrangThai) => {
        return <p>{TrangThai == false ? "Ch­ưa kích hoạt" : "Đã kích hoạt"}</p>;
      },
      sorter: (a, b) => a.TrangThai - b.TrangThai,
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
      <Row></Row>

      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length > 0 ? `${selectedRowKeys.length} đã chọn` : ""}
      </span>

      <Table
        tableLayout={"auto"}
        loading={false}
        pagination={true}
        //  scroll={{ x: 1500, y: 500 }}
        columns={columns}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => <ExpandedRowRender record={record} setCurrentId={setCurrentId} />,

          rowExpandable: (record) => record.TenKM !== "Not Expandable",
        }}
        rowKey="_id"
        dataSource={dataSource}
      ></Table>
    </div>
  );
}

export default KhuyenMaitable;
