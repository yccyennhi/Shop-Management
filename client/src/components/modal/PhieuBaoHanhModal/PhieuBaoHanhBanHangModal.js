import React, { useState } from "react";
import * as actions from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  PhieuBaoHanhsState$,
  PhieuBaoHanhBanHangModalState$,
} from "../../../redux/selectors";
import PhieuBaoHanhtable from "../../../components/table/PhieuBaoHanhtable/PhieuBaoHanhtable";
import PhieuBaoHanhModal from "../../../components/modal/PhieuBaoHanhModal/PhieuBaoHanhModal";
import {
  Modal,
  Layout,
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
import {
  SafetyCertificateTwoTone,
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import moment from "moment";
const { Content, Sider, Header } = Layout;
const { Text } = Typography;

export default function PhieuBaoHanh() {
  const { isShow } = useSelector(PhieuBaoHanhBanHangModalState$);
  const [currentId, setCurrentId] = useState(null);
  const [thoigian, setThoigian] = useState(0);
  const [thang, setThang] = useState(null);
  const [trangthai, setTrangthai] = useState(0);
  const dispatch = useDispatch();
  const PhieuBaoHanhs = useSelector(PhieuBaoHanhsState$);
  const dateNow = moment().toDate();
  const SPCH = PhieuBaoHanhs.filter(function (e) {
    return moment(e.NgayKT) >= dateNow;
  });

  const SPHH = PhieuBaoHanhs.filter(function (e) {
    return moment(e.NgayKT) < dateNow;
  });


  const onClose = React.useCallback(() => {
    dispatch(actions.hidePhieuBaoHanhBanHangModal());
    setCurrentId(null);
  }, [dispatch]);

  function onChange(date, dateString) {
    setThang(moment(date).format("M"));
  }
  const body = (
    <>
      <Layout>
        <Layout>
          <Sider
            width={300}
            style={{ padding:"0px 0px 0px 24px", background:"#F0F2F5" }}
            className="site-layout-sider"
          >
            <Space direction="vertical">
              <Card
                title="Thời gian mua hàng"
                bordered={true}
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
                bordered={true}
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
                        <Text strong>
                          {PhieuBaoHanhs.length} phiếu bảo hành
                        </Text>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                          {PhieuBaoHanhs.length}
                        </Text>
                        <Text type="secondary">
                          Tổng số lượng phiếu bảo hành
                        </Text>
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
                {/* <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openCreatePhieuBaoHanhModal}
                >
                  Thêm phiếu bảo hành
                </Button> */}
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
    </>
  );

  return (
    <div>
      <Modal
        title={"Phiếu bảo hành"}
        visible={isShow}
        onCancel={onClose}
        width={1200}
        footer={[
            <Button key="back" onClick={onClose}>
              Cancel
            </Button>,
            
          ]}
      >
        {body}
      </Modal>
    </div>
  );
}
