import React, { useCallback, useState, useContext } from "react";
import {
  PageHeader,
  Row,
  Button,
  Space,
  Layout,
  Col,
  Typography,
  Divider,
  Radio,
  Card,
  DatePicker,
  Cascader,
  Result,
} from "antd";
import "./styles.css";
import COLOR from "../../color.js";
import {
  PlusOutlined,
  SnippetsTwoTone,
  DownloadOutlined,
  SearchOutlined,
  ContainerTwoTone,
  DollarTwoTone,
} from "@ant-design/icons";
import DataTableHoaDon from "../../components/table/HoaDonTable/HoaDonTable.js";
import { AuthContext } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getHoaDons, getNhanViens } from "../../redux/actions";
import { HoaDonsState$, NhanViensState$ } from "../../redux/selectors";
import { useHistory } from "react-router-dom";
import Menubar from "../../components/header/Menubar/Menubar";
import moment from "moment";
const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { RangePicker } = DatePicker;
export default function HoaDonPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const HoaDons = useSelector(HoaDonsState$);
  const NhanViens = useSelector(NhanViensState$);
  const [GiaTien, SetGiaTien] = useState(1);
  const [ThoiGian, setThoiGian] = useState("");
  const [NV, setNV] = useState("");
  const [data, setData] = useState([]);
  const [valueradio, setvalueradio] = useState(6);
  const [tongTien, setTongTien] = useState(0);
  React.useEffect(() => {
    dispatch(getHoaDons.getHoaDonsRequest());
    dispatch(getNhanViens.getNhanViensRequest());
  }, [dispatch]);
  React.useEffect(() => {
    let tamp = [];
    switch (GiaTien) {
      case 1:
        tamp = HoaDons;
        break;
      case 2:
        tamp = HoaDons.filter((hd) => hd.ThanhTien <= 1000000);
        break;
      case 3:
        tamp = HoaDons.filter(
          (hd) => hd.ThanhTien <= 5000000 && hd.ThanhTien > 1000000
        );
        break;
      default:
        tamp = HoaDons.filter((hd) => hd.ThanhTien > 5000000);
        break;
    }
    if (NV) tamp = tamp.filter((hd) => hd.MaNV === NV);
    if (ThoiGian)
      switch (valueradio) {
        case 1:
          tamp = tamp.filter(
            (hd) =>
              moment(hd.ThoiGian).format("DD-MM-YYYY") ===
              ThoiGian.format("DD-MM-YYYY")
          );
          break;
        case 2:
          tamp = tamp.filter(
            (hd) =>
              moment(hd.ThoiGian).format("WW-YYYY") ===
              ThoiGian.format("WW-YYYY")
          );
          break;
        case 3:
          tamp = tamp.filter(
            (hd) =>
              moment(hd.ThoiGian).format("MM-YYYY") ===
              ThoiGian.format("MM-YYYY")
          );
          break;
        case 4:
          tamp = tamp.filter(
            (hd) =>
              moment(hd.ThoiGian).format("YYYY") === ThoiGian.format("YYYY")
          );
          break;
        case 5:
          tamp = tamp.filter(
            (hd) =>
              moment(hd.ThoiGian).format("DD-MM-YYYY") <=
                ThoiGian[1].format("DD-MM-YYYY") &&
              moment(hd.ThoiGian).format("DD-MM-YYYY") >=
                ThoiGian[0].format("DD-MM-YYYY")
          );
          break;
        default:
          break;
      }
    setData(tamp);
  }, [HoaDons, GiaTien, NV, ThoiGian]);
  React.useEffect(() => {
    let Tong = 0;
    HoaDons.map((hd) => (Tong += hd.ThanhTien));
    setTongTien(Tong);
  }, [HoaDons]);
  const optionNV = React.useMemo(() => {
    return NhanViens.map((NV) => ({
      value: NV.MaNV,
      label: NV.MaNV + " " + NV.TenNV,
    }));
  }, [NhanViens]);

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);
  if (TaiKhoan.TenTK != "ADMIN") {
    return (
      <Result
        className="error-page"
        status="error"
        title="Hạn chế quyền truy cập"
        subTitle="Vui lòng kiểm tra lại đường link hoặc tài khoản đăng nhập!"
      />
    );
  }
  return (
    <Layout>
      <Header>
        <Menubar />
      </Header>
      <Layout>
        <Content>
          <PageHeader
            onBack={() => window.history.back()}
            className="site-page-header"
            title="Hóa Đơn"
          />
        </Content>
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 20px", background: "#F0F2F5" }}
          className="site-layout-sider"
        >
          <div className="site-card-border-less-wrapper">
            <Space direction="vertical">
              <Card
                title="Thời gian"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group
                  value={valueradio}
                  onChange={(e) => setvalueradio(e.target.value)}
                >
                  <Space direction="vertical">
                    <Radio value={6} onClick={() => setThoiGian()}>
                      Tất cả
                    </Radio>
                    <Radio value={1} onClick={() => setThoiGian(moment())}>
                      Theo ngày
                      {valueradio === 1 ? (
                        <DatePicker
                          format="DD-MM-YYYY"
                          defaultValue={moment()}
                          disabledDate={disabledDate}
                          onChange={(e) => setThoiGian(e)}
                        />
                      ) : null}
                    </Radio>
                    <Radio value={2} onClick={() => setThoiGian(moment())}>
                      Theo tuần
                      {valueradio === 2 ? (
                        <DatePicker
                          picker="week"
                          format="WW-YYYY"
                          defaultValue={moment()}
                          disabledDate={disabledDate}
                          onChange={(e) => setThoiGian(e)}
                        />
                      ) : null}
                    </Radio>
                    <Radio value={3} onClick={() => setThoiGian(moment())}>
                      Theo tháng
                      {valueradio === 3 ? (
                        <DatePicker
                          picker="month"
                          format="MM-YYYY"
                          defaultValue={moment()}
                          disabledDate={disabledDate}
                          onChange={(e) => setThoiGian(e)}
                        />
                      ) : null}
                    </Radio>
                    <Radio value={4} onClick={() => setThoiGian(moment())}>
                      Theo năm
                      {valueradio === 4 ? (
                        <DatePicker
                          picker="year"
                          defaultValue={moment()}
                          disabledDate={disabledDate}
                          onChange={(e) => setThoiGian(e)}
                        />
                      ) : null}
                    </Radio>
                    <Radio value={5}>
                      Khác:
                      {valueradio === 5 ? (
                        <RangePicker
                          dateRender={(current) => {
                            const style = {};
                            if (current.date() === 1) {
                              style.border = "1px solid #1890ff";
                              style.borderRadius = "50%";
                            }
                            return (
                              <div
                                className="ant-picker-cell-inner"
                                style={style}
                              >
                                {current.date()}
                              </div>
                            );
                          }}
                          disabledDate={disabledDate}
                          onChange={(e) => setThoiGian(e)}
                        />
                      ) : null}
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
              <Card
                title="Người bán"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Cascader
                  options={optionNV}
                  style={{ width: 200 }}
                  suffixIcon={<SearchOutlined />}
                  placeholder="Chọn nhân viên"
                  showSearch={filter}
                  onChange={(e) => setNV(e[0])}
                />
              </Card>
              <Card
                title="Giá tiền"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => SetGiaTien(1)}>
                      Tất cả
                    </Radio>
                    <Radio value={2} onClick={() => SetGiaTien(2)}>
                      Dưới 1.000.000đ
                    </Radio>
                    <Radio value={3} onClick={() => SetGiaTien(3)}>
                      Từ 1.000.000đ đến 5.000.000đ
                    </Radio>
                    <Radio value={4} onClick={() => SetGiaTien(4)}>
                      Trên 5.000.000đ
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
            </Space>
          </div>
        </Sider>
        <Content style={{ padding: "0px 0px" }}>
          <Layout style={{ padding: "17px 24px 24px" }}>
            <div className="site-layout-content">
              <Row justify="start">
                <Col span={8}>
                  <Space align="center" size={20}>
                    <SnippetsTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>Tổng số lượng hóa đơn</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {HoaDons.length}
                      </Text>
                      <Text type="secondary">{HoaDons.length} hóa đơn</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <ContainerTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>Số lượng hóa đơn trong ngày</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {
                          HoaDons.filter(
                            (hd) =>
                              moment(hd.ThoiGian).format("DD-MM-YYYY") ===
                              moment().format("DD-MM-YYYY")
                          ).length
                        }
                      </Text>
                      <Text type="secondary">
                        {
                          HoaDons.filter(
                            (hd) =>
                              moment(hd.ThoiGian).format("DD-MM-YYYY") ===
                              moment().format("DD-MM-YYYY")
                          ).length
                        }
                         hóa đơn
                      </Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <SnippetsTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>Tổng tiền</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {`${tongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                      <Text type="secondary">
                        {`${tongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        VNĐ
                      </Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row justify="start" style={{ marginBottom: 15 }}>
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => history.push("/Sales")}
                  >
                    Thêm hóa đơn
                  </Button>
                </Space>
              </Row>
              <DataTableHoaDon HoaDons={data} />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
