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
} from "../../redux/selectors";
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
  const PhieuNhaps = useSelector(PhieuNhapsState$);
  const dateNow = moment().toDate();
  const PNTN = PhieuNhaps.filter(function (e) {
    return moment(e.NgayTao).format("M") == moment(dateNow).format("M");
  });

  const PNHT = PhieuNhaps.filter(function (e) {
    return (
      e.TrangThai == "Đã nhập hàng" &&
      moment(e.NgayTao).format("M") == moment(dateNow).format("M")
    );
  });

  function onChange(date, dateString) {
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
              title="Thời gian nhập hàng"
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
                    Đã nhập hàng
                  </Radio>
                  <Radio
                    value={3}
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
                      <Text strong>{PNTN.length} phiếu nhập</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {PNTN.length}
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
                        <Text strong>{PNHT.length} phiếu nhập</Text>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                          {PNHT.length}
                        </Text>
                        <Text type="secondary">Phiếu nhập hoàn thành trong tháng</Text>
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
