import React from "react";
import { Button, PageHeader } from "antd";
import {
  DownloadOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import NhanVienTable from "../../components/table/NhanVienTable/NhanVienTable";

export default function NhanVienPage() {
  return (
    <>
      <div>
        <PageHeader
          className="site-page-header"
          title="Nhân viên"
          extra={[
            <Button icon={<PlusOutlined />} type="primary">
              Thêm nhân viên
            </Button>,
            <Button icon={<ImportOutlined />} type="primary">
              Import
            </Button>,
            <Button icon={<DownloadOutlined />} type="primary">
              Xuất file
            </Button>,
          ]}
        />
        <NhanVienTable />
      </div>
    </>
  );
}
