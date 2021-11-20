import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { Menu, Layout, PageHeader, Card, DatePicker, Space } from "antd";
import "./styles.css";

import HangHoatable from "../../components/table/HangHoatable/HangHoatable.js";

import * as actions from "../../redux/actions";
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

const { SubMenu } = Menu;

export default function HangHoaPage() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const openTaoSanPhamModal = React.useCallback(() => {
    dispatch(actions.showTaoSanPhamModal());
  }, [dispatch]);

  return (
    <Layout>
      <Layout>
        <Content>
          <PageHeader className="site-page-header" title="Danh mục hàng hóa" />
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
              <Card title="Card title" bordered={false}>
                <RangePicker />
              </Card>
            </Space>
          </div>
        </Sider>
        <Content>
          <Layout style={{ padding: "17px 24px 24px" }}>
            <div className="site-layout-content">
              <HangHoatable currentId={currentId} setCurrentId={setCurrentId} />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
