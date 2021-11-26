import { Layout, Button, PageHeader, Input, Drawer, Collapse } from "antd";
import React, { useCallback, useState } from "react";
import "./styles.css";
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;

export default function SalePage() {
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = () => {
    setcollapsed(true);
  };
  return (
    <Layout className="layout">
      <PageHeader className="site-page-header">
        <Search placeholder="input search text" enterButton width = {400}/>
      </PageHeader>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
          <Collapse>
            <Collapse.Panel header="Danh sách sản phẩm">
              ádkahsdkashd
            </Collapse.Panel>
          </Collapse>
        </Layout>
        <Sider width={400} className="site-layout-background"  style={{
              padding: 24,
              margin: 0,
              marginRight: 24,
              minHeight: 280,
            }}>
          sâfasfa
        </Sider>
      </Layout>
    </Layout>
  );
}
