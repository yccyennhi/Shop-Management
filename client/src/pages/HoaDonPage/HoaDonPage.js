import React, { useCallback, useState } from "react";
import {
  PageHeader,
  Row,
  Button,
  Space,
  Layout
} from "antd";
import "./styles.css";
import {
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import DataTableHoaDon from "../../components/table/HoaDonTable/HoaDonTable.js";
import { useDispatch, useSelector } from "react-redux";
import TaoHoaDonModal from "../../components/modal/HoaDonModal/TaoHoaDonModal";
import { showTaoHoaDonModal, getHoaDons } from "../../redux/actions";
import { Content } from "antd/lib/layout/layout";
import { HoaDonsState$ } from "../../redux/selectors";

export default function HoaDonPage() {
  const dispatch = useDispatch();
  const openTaoSanPhamModal = useCallback(() => {
    dispatch(showTaoHoaDonModal());
  }, [dispatch]);
  const HoaDons = useSelector(HoaDonsState$);
  React.useEffect(() => {
    dispatch(getHoaDons.getHoaDonsRequest());
  }, [dispatch]);
  return (
    <Layout>
      <PageHeader className="site-page-header" title="Hóa Đơn" />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content">
          <Row justify="end">
            <Space>
              <Button type="primary" icon={<PlusOutlined /> } onClick={openTaoSanPhamModal}>
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
          <TaoHoaDonModal HoaDons = {HoaDons}/>
          <DataTableHoaDon />
        </div>
      </Content>
    </Layout>
    
  );
}
