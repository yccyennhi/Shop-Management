import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Menu,
  Layout,
  PageHeader,
  Card,
  DatePicker,
  Space,
  Radio,
  Col,
  Row,
} from "antd";
import "./styles.css";
import "../../App.css";
import PhieuBaoHanhtable from "../../components/table/PhieuBaoHanhtable/PhieuBaoHanhtable";
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

export default function PhieuBaoHanhPage() {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  return (
    <Layout>
      <Layout>
        <PageHeader className="site-page-header" title="Bảo hành bảo trì" />
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px" }}
          className="site-layout-sider"
        >
          <Space direction="vertical">
            <Card title="Trạng thái bảo hành" bordered={false} style={{width:300}}>
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={0} onClick={() => {}}>
                    Tất cả
                  </Radio>
                  <Radio value={1}>Còn hạn</Radio>
                  <Radio value={2}>Hết hạn</Radio>
                </Space>
              </Radio.Group>
            </Card>{" "}
          </Space>
        </Sider>
        <Content>
          <Layout style={{ padding: "17px 24px 24px" }}>
            <div className="site-layout-content">
              <PhieuBaoHanhtable setCurrentId={setCurrentId} />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
