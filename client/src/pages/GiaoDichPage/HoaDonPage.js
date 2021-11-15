import React from "react";
import {
  Menu,
  Layout,
  Breadcrumb,
  PageHeader,
  Col,
  Row,
  Button,
  Space,
} from "antd";
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
import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
import Bodybar from "../../pages/GiaoDichPage/styles";
import DataTableHoaDon from "../../components/table/HoaDonTable/DataTableHoaDon";
import FormHoaDon from "./FormHoaDon";
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function HoaDonPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Hóa Đơn" />
      <div>
        <Row justify="end">
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm hóa đơn
            </Button>
            <Button type="primary" icon={<ImportOutlined />}>
              Import
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Xuất file
            </Button>
          </Space>
        </Row>
        <DataTableHoaDon />
      </div>
      ,
    </>
  );
}
