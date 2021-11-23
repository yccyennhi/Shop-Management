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
import {
  PhieuHensState$,
  isloadingPhieuHensState$,
} from "../../redux/selectors";
import PhieuHenModal from "../../components/modal/PhieuHenModal/PhieuHenModal";
const { Text } = Typography;
const { Content, Sider } = Layout;

export default function PhieuHenPage() {
  const [currentId, setCurrentId] = useState(null);
  const [thoigian, setThoigian] = useState(null);
  const [thang, setThang] = useState(null);
  const [trangthai, setTrangthai] = useState(null);
  const dispatch = useDispatch();
  const isShow = useSelector(isloadingPhieuHensState$);
  const PhieuHens = useSelector(PhieuHensState$);
  const dateNow = moment().toDate();
  const SPCH = PhieuHens.filter(function (e) {
    return moment(e.NgayKT) >= dateNow;
  });

  const SPHH = PhieuHens.filter(function (e) {
    return moment(e.NgayKT) < dateNow;
  });

  const openCreatePhieuHenModal = React.useCallback(() => {
    dispatch(actions.showTaoPhieuHenModal());
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
        <PageHeader className="site-page-header" title="Phiếu hẹn" />
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
              <Radio.Group>
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
              <Radio.Group>
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
            {/* <Card
              title="Trạng thái bảo trì"
              bordered={false}
              style={{ width: 250 }}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={0} onClick={() => {}}>
                    Tất cả
                  </Radio>
                  <Radio value={1}>Đã hoàn thành</Radio>
                  <Radio value={2}>Chưa hoàn thành</Radio>
                </Space>
              </Radio.Group>
            </Card> */}
          </Space>
        </Sider>
        <Content>
          <Layout style={{ padding: "17px 24px 24px" }}>
            <div className="site-layout-content">
              <Row justify="start">
                <Space direction="horizontal" size={200}>
                  <Space align="center" size={20}>
                    <SafetyCertificateTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>{PhieuHens.length} phiếu bảo hành</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {PhieuHens.length}
                      </Text>
                      <Text type="secondary">Tổng số lượng phiếu bảo hành</Text>
                    </Space>
                  </Space>
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
              </Row>
              <Divider orientation="left"></Divider>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreatePhieuHenModal}
              >
                Thêm phiếu bảo hành
              </Button>
              <PhieuHentable
                trangthai={trangthai}
                thoigian={thoigian}
                thang={thang}
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
