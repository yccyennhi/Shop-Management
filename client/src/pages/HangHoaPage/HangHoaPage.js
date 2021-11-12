import React from "react";
import { Menu, Layout, Breadcrumb, Col, Row, Button } from "antd";
import "./styles.css";
import Logo from "../../assets/Logo.png";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function HangHoaPage() {
  return (
    <>
      <Layout>
        <Header>
         <Headerbar/>
        </Header>
      </Layout>
      <Layout className="layout">
        <Header>
          <Menubar />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">Content</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      ,
    </>
  );
}
