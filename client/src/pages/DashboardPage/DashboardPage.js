import {Space } from "antd";
import TodayReportOverall from "../../components/Dashboard/TodayReportOverall"
import DemoColumn from "../../components/chart/DashboardColumnReport";
import DemoBar from "../../components/chart/DashboardBarReport";

export default function KhuyenMaiPage() {
  return (
    <Space direction='vertical' size='large'  style={{width: '100%'}}>
     <TodayReportOverall/>
    < DemoColumn/>
    <DemoBar/>
    </Space>
  );
}
