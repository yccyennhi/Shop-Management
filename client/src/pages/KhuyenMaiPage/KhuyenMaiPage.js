import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { PageHeader, Row, Button, Space, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
import { showModal } from "../../redux/actions";
import KhuyenMaiModal from "../../components/modal/KhuyenMaiModal/KhuyenMaiModal";
import { Content } from "antd/lib/layout/layout";

export default function KhuyenMaiPage() {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  const openCreateKMModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Layout>
      <PageHeader className="site-page-header" title="Khuyến mãi" />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content">
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
              </Space>
            </Row>
            <KhuyenMaiModal currentId={currentId} setCurrentId={setCurrentId} />
            <KhuyenMaitable setCurrentId={setCurrentId} />
          </div>
        </div>
      </Content>
    </Layout>
  );
}
