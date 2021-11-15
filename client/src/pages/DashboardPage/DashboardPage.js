import { Card, Divider, Space, Typography } from "antd";
import TodayReportOverall from "../../components/Dashboard/TodayReportOverall"
import DemoColumn from "../../components/Dashboard/ColumnReport";

const { Title, Text } = Typography;

export default function KhuyenMaiPage() {
  return (
    <div>
     <TodayReportOverall/>
      {DemoColumn}
    </div>
  );
}
