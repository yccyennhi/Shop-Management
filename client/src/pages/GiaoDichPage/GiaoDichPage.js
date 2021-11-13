import React from "react";
import { Menu, Layout, Breadcrumb, Col, Row, Button } from "antd";
import "./styles.css";
import Logo from "../../assets/Logo.png";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
import Bodybar from "../../pages/GiaoDichPage/styles";
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function GiaoDichPage() {
  return (
    <>
      <Layout>
        <Header>
          <Headerbar />
        </Header>
      </Layout>
      <Layout className="layout">
        <Header>
          <Menubar />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>GiaoDich</Breadcrumb.Item>
          </Breadcrumb>
        </Content>
        <div className="site-layout-content">
          <Row justify="end">
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm hàng hóa
              </Button>
              <Button type="primary" icon={<ImportOutlined />}>
                Import
              </Button>
              <Button type="primary" icon={<DownloadOutlined />}>
                Xuất file
              </Button>
            </Space>
          </Row>
          <Bodybar />
        </div>
        <Footer style={{ textAlign: "center" }}>
          Ant Design �2018 Created by Ant UED
        </Footer>
      </Layout>
      ,
    </>
  );
}
