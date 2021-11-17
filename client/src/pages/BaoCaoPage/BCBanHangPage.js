import React from "react";
import moment from "moment";
import { PageHeader, Row, Space, Typography, DatePicker } from "antd";
import BanHangtable from "../../components/table/BaoCaoTable/BanHangtable";
import BanHangColumnReport from "../../components/chart/BanHangColoumnReport";

const { Title } = Typography;

const { RangePicker } = DatePicker;

export default function BCBanHangPage() {
  const dataSource = [];
  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Báo cáo bán hàng" />
        <div>
          <Row justify="end">
            <Space direction="horizontal" align="baseline" size="large">
              <Title level={5}>Ngày</Title>
              <RangePicker
                defaultValue={[moment(), moment()]}
                format="DD/MM/YYYY"
              />
            </Space>
          </Row>
        </div>
        <BanHangColumnReport/>
        
        <BanHangtable dataSource={dataSource} />
      </div>
    </>
  );
}
