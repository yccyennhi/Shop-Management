import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  PageHeader,
  Card,
  DatePicker,
  Space,
  Radio,
  Button,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import "./styles.css";
import moment from "moment";
import "../../App.css";
import { useHistory } from "react-router-dom";
import {
  SafetyCertificateTwoTone,
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import * as actions from "../../redux/actions";
import PhieuNhaptable from "../../components/table/PhieuNhaptable/PhieuNhaptable";
import {
  PhieuNhapsState$,
  isloadingPhieuNhapsState$,
} from "../../redux/selectors";
import PhieuNhapModal from "../../components/modal/PhieuNhapModal/PhieuNhapModal";
import ThemPhieuNhapPage from "../ThemPhieuNhapPage/ThemPhieuNhapPage";
const { Text } = Typography;
const { Content, Sider } = Layout;

export default function PhieuNhapPage() {
  const history = useHistory();
  const handleNhapHang = () => {
    dispatch(actions.setIdThemPhieuNhapPage(""));
    history.push("/ThemPhieuNhaps");
  };
  const [currentId, setCurrentId] = useState(null);
  const [thoigian, setThoigian] = useState(0);
  const [thang, setThang] = useState(null);
  const [trangthai, setTrangthai] = useState(0);
  const dispatch = useDispatch();
  const isShow = useSelector(isloadingPhieuNhapsState$);
  const PhieuNhaps = useSelector(PhieuNhapsState$);
  const dateNow = moment().toDate();
  const SPCH = PhieuNhaps.filter(function (e) {
    return moment(e.NgayKT) >= dateNow;
  });

  const SPHH = PhieuNhaps.filter(function (e) {
    return moment(e.NgayKT) < dateNow;
  });

  const openCreatePhieuNhapModal = React.useCallback(() => {
    dispatch(actions.showTaoPhieuNhapModal());
    console.log("isshow", isShow);
  }, [dispatch]);

  function onChange(date, dateString) {
    console.log(date, "datétring", dateString);
    console.log(moment(date).format("M"));
    setThang(moment(date).format("M"));
  }
  return (
    <Layout>
      <Layout>
        <PageHeader className="site-page-header" title="Nhập hàng" />
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px" }}
          className="site-layout-sider"
        >
          <Space direction="vertical">
            <Card
              title="Thời gian mua hàng"
              bordered={false}
              style={{ width: 250 }}
            >
              <Radio.Group defaultValue={0}>
                <Space direction="vertical">
                  <Radio
                    value={0}
                    onClick={() => {
                      setThoigian(0);
                    }}
                  >
                    Tất cả
                  </Radio>
                  <Radio
                    value={1}
                    onClick={() => {
                      setThoigian(1);
                    }}
                  >
                    <DatePicker onChange={onChange} picker="month" />
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
            <Card
              title="Trạng thái phiếu nhập"
              bordered={false}
              style={{ width: 250 }}
            >
              <Radio.Group defaultValue={0}>
                <Space direction="vertical">
                  <Radio
                    value={0}
                    onClick={() => {
                      setTrangthai(0);
                    }}
                  >
                    Tất cả
                  </Radio>
                  <Radio
                    value={1}
                    onClick={() => {
                      setTrangthai(1);
                    }}
                  >
                    Phiếu tạm
                  </Radio>
                  <Radio
                    value={2}
                    onClick={() => {
                      setTrangthai(2);
                    }}
                  >
                    Đã hoàn thành
                  </Radio>
                  <Radio
                    value={2}
                    onClick={() => {
                      setTrangthai(3);
                    }}
                  >
                    Đã hủy
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
          </Space>
        </Sider>
        <Content>
          <Layout style={{ padding: "17px 24px 24px" }}>
            <div className="site-layout-content">
              <Row justify="start">
                <Col span={8}>
                  <Space align="center" size={20}>
                    <SafetyCertificateTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>{PhieuNhaps.length} phiếu nhập</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {PhieuNhaps.length}
                      </Text>
                      <Text type="secondary">Tổng số lượng phiếu nhập</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <CheckCircleTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>{SPCH.length} phiếu nhập</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {SPCH.length}
                      </Text>
                      <Text type="secondary">Phiếu nhập tháng này</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="horizontal" size={200}>
                    <Space align="center" size={20}>
                      <CloseCircleTwoTone style={{ fontSize: "40px" }} />
                      <Space direction="vertical" size={0}>
                        <Text strong>{SPHH.length} phiếu nhập</Text>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                          {SPHH.length}
                        </Text>
                        <Text type="secondary">Phiếu nhập hoàn thành</Text>
                      </Space>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Divider orientation="left"></Divider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleNhapHang}
              >
                Thêm phiếu nhập
              </Button>
              <PhieuNhaptable
                trangthai={trangthai}
                thoigian={thoigian}
                thang={thang}
                setCurrentId={setCurrentId}
              />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
