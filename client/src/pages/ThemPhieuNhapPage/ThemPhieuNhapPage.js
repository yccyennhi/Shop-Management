import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportTableButton, Table } from "ant-table-extensions";
import {
  Layout,
  PageHeader,
  Card,
  DatePicker,
  Space,
  Select,
  Radio,
  Button,
  Input,
  Form,
  Typography,
  Image,
  Divider,
  Row,
  Col,
  AutoComplete,
  Tooltip,
} from "antd";
import "./styles.css";
import moment from "moment";
import "../../App.css";
import {
  SafetyCertificateTwoTone,
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import * as actions from "../../redux/actions";
import PhieuNhaptable from "../../components/table/PhieuNhaptable/PhieuNhaptable";
import {
  PhieuNhapsState$,
  isloadingPhieuNhapsState$,
  SanPhamsState$,
} from "../../redux/selectors";
import SanPhamModal from "../../components/modal/SanPhamModal/SanPhamModal";

import ThemPhieuNhaptable from "../../components/table/ThemPhieuNhaptable/ThemPhieuNhaptable";
const { Text } = Typography;
const { Content, Sider } = Layout;
const { Search } = Input;

const { OptGroup, Option } = AutoComplete;
export default function ThemPhieuNhapPage() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [MaSP, setMaSP] = useState(null);
  const dateNow = moment().toDate();
  const SP = useSelector(SanPhamsState$);
  const [dataSource, setDataSource] = useState([]);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);

  const openCreateSanPhamModal = React.useCallback(() => {
    dispatch(actions.showTaoSanPhamModal());
  }, [dispatch]);

  const onHoanThanh = React.useCallback(() => {
    
  }, [dispatch]);

  const onLuuTam = React.useCallback(() => {
  }, [dispatch]);

  const options = SP.map((data) => {
    var o = Object.assign({});
    o.value = data.MaSP;
    o.label = `${data.MaSP}: ${data.TenSP}. Giá bán: ${data.GiaBan}. Tồn kho: ${data.TonKho}`;
    return o;
  });

  const [data, setData] = useState({
    MaPN: "",
    MaSP: [],
    NguoiNhap: "",
    NguoiTao: "",
    NgayTao: new Date(Date.now()),
    NgayCapNhat: new Date(Date.now()),
    TenNCC: "",
    SoLuong: [],
    GiaNhap: [],
    ThanhTien: [],
    GiamGia: 0,
    TongSoLuong: 0,
    TongTien: 0,
    TienTra: 0,
    TrangThai: "Phiếu tạm",
    GhiChu: "",
  });

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

  return (
    <Layout>
      <Layout>
        <PageHeader
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Thêm phiếu nhập"
        />
      </Layout>
      <Layout>
        <Content>
          <Layout style={{ padding: "0px 24px 24px" }}>
            <div
              className="site-layout-content"
              style={{ padding: "0px 24px 24px 24px" }}
            >
              <PageHeader title="Thêm sản phẩm muốn nhập" />
              <Row justify="start">
                <Tooltip
                  placement="bottomLeft"
                  title="Nhập mã sản phẩm cần tìm và chọn sản phẩm trong danh sách đổ xuống để thêm vào phiếu nhập, nếu chưa có vui lòng tạo mới sản phẩm!"
                >
                  <AutoComplete
                    // onSearch={handleSearch}
                    dropdownClassName="certain-category-search-dropdown"
                    style={{
                      width: 250,
                    }}
                    dropdownMatchSelectWidth={500}
                    style={{ width: "880px" }}
                    options={options}
                    filterOption
                    onSelect={(e) => {
                      setMaSP(e);
                    }}
                  >
                    <Input.Search
                      size="medium"
                      placeholder="Nhập mã sản phẩm muốn nhập kho"
                    />
                  </AutoComplete>
                </Tooltip>
                <Tooltip title="Thêm mới sản phẩm">
                  <Button
                    style={{
                      marginLeft: "10px",
                    }}
                    icon={<PlusOutlined />}
                    size="medium"
                    onClick={openCreateSanPhamModal}
                  />
                </Tooltip>
              </Row>
              <Divider orientation="left"></Divider>
              <ThemPhieuNhaptable
                MaSP={MaSP}
                data={dataSource}
                setData={setDataSource}
              />
            </div>
            <SanPhamModal currentId={currentId} setCurrentId={setCurrentId} />
          </Layout>
        </Content>
        <Sider
          width={500}
          style={{ padding: "0px 24px 0px 24px" }}
          className="site-layout-sider"
        >
          <div
            className="site-layout-content"
            style={{ padding: "0px 24px 24px 24px" }}
          >
            <PageHeader title="Thông tin phiếu nhập" />
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              layout="horizontal"
            >
              <Form.Item
                tooltip="Ngày tạo phiếu nhập là mặc định"
                label="Ngày tạo phiếu"
              >
                <DatePicker
                  defaultValue={moment(data.NgayTao)}
                  value={moment(data.NgayTao)}
                  disabled={true}
                  onChange={(e) => {
                    if (e) setData({ ...data, NgayTao: dateNow });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Mã phiếu nhập"
                tooltip="Mã phiếu nhập là thông tin duy nhất"
                required
              >
                <Input
                  placeholder="Nhập mã phiếu nhập"
                  value={data.MaPN}
                  onChange={(e) => setData({ ...data, MaPN: e.target.value })}
                  defaultValue={data.MaPN}
                />
              </Form.Item>
              <Form.Item label="Người tạo phiếu" required>
                <Input
                  placeholder="Nhập người tạo phiếu"
                  value={data.NguoiTao}
                  onChange={(e) =>
                    setData({ ...data, NguoiTao: e.target.value })
                  }
                  defaultValue={data.NguoiTao}
                />
              </Form.Item>
              <Form.Item
                label="Người nhập"
                tooltip="Người nhập hàng đến từ NCC"
                required
              >
                <Input
                  placeholder="Nhập người nhập"
                  value={data.NguoiNhap}
                  onChange={(e) =>
                    setData({ ...data, NguoiNhap: e.target.value })
                  }
                  defaultValue={data.NguoiNhap}
                />
              </Form.Item>
              <Form.Item
                tooltip="Trạng thái phiếu nhập"
                label="Trạng thái"
                required
              >
                <Select
                  placeholder="Chọn trạng thái"
                  value={data.TrangThai}
                  onChange={(e) => setData({ ...data, TrangThai: e })}
                  defaultValue={data.TrangThai}
                  disabled="true"
                >
                  <Select.Option value="Phiếu tạm">Phiếu tạm</Select.Option>
                  <Select.Option value="Đã nhập hàng">
                    Đã nhập hàng
                  </Select.Option>
                  <Select.Option value="Đã hủy">Đã nhập hàng</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Ghi chú" required>
                <Input
                  value={data.GhiChu}
                  onChange={(e) => setData({ ...data, GhiChu: e.target.value })}
                  defaultValue={data.GhiChu}
                />
              </Form.Item>

              <Form.Item label="Tổng tiền hàng" required>
                <Input
                  disabled="true"
                  value={data.TongTien}
                  defaultValue={data.TongTien}
                />
              </Form.Item>
              <Form.Item tooltip="Số tiền được giảm" label="Giảm giá" required>
                <Input
                  placeholder="Nhập số tiền được giảm"
                  value={data.GiamGia}
                  defaultValue={data.GiamGia}
                  onChange={(e) =>
                    setData({ ...data, GiamGia: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Cần trả NCC" required>
                <Input
                  tooltip="Số tiền cần trả cho NCC"
                  disabled={true}
                  value={data.TienTra}
                  defaultValue={data.TienTra}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Hoàn thành
                </Button>
                <Button htmlType="button">Lưu tạm</Button>
              </Form.Item>
            </Form>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}
