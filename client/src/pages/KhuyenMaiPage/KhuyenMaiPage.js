import React, { useState } from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/actions";
import { KhuyenMaisState$ } from "../../redux/selectors";

import {
  PageHeader,
  Row,
  Button,
  Space,
  Layout,
  Card,
  Radio,
  Typography,
  Col,
  Divider
} from "antd";
import {
  DatabaseTwoTone,
  StopTwoTone,
  ClockCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import COLOR from "../../color.js";

import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
import KhuyenMaiModal from "../../components/modal/KhuyenMaiModal/KhuyenMaiModal";
import Menubar from "../../components/header/Menubar/Menubar";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

export default function KhuyenMaiPage() {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  //KhuyenMais
  React.useEffect(() => {
    dispatch(actions.getKhuyenMais.getKhuyenMaisRequest());
  }, [dispatch]);

  //Modal
  const openCreateKMModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  const KhuyenMais = useSelector(KhuyenMaisState$);
  const [dataSoure, setdataSoure] = useState(KhuyenMais);

  React.useEffect(() => {
    if (KhuyenMais) setdataSoure(KhuyenMais);
  }, [KhuyenMais]);

  const SLKMDangApDung = KhuyenMais.filter(
    (KhuyenMai) => KhuyenMai.TrangThai === true
  ).length;

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
            title="Khuyến mãi"
          />
        </Content>
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px" }}
          className="site-layout-sider"
        >
          <div className="site-card-border-less-wrapper">
            <Space direction="vertical">
              <Card
                title="Trạng thái áp dụng"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setdataSoure(KhuyenMais)}>
                      Tất cả
                    </Radio>
                    <Radio
                      value={2}
                      onClick={() =>
                        setdataSoure(
                          KhuyenMais.filter(
                            (KhuyenMai) => KhuyenMai.TrangThai === true
                          )
                        )
                      }
                    >
                      Đang áp dụng
                    </Radio>
                    <Radio
                      value={3}
                      onClick={() =>
                        setdataSoure(
                          KhuyenMais.filter(
                            (KhuyenMai) => KhuyenMai.TrangThai === false
                          )
                        )
                      }
                    >
                      Không áp dụng
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
            </Space>
          </div>
        </Sider>
        <Content style={{ padding: "17px 24px 24px" }}>
          <div className="site-layout-content">
            <Row justify="start">
              <Col span={8}>
                <Space align="center" size={20}>
                  <DatabaseTwoTone style={{ fontSize: "40px" }} />
                  <Space direction="vertical" size={0}>
                    <Text strong>{KhuyenMais.length} khuyến mãi</Text>
                    <Text strong style={{ fontSize: "1.5rem" }}>
                      {KhuyenMais.length}
                    </Text>
                    <Text type="secondary">Tổng số lượng khuyến mãi</Text>
                  </Space>
                </Space>
              </Col>
              <Col span={8}>
                <Space align="center" size={20}>
                  <ClockCircleTwoTone style={{ fontSize: "40px" }} />
                  <Space direction="vertical" size={0}>
                    <Text strong>{SLKMDangApDung} khuyến mãi</Text>
                    <Text strong style={{ fontSize: "1.5rem" }}>
                      {SLKMDangApDung}
                    </Text>
                    <Text type="secondary">Số khuyến mãi đang áp dụng</Text>
                  </Space>
                </Space>
              </Col>
            <Col span={8}>
                <Space align="center" size={20}>
                  <StopTwoTone style={{ fontSize: "40px" }} />
                  <Space direction="vertical" size={0}>
                    <Text strong>{KhuyenMais.length - SLKMDangApDung} khuyến mãi</Text>
                    <Text strong style={{ fontSize: "1.5rem" }}>
                    {KhuyenMais.length - SLKMDangApDung}
                    </Text>
                    <Text type="secondary">Số khuyến mãi không còn áp dụng</Text>
                  </Space>
                </Space>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row justify="end">
              <Space>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openCreateKMModal}
                >
                  Thêm khuyến mãi
                </Button>
              </Space>
            </Row>
            <KhuyenMaiModal currentId={currentId} setCurrentId={setCurrentId} />
            <KhuyenMaitable
              dataSource={dataSoure}
              setCurrentId={setCurrentId}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
