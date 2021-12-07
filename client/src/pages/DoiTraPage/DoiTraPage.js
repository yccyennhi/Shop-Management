import React, { useState } from "react";
import {
  PageHeader,
  Row,
  Col,
  Button,
  Space,
  Layout,
  Card,
  Radio,
  DatePicker,
  Cascader,
  Typography,
} from "antd";
import "./styles.css";
import {
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  SearchOutlined,
  ContainerTwoTone,
  SnippetsTwoTone,
  SafetyCertificateTwoTone 
} from "@ant-design/icons";
import TraHangTable from "../../components/table/DoiTraTable/TraHangTable";
import TaoPhieuTraHangModal from "../../components/modal/DoiTraModal/TaoPhieuDoiTraModal";
import { showTaoPhieuTraHangModal } from "../../redux/actions";
import { PhieuDoiTrasState$, NhanViensState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Menubar from "../../components/header/Menubar/Menubar";
import COLOR from "../../color.js";
import moment from "moment";

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { Text } = Typography;

export default function DoiTraPage() {
  const dispatch = useDispatch();
  const PhieuDoiTras = useSelector(PhieuDoiTrasState$);
  const NhanViens = useSelector(NhanViensState$);
  const [ThoiGian, setThoiGian] = useState("");
  const [NV, setNV] = useState("");
  const [data, setData] = useState([]);
  const [valueradio, setvalueradio] = useState(6);
  const [SL, setSL] = useState(0);
  React.useEffect(() => {
    dispatch(actions.getPhieuDoiTras.getPhieuDoiTrasRequest());
    dispatch(actions.getNhanViens.getNhanViensRequest());
  }, [dispatch]);
  const openTaoPhieuTraHangModal = React.useCallback(() => {
    dispatch(showTaoPhieuTraHangModal());
  }, [dispatch]);

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

  React.useEffect(() => {
    let tamp = PhieuDoiTras;
    if (NV) tamp = PhieuDoiTras.filter((hd) => hd.MaNV === NV);
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
  }, [PhieuDoiTras, NV, ThoiGian]);

  React.useEffect(() => {
    let tong = 0;
    PhieuDoiTras.map((pdt) => (tong += pdt.SoLuong));
    setSL(tong);
  }, [PhieuDoiTras]);

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
            title="Trả hàng"
          />
        </Content>
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 20px" }}
          className="site-layout-sider"
        >
          <div className="site-card-border-less-wrapper">
            <Space direction="vertical">
              <Card
                title="Thời gian"
                bordered={false}
                style={{ width: 290, color: COLOR.darkblue }}
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
                title="Người tạo"
                bordered={false}
                style={{ width: 290, color: COLOR.darkblue }}
              >
                <Cascader
                  options={optionNV}
                  style={{ width: 225 }}
                  suffixIcon={<SearchOutlined />}
                  placeholder="Chọn nhân viên"
                  showSearch={filter}
                  onChange={(e) => setNV(e[0])}
                />
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
                      <Text strong>Tổng số lượng phiếu trả hàng</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {PhieuDoiTras.length}
                      </Text>
                      <Text type="secondary">
                        {PhieuDoiTras.length} phiếu trả hàng
                      </Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <ContainerTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>Số lượng phiếu hàng trong ngày</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {
                          PhieuDoiTras.filter(
                            (hd) =>
                              moment(hd.ThoiGian).format("DD-MM-YYYY") ===
                              moment().format("DD-MM-YYYY")
                          ).length
                        }
                      </Text>
                      <Text type="secondary">
                        {
                          PhieuDoiTras.filter(
                            (hd) =>
                              moment(hd.ThoiGian).format("DD-MM-YYYY") ===
                              moment().format("DD-MM-YYYY")
                          ).length
                        }{" "}
                        hóa đơn
                      </Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <SafetyCertificateTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>Tổng số lượng hàng trả</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {SL}
                      </Text>
                      <Text type="secondary">{SL} sản phẩm </Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Row justify="end">
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={openTaoPhieuTraHangModal}
                  >
                    Thêm phiếu trả hàng
                  </Button>
                  <Button type="primary" icon={<ImportOutlined />}>
                    Import
                  </Button>
                  <Button type="primary" icon={<DownloadOutlined />}>
                    Xuất file
                  </Button>
                </Space>
              </Row>
              <TaoPhieuTraHangModal
                PhieuDoiTras={PhieuDoiTras}
                NhanViens={NhanViens}
              />
              <TraHangTable PhieuDoiTras={data} />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
