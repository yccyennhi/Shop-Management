import React from "react";
import {
  PageHeader,
  Row,
  Button,
  Space,
  Layout
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
import TaoPhieuTraHangModal from "../../components/modal/TaoGiaoDichModal/TaoPhieuDoiTraModal";
import { showTaoPhieuTraHangModal } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Content } from "antd/lib/layout/layout";

export default function DoiTraPage() {
  const dispatch = useDispatch();
  const openTaoPhieuTraHangModal = React.useCallback(() => {
    dispatch(showTaoPhieuTraHangModal());
  }, [dispatch]);
  return (
    <Layout>
      <PageHeader className="site-page-header" title="Trả hàng" />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content">
        <Row justify="end">
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={openTaoPhieuTraHangModal}>
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
        <TaoPhieuTraHangModal/>
        <TraHangTable />
      </div>
      </Content>
    </Layout>
  );
}
