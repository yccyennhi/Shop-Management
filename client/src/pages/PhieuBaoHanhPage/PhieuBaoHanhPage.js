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
import {
  SafetyCertificateTwoTone,
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import * as actions from "../../redux/actions";
import PhieuBaoHanhtable from "../../components/table/PhieuBaoHanhtable/PhieuBaoHanhtable";
import {
  PhieuBaoHanhsState$,
  isloadingPhieuBaoHanhsState$,
} from "../../redux/selectors";
import PhieuBaoHanhModal from "../../components/modal/PhieuBaoHanhModal/PhieuBaoHanhModal";
import Menubar from "../../components/header/Menubar/Menubar";
const { Text } = Typography;
const { Content, Sider, Header } = Layout;

export default function PhieuBaoHanhPage() {
  const [currentId, setCurrentId] = useState(null);
  const [thoigian, setThoigian] = useState(0);
  const [thang, setThang] = useState(null);
  const [trangthai, setTrangthai] = useState(0);
  const dispatch = useDispatch();
  const isShow = useSelector(isloadingPhieuBaoHanhsState$);
  const PhieuBaoHanhs = useSelector(PhieuBaoHanhsState$);
  const dateNow = moment().toDate();
  const SPCH = PhieuBaoHanhs.filter(function (e) {
    return moment(e.NgayKT) >= dateNow;
  });

  const SPHH = PhieuBaoHanhs.filter(function (e) {
    return moment(e.NgayKT) < dateNow;
  });

  const openCreatePhieuBaoHanhModal = React.useCallback(() => {
    dispatch(actions.showTaoPhieuBaoHanhModal());
    console.log("isshow", isShow);
  }, [dispatch]);

  function onChange(date, dateString) {
    console.log(date, "datétring", dateString);
    console.log(moment(date).format("M"));
    setThang(moment(date).format("M"));
  }
  return (
    <Layout>
      <Header>
        <Menubar />
      </Header>
      <Layout>
        <PageHeader
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Bảo hành"
        />
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
              title="Trạng thái bảo hành"
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
                    Còn hạn
                  </Radio>
                  <Radio
                    value={2}
                    onClick={() => {
                      setTrangthai(2);
                    }}
                  >
                    Hết hạn
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
                      <Text strong>{PhieuBaoHanhs.length} phiếu bảo hành</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {PhieuBaoHanhs.length}
                      </Text>
                      <Text type="secondary">Tổng số lượng phiếu bảo hành</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <CheckCircleTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>{SPCH.length} phiếu bảo hành</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {SPCH.length}
                      </Text>
                      <Text type="secondary">Phiếu bảo hành còn hạn</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="horizontal" size={200}>
                    <Space align="center" size={20}>
                      <CloseCircleTwoTone style={{ fontSize: "40px" }} />
                      <Space direction="vertical" size={0}>
                        <Text strong>{SPHH.length} phiếu bảo hành</Text>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                          {SPHH.length}
                        </Text>
                        <Text type="secondary">Phiếu bảo hành hết hạn</Text>
                      </Space>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Divider orientation="left"></Divider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreatePhieuBaoHanhModal}
              >
                Thêm phiếu bảo hành
              </Button>
              <PhieuBaoHanhtable
                trangthai={trangthai}
                thoigian={thoigian}
                thang={thang}
                setCurrentId={setCurrentId}
              />
              <PhieuBaoHanhModal
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
