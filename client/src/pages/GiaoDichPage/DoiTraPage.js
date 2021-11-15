import React from "react";
import { PageHeader, Row, Button, Space } from "antd";
import "./styles.css";
import {
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import DoiTraTable from "../../components/table/HoaDonsTable/DoiTraTable";

export default function DoiTraPage() {
  return (
    <>
    <div>
    <PageHeader className="site-page-header" title="Danh mục phiếu đổi trả" />
      <div>
        <Row justify="end">
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm phiếu đổi trả
            </Button>
            <Button type="primary" icon={<ImportOutlined />}>
              Import
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Xuất file
            </Button>
          </Space>
        </Row>
        <DoiTraTable/>
      </div>
    </div>      ,
    </>
  );
}
