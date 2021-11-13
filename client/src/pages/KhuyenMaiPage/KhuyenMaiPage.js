import React from "react";
import { Menu, Layout, PageHeader, Col, Row, Button, Space } from "antd";
import "./styles.css";
import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function HangHoaPage() {
  return (
    <>
      <Layout className="layout">
        <Header>
          <Headerbar />
        </Header>
      </Layout>
      <Layout className="layout">
        <Header>
          <Menubar />
        </Header>
      </Layout>
      <Layout>
        <Content style={{ padding: "0px 50px 50px 50px" }}>
        <PageHeader className="site-page-header" title="Hàng hóa" />,

          <div className="site-layout-content">
            <Row justify="end">
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm hàng hóa
                </Button>
                <Button type="primary" icon={<RestOutlined />}>
                  Xóa hàng hóa
                </Button>
                <Button type="primary" icon={<ImportOutlined />}>
                  Import
                </Button>
                <Button type="primary" icon={<DownloadOutlined />}>
                  Xuất file
                </Button>
              </Space>
            </Row>
              <HangHoatable />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      ,
    </>
  );
}
