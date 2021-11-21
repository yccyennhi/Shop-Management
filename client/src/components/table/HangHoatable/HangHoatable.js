import React, { useState } from "react";
import { ExportTableButton, Table } from "ant-table-extensions";

import {
  Input,
  Row,
  Col,
  Button,
  Dropdown,
  message,
  Menu,
  Image,
  Divider,
  Switch,
  Radio,
  Form,
  Space,
  Typography,
  Avatar,
} from "antd";
import UpdateSanPhamModal from "../../../components/modal/TaoSanPhamModal/updateSanPhamModal";

import { useDispatch, useSelector } from "react-redux";
import ExpandedRowRender from "./ExpandedRowRender";
import {
  SearchOutlined,
  DownOutlined,
  FileExcelOutlined,
  PlusOutlined,
  DollarTwoTone,
  ShopTwoTone,
  SafetyCertificateTwoTone,
  DatabaseTwoTone,
} from "@ant-design/icons";
import {
  SanPhamsState$,
  isloadingSanPhamsState$,
} from "../../../redux/selectors";
import * as actions from "../../../redux/actions";
const { Search } = Input;
const { Text } = Typography;

function HangHoatable({ trangthai, baohanh, currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const [SanPhams, setSanPhams] = useState(useSelector(SanPhamsState$));
  const SP = useSelector(SanPhamsState$);
  const loadingSanPhams = useSelector(isloadingSanPhamsState$);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);
  React.useEffect(() => {
    setSanPhams(SP);
  }, [SP]);
  React.useEffect(() => {
    if (trangthai == 1 && baohanh == 1) {
      setSanPhams(SP);
    }
    if (trangthai == 1 && baohanh == 2) {
      let listSP = SP.filter(function (e) {
        return e.BaoHanh == "Có bảo hành";
      });
      setSanPhams(listSP);
    }
    if (trangthai == 1 && baohanh == 3) {
      let listSP = SP.filter(function (e) {
        return e.BaoHanh == "Không bảo hành";
      });
      setSanPhams(listSP);
    }
    if (trangthai == 2 && baohanh == 1) {
      let listSP = SP.filter(function (e) {
        return e.TrangThai == "Đang kinh doanh";
      });
      setSanPhams(listSP);
    }
    if (trangthai == 2 && baohanh == 2) {
      let listSP = SP.filter(function (e) {
        return e.TrangThai == "Đang kinh doanh" && e.BaoHanh == "Có bảo hành";
      });

      setSanPhams(listSP);
    }
    if (trangthai == 2 && baohanh == 3) {
      let listSP = SP.filter(function (e) {
        return (
          e.TrangThai == "Đang kinh doanh" && e.BaoHanh == "Không bảo hành"
        );
      });

      setSanPhams(listSP);
    }
    if (trangthai == 3 && baohanh == 1) {
      let listSP = SP.filter(function (e) {
        return e.TrangThai == "Ngừng kinh doanh";
      });
      setSanPhams(listSP);
    }
    if (trangthai == 3 && baohanh == 2) {
      let listSP = SP.filter(function (e) {
        return e.TrangThai == "Ngừng kinh doanh" && e.BaoHanh == "Có bảo hành";
      });
      setSanPhams(listSP);
    }
    if (trangthai == 3 && baohanh == 3) {
      let listSP = SP.filter(function (e) {
        return (
          e.TrangThai == "Ngừng kinh doanh" && e.BaoHanh == "Không bảo hành"
        );
      });
      setSanPhams(listSP);
    }
    if (trangthai == 4 && baohanh == 1) {
      let listSP = SP.filter(function (e) {
        return e.TrangThai == "Hết hàng";
      });
      setSanPhams(listSP);
    }
    if (trangthai == 4 && baohanh == 2) {
      let listSP = SP.filter(function (e) {
        return e.TrangThai == "Hết hàng" && e.BaoHanh == "Có bảo hành";
      });
      setSanPhams(listSP);
    }
    if (trangthai == 4 && baohanh == 3) {
      let listSP = SP.filter(function (e) {
        return e.TrangThai == "Hết hàng" && e.BaoHanh == "Không bảo hành";
      });
      setSanPhams(listSP);
    }
  }, [trangthai, baohanh]);
  const dataSource = SanPhams;
  const columns = [
    {
      title: "",
      dataIndex: "HinhAnh",
      key: "HinhAnh",
      render: (HinhAnh) => <Image src={HinhAnh} style={{}} />,
      width: "80px",
    },
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
      onFilter: (value, record) => {
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
      sorter: (a, b) => {
        console.log();
        return a.TonKho - b.TonKho;
      },
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

  const SPDKD = SP.filter(function (e) {
    return e.TrangThai == "Đang kinh doanh";
  });

  const SPCBH = SP.filter(function (e) {
    return e.BaoHanh == "Có bảo hành";
  });

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
      <Row justify="start">
        <Space direction="horizontal" size={80}>
          <Space align="center" size={20}>
            <DatabaseTwoTone style={{ fontSize: "40px" }} />
            <Space direction="vertical" size={0}>
              <Text strong>{SP.length} sản phẩm</Text>
              <Text strong style={{ fontSize: "1.5rem" }}>
                {SP.length}
              </Text>
              <Text type="secondary">Tổng số lượng sản phẩm</Text>
            </Space>
          </Space>

          <Space align="center" size={20}>
            <ShopTwoTone style={{ fontSize: "40px" }} />
            <Space direction="vertical" size={0}>
              <Text strong>{SPDKD.length} sản phẩm</Text>
              <Text strong style={{ fontSize: "1.5rem" }}>
                {SPDKD.length}
              </Text>
              <Text type="secondary">Số sản phẩm đang kinh doanh</Text>
            </Space>
          </Space>
          <Space align="center">
            <SafetyCertificateTwoTone style={{ fontSize: "40px" }} />
            <Space direction="vertical" size={0}>
              <Text strong>{SPCBH.length} sản phẩm</Text>
              <Text strong style={{ fontSize: "1.5rem" }}>
                {SPCBH.length}
              </Text>
              <Text type="secondary">Số sản phẩm có bảo hành</Text>
            </Space>
          </Space>
        </Space>
      </Row>
      <Divider orientation="left"></Divider>

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
      <UpdateSanPhamModal currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
}

export default HangHoatable;
