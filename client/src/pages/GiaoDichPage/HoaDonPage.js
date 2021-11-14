import React from "react";
import { PageHeader, Row, Button, Space } from "antd";
import "./styles.css";
import {
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import DataTableHoaDon from "../../components/table/HoaDonTable/DataTableHoaDon";

export default function HoaDonPage() {
  return (
    <>
    <div>
    <PageHeader className="site-page-header" title="Danh mục hóa đơn" />
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
    </div>      ,
    </>
  );
}
