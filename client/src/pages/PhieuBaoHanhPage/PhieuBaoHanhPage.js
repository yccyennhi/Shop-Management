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

import PhieuBaoHanhtable from "../../components/table/PhieuBaoHanhtable/PhieuBaoHanhtable";
import { showModal } from "../../redux/actions";

export default function PhieuBaoHanhPage() {

  const [currentId, setCurrentId] = useState(null);

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
              {/* <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreateKMModal}
              >
                Thêm khuyến mãi
              </Button>
              <Button type="secondary" icon={<RestOutlined />}>
                Xóa khuyến mãi
              </Button> */}
            </Space>
          </Row>
          <PhieuBaoHanhtable setCurrentId={setCurrentId} />
        </div>
      </div>
    </>
  );
}
