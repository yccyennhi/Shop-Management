import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  Layout,
  PageHeader,
  Card,
  DatePicker,
  Space,
  Radio,
  Col,
  Typography,
  Divider,
  Row,
} from "antd";
import "./styles.css";

import "../../App.css";
import {
  DatabaseTwoTone,
  SafetyCertificateTwoTone,
  ShopTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import PhieuBaoHanhtable from "../../components/table/PhieuBaoHanhtable/PhieuBaoHanhtable";
import { PhieuBaoHanhsState$ } from "../../redux/selectors";
const { Text } = Typography;
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

export default function PhieuBaoHanhPage() {
  const [currentId, setCurrentId] = useState(null);
  const [baohanh, setBaohanh] = useState(null);

  const dispatch = useDispatch();
  const PhieuBaoHanhs = useSelector(PhieuBaoHanhsState$);

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <Layout>
      <Layout>
        <PageHeader className="site-page-header" title="Bảo hành" />
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
                  <Radio value={0} onClick={() => {}}>
                    Tất cả
                  </Radio>
                  <Radio value={1}>
                    <DatePicker onChange={onChange} picker="month" />
                  </Radio>
                  {/* <p>Lựa chọn khác</p>  */}
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
                      setBaohanh(0);
                    }}
                  >
                    Tất cả
                  </Radio>
                  <Radio
                    value={1}
                    onClick={() => {
                      setBaohanh(1);
                    }}
                  >
                    Còn hạn
                  </Radio>
                  <Radio
                    value={2}
                    onClick={() => {
                      setBaohanh(2);
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
                <Space direction="horizontal" size={80}>
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
                </Space>
              </Row>
              <Divider orientation="left"></Divider>
              <PhieuBaoHanhtable baohanh={baohanh} setCurrentId={setCurrentId} />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
