import React from "react";
import { Button, PageHeader } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import KhachHangTable from "../../components/table/KhachHangTable/KhachHangTable";

export default function KhachHangPage() {
  return (
    <>
      <div>
        <PageHeader
          className="site-page-header"
          title="Khách hàng"
          extra={[
            <Button icon={<PlusOutlined />} type="primary">
              Thêm khách hàng
            </Button>,
            <Button icon={<ImportOutlined />} type="primary">
              Import
            </Button>,
            <Button icon={<DownloadOutlined />} type="primary">
              Xuất file
            </Button>,
          ]}
        />
        <KhachHangTable />
      </div>
    </>
  );
}