import React from "react";
import { Menu, Layout, PageHeader, Col, Row, Button, Space } from "antd";
import "./styles.css";
import Logo from "../../assets/Logo.png";
import { Avatar, Image } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  RestOutlined,
} from "@ant-design/icons";
import HangHoatable from "../../components/table/HangHoatable/HangHoatable.js";
import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function HangHoaPage() {
  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Hàng hóa" />,
        <div>
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
          <HangHoatable />
        </div>
      </div>
      ,
    </>
  );
}
