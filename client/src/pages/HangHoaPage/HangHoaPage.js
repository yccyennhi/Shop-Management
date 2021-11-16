import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Menu, Layout, PageHeader, Col, Row, Button, Space, Modal } from "antd";
import "./styles.css";
import Logo from "../../assets/Logo.png";
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  RestOutlined,
} from "@ant-design/icons";
import HangHoatable from "../../components/table/HangHoatable/HangHoatable.js";
import Menubar from "../../components/header/Menubar/Menubar";
import Headerbar from "../../components/header/Headerbar/Headerbar";
import { showTaoSanPhamModal } from "../../redux/actions";
import TaoSanPhamModal from "../../components/modal/TaoSanPhamModal/createSanPhamModal";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function HangHoaPage() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const openTaoSanPhamModal = React.useCallback(() => {
    dispatch(showTaoSanPhamModal());
  }, [dispatch]);
  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Danh mục hàng hóa" />
        <div>
          <Row justify="end">
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openTaoSanPhamModal}
              >
                Thêm hàng hóa
              </Button>
              <TaoSanPhamModal/>
              <Button type="primary" icon={<ImportOutlined />}>
                Import
              </Button>
              <Button type="primary" icon={<DownloadOutlined />}>
                Xuất file
              </Button>
            </Space>
          </Row>
          <TaoSanPhamModal currentId={currentId} setCurrentId={setCurrentId}/>
          <HangHoatable setCurrentId={setCurrentId}/>
        </div>
      </div>
      ,
    </>
  );
}
