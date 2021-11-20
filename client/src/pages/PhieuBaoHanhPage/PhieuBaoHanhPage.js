import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Menu,
  Layout,
  PageHeader,
  Card,
  DatePicker,
  Space,
  Col,
  Row,
} from "antd";
import "./styles.css";
import "../../App.css";
import PhieuBaoHanhtable from "../../components/table/PhieuBaoHanhtable/PhieuBaoHanhtable";
import ThoiGianMuaHangcard from "../../components/card/PhieuBaoHanh/ThoiGianMuaHangcard";
import TrangThaiBaoHanhcard from "../../components/card/PhieuBaoHanh/TrangThaiBaoHanhcard";
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
              <ThoiGianMuaHangcard />
              <TrangThaiBaoHanhcard />
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
