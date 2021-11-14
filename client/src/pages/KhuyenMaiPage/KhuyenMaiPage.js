import React from "react";
import { Menu, Layout, PageHeader, Col, Row, Button, Space } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  RestOutlined,
} from "@ant-design/icons";
import "./styles.css";
import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
const { SubMenu } = Menu;

export default function KhuyenMaiPage() {
  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Khuyến mãi" />
        <div>
          <Row justify="end">
            <Space>
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm khuyến mãi
              </Button>
              <Button type="secondary" icon={<RestOutlined />}>
                Xóa khuyến mãi
              </Button>
            </Space>
          </Row>
          <KhuyenMaitable />
        </div>
      </div>
    </>
  );
}
