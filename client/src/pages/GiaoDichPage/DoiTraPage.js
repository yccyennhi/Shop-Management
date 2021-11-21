import React from "react";
import {
  PageHeader,
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
import TaoPhieuTraHangModal from "../../components/modal/TaoGiaoDichModal/TaoPhieuDoiTraModal";
import { showTaoPhieuTraHangModal } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function DoiTraPage() {
  const dispatch = useDispatch();
  const openTaoPhieuTraHangModal = React.useCallback(()=>{
    dispatch(showTaoPhieuTraHangModal());
  }, [dispatch]);
  return (
    <>
      <PageHeader className="site-page-header" title="Trả hàng" />
      <div>
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
      ,
    </>
  );
}
