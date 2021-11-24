import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { PageHeader, Row, Button, Space, Layout, Card, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
import { showModal } from "../../redux/actions";
import KhuyenMaiModal from "../../components/modal/KhuyenMaiModal/KhuyenMaiModal";

import COLOR from "../../color.js";

const { Content, Sider } = Layout;

export default function KhuyenMaiPage() {
  const [currentId, setCurrentId] = useState(null);

  const [trangthai, setTrangthai] = useState(null);

  const dispatch = useDispatch();

  const openCreateKMModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Layout>
      <Layout>
      <Content>
      <PageHeader className="site-page-header" title="Khuyến mãi" />
   </Content>
   </Layout>
     <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px" }}
          className="site-layout-sider"
        >
          <div className="site-card-border-less-wrapper">
          <Space direction="vertical">
              <Card
                title="Trạng thái áp dụng"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setTrangthai(null)}>
                      Tất cả
                    </Radio>
                    <Radio value={2} onClick={() => setTrangthai(true)}>
                      Đang áp dụng
                    </Radio>
                    <Radio value={3} onClick={() => setTrangthai(false)}>
                     Không áp dụng
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
              </Space>
          </div>
        </Sider>
        <Content style={{ padding: "17px 24px 24px" }}>
          <div className="site-layout-content">
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
            <KhuyenMaitable filterStatus = {trangthai} setCurrentId={setCurrentId} />
          </div>
      </Content>
      
   </Layout>
    </Layout>
  );
}
