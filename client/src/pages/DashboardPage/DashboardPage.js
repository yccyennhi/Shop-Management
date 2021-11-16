import {Space } from "antd";
import TodayReportOverall from "../../components/Dashboard/TodayReportOverall"
import DemoColumn from "../../components/Dashboard/ColumnReport";
import DemoBar from "../../components/Dashboard/BarReport";

export default function KhuyenMaiPage() {
  return (
    <Space direction='vertical' size='large'  style={{width: '100%'}}>
     <TodayReportOverall/>
    < DemoColumn/>
    <DemoBar/>
    </Space>
  );
}
