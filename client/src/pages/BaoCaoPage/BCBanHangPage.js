import React from "react";
import moment from "moment";
import { PageHeader, Space, Card, DatePicker, Layout } from "antd";
import BanHangtable from "../../components/table/BaoCaoTable/BanHangtable";
import BanHangColumnReport from "../../components/chart/BanHangColoumnReport";

import COLOR from "../../color.js";

const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

export default function BCBanHangPage() {
  const dataSource = [];
  
const dateFormat = 'DD/MM/YYYY';
  return (
    <Layout>
      <Layout>
        <Content>
          <PageHeader className="site-page-header" title="Báo cáo hàng hóa" />
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
                title="Thời gian áp dụng"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <RangePicker defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
        format={dateFormat} />
              </Card>
            </Space>
          </div>
        </Sider>
        <Content style={{ padding: "17px 24px 24px" }}>
          <div className="site-layout-content">
            <Space direction='vertical' size="large" style={{ width: "100%" }} >
              <BanHangColumnReport /> 
              <BanHangtable dataSource={dataSource} />
            </Space>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
