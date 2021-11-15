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
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  RestOutlined,
} from "@ant-design/icons";
import TraHangTable from "../../components/table/HoaDonTable/TraHangTable";
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function DoiTraPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Trả hàng" />
      <div>
        <Row justify="end">
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm phiếu trả hàng
            </Button>
            <Button type="primary" icon={<ImportOutlined />}>
              Import
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Xuất file
            </Button>
          </Space>
        </Row>
        <TraHangTable />
      </div>
      ,
    </>
  );
}
