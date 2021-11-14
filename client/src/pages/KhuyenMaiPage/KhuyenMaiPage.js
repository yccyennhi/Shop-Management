import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Menu, Layout, PageHeader, Col, Row, Button, Space, Modal } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
  RestOutlined,
} from "@ant-design/icons";
import "./styles.css";

import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
import { showModal } from "../../redux/actions";
import CreateKhuyenMaiModal from "../../components/CreateKMModal/CreateKhuyenMaiModal";

export default function KhuyenMaiPage() {
  const dispatch = useDispatch();
  const openCreateKMModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Khuyến mãi" />
        <div>
          <Row justify="end">
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreateKMModal}
              >
                Thêm khuyến mãi
              </Button>
              <Button type="secondary" icon={<RestOutlined />}>
                Xóa khuyến mãi
              </Button>
            </Space>
          </Row>
          <CreateKhuyenMaiModal />
          <KhuyenMaitable />
        </div>
      </div>
    </>
  );
}
