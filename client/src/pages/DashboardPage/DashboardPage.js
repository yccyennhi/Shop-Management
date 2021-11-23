
import React from "react";
import { Layout, Space, PageHeader } from "antd";
import TodayReportOverall from "../../components/Dashboard/TodayReportOverall"
import DemoColumn from "../../components/chart/DashboardColumnReport";
import DemoBar from "../../components/chart/DashboardBarReport";
import { Content } from "antd/lib/layout/layout";


import { useDispatch } from "react-redux";

import * as actions from "../../redux/actions";

export default function KhuyenMaiPage() {
    
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getTongQuans.getDataRequest());
  }, [dispatch]);

  return (
    <Layout>
      <PageHeader className="site-page-header" title="Tổng quan" />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <TodayReportOverall />
            <DemoColumn />
            <DemoBar />
          </Space>
        </div>
      </Content>
    </Layout>
  );
}
