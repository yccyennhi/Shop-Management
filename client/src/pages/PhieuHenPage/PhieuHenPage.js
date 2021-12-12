import React, { useState, useContext } from "react";
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
  Result
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
import PhieuHentable from "../../components/table/PhieuHenTable/PhieuHentable";
import { AuthContext } from "../../contexts/AuthContext";
import {
  PhieuHensState$,
  isloadingPhieuHensState$,
} from "../../redux/selectors";
import PhieuHenModal from "../../components/modal/PhieuHenModal/PhieuHenModal";
import Menubar from "../../components/header/Menubar/Menubar";
const { Text } = Typography;
const { Content, Sider, Header } = Layout;
const { RangePicker } = DatePicker;

export default function PhieuHenPage() {
  const [currentId, setCurrentId] = useState(null);
  const [thoigian, setThoigian] = useState(0);
  const [ngayBD, setngayBD] = useState(null);
  const [ngayKT, setngayKT] = useState(null);
  const [trangthai, setTrangthai] = useState(0);
  const dispatch = useDispatch();
  const isShow = useSelector(isloadingPhieuHensState$);
  const PhieuHens = useSelector(PhieuHensState$);
  const dateNow = moment().toDate();
  const SPCH = PhieuHens.filter(function (e) {
    return moment(e.NgayKT) >= dateNow;
  });

  const SPHH = PhieuHens.filter(function (e) {
    return e.TrangThai == "Chưa hoàn thành";
  });

  const openCreatePhieuHenModal = React.useCallback(() => {
    dispatch(actions.showTaoPhieuHenModal());
  }, [dispatch]);

  function onChange(date, dateString) {
    setngayBD(moment(date[0]));
    setngayKT(moment(date[1]));
  }
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);
  if (TaiKhoan.TenTK != "ADMIN") {
    return (
      <Result
        status="error"
        title="Hạn chế quyền truy cập"
        subTitle="Vui lòng kiểm tra lại đường link hoặc tài khoản đăng nhập!"
      />
    );
  }
  else
  return (
    <Layout>
      <Header>
        <Menubar />
      </Header>
      <Layout>
        <PageHeader
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Phiếu hẹn"
        />
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px", background:"#F0F2F5"  }}
          className="site-layout-sider"
        >
          <Space direction="vertical">
            <Card title="Lịch hẹn" bordered={false} style={{ width: 250 }}>
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
                    <RangePicker onChange={onChange} />
                    {/* <DatePicker onChange={onChange} picker="month" /> */}
                  </Radio>
                </Space>
              </Radio.Group>
            </Card>
            <Card
              title="Trạng thái hẹn"
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
                    Đã hoàn thành
                  </Radio>
                  <Radio
                    value={2}
                    onClick={() => {
                      setTrangthai(2);
                    }}
                  >
                    Chưa hoàn thành
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
                      <Text strong>{PhieuHens.length} phiếu hẹn</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {PhieuHens.length}
                      </Text>
                      <Text type="secondary">Tổng số lượng phiếu hẹn</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <CheckCircleTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>{SPCH.length} phiếu hẹn</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {SPCH.length}
                      </Text>
                      <Text type="secondary">Phiếu hẹn chưa đến hẹn</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <CloseCircleTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>{SPHH.length} phiếu hẹn</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {SPHH.length}
                      </Text>
                      <Text type="secondary">Phiếu hẹn khách chưa lấy</Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Divider orientation="left"></Divider>
              {/* <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreatePhieuHenModal}
              >
                Thêm phiếu hẹn
              </Button> */}
              <PhieuHentable
                trangthai={trangthai}
                thoigian={thoigian}
                ngayBD={ngayBD}
                ngayKT={ngayKT}
                setCurrentId={setCurrentId}
              />
              <PhieuHenModal
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
