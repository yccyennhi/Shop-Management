import React, { useCallback } from "react";
import {
  PageHeader,
  Row,
  Button,
  Space,
} from "antd";
import "./styles.css";
import {
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import DataTableHoaDon from "../../components/table/HoaDonTable/HoaDonTable.js";
import { useDispatch } from "react-redux";
import TaoHoaDonModal from "../../components/modal/TaoGiaoDichModal/TaoHoaDonModal";
import { showTaoHoaDonModal } from "../../redux/actions";

export default function HoaDonPage() {
  const dispatch = useDispatch();
  const openTaoSanPhamModal = React.useCallback(()=>{
    dispatch(showTaoHoaDonModal());
  }, [dispatch]);
  return (
    <>
      <PageHeader className="site-page-header" title="Hóa Đơn" />
      <div style = {{marginBottom : '20px'}}>
        <Row justify="end">
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={openTaoSanPhamModal}>
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
        <TaoHoaDonModal/>
      </div>
      <DataTableHoaDon />
      ,
    </>
  );
}
