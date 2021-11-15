import { Card, Divider, Space, Typography } from "antd";
import { DollarTwoTone } from "@ant-design/icons";

const {Text } = Typography;

export default function TodayReportOverall() {
  return (
    <div>
      <Card title="Kết quả bán hàng hôm nay">
      <Space direction="horizontal" size={80}>

        <Space align="center" size={20}>
          <DollarTwoTone style={{ fontSize: "40px" }} />
          <Space direction="vertical" size={0}>
            <Text strong>0 Hóa đơn</Text>
            <Text strong style={{ fontSize: "1.5rem" }}>
              0
            </Text>
            <Text type="secondary">Doanh thu</Text>
          </Space>
        </Space>

        <Space align="center" size={20}>
          <DollarTwoTone style={{ fontSize: "40px" }} />
          <Space direction="vertical" size={0}>
            <Text strong>0 Phiếu</Text>
            <Text strong style={{ fontSize: "1.5rem" }}>
              0
            </Text>
            <Text type="secondary">Trả hàng</Text>
          </Space>
        </Space>

        <Space align="center">
          <DollarTwoTone style={{ fontSize: "40px" }} />
          <Space direction="vertical" size={0}>
            <Text strong style={{ fontSize: "1.5rem" }}>
              -15%
            </Text>
            <Text type="secondary">So với cùng kì tháng trước</Text>
          </Space>
        </Space>
        
        </Space>
      </Card>
    </div>
  );
}
