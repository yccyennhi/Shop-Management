import React from "react";
import { Button, Layout, PageHeader, Row, Space } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import NhanVienTable from "../../components/table/NhanVienTable/NhanVienTable";
import { Content } from "antd/lib/layout/layout";

export default function NhanVienPage() {
  return (
    <Layout>
      <PageHeader className="site-page-header" title="Nhân viên" />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content">
          <Row justify="end">
            <Space direction="horizontal">
              <Button icon={<PlusOutlined />} type="primary">
                Thêm nhân viên
              </Button>
              <Button icon={<ImportOutlined />} type="primary">
                Import
              </Button>
              <Button icon={<DownloadOutlined />} type="primary">
                Xuất file
              </Button>
            </Space>
          </Row>

          <NhanVienTable />
        </div>
      </Content>
    </Layout>
  );
}
