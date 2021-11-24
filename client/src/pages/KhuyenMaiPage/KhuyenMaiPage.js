import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PageHeader, Row, Button, Space, Layout, Card, Radio } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
import { showModal } from "../../redux/actions";
import KhuyenMaiModal from "../../components/modal/KhuyenMaiModal/KhuyenMaiModal";

import COLOR from "../../color.js";
import * as actions from "../../redux/actions";
import { KhuyenMaisState$ } from "../../redux/selectors";

const { Content, Sider } = Layout;

export default function KhuyenMaiPage() {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  //KhuyenMais
  React.useEffect(() => {
    dispatch(actions.getKhuyenMais.getKhuyenMaisRequest());
  }, [dispatch]);

  //Modal
  const openCreateKMModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  const KhuyenMais = useSelector(KhuyenMaisState$);
  const [dataSoure, setdataSoure] = useState(KhuyenMais);
  React.useEffect(() => {
    if(KhuyenMais) setdataSoure(KhuyenMais);
  }, [KhuyenMais]);

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
                    <Radio value={1} onClick={() => setdataSoure(KhuyenMais)}>
                      Tất cả
                    </Radio>
                    <Radio
                      value={2}
                      onClick={() =>
                        setdataSoure(
                          KhuyenMais.filter(
                            (KhuyenMai) => KhuyenMai.TrangThai === true
                          )
                        )
                      }
                    >
                      Đang áp dụng
                    </Radio>
                    <Radio
                      value={3}
                      onClick={() =>
                        setdataSoure(
                          KhuyenMais.filter(
                            (KhuyenMai) => KhuyenMai.TrangThai === false
                          )
                        )
                      }
                    >
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
            <KhuyenMaitable
              dataSource={dataSoure}
              setCurrentId={setCurrentId}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
