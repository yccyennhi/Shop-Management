import React, { useCallback } from "react";
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
import Logo from "../../assets/Logo.png";
import { Avatar, Image } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  RestOutlined,
} from "@ant-design/icons";
import DataTableHoaDon from "../../components/table/HoaDonTable/HoaDonTable.js";
import { useDispatch } from "react-redux";
import TaoHoaDonModal from "../../components/modal/TaoGiaoDichModal/TaoHoaDonModal";
import { showModal } from "../../redux/actions";

export default function HoaDonPage() {
  const dispatch = useDispatch();
  const openTaoSanPhamModal = React.useCallback(()=>{
    dispatch(showModal());
  }, [dispatch]);
  return (
    <>
      <PageHeader className="site-page-header" title="Hóa Đơn" />
      <div>
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
        <DataTableHoaDon />
      </div>
      ,
    </>
  );
}
