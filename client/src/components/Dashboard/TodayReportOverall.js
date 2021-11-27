import React from "react";

import { useSelector } from "react-redux";
import { TongQuanStatistics$ } from "../../redux/selectors";
import { Card, Space, Typography } from "antd";
import {
  DollarTwoTone,
  ToolTwoTone,
  UpCircleTwoTone,
  DownCircleTwoTone,
} from "@ant-design/icons";

const { Text } = Typography;

export default function TodayReportOverall() {
  const statisics = useSelector(TongQuanStatistics$);

  const { hoaDonTodayCount, doanhThuToday, doiTraCount, soLuongDT, percent } =
    statisics;

  const iconUporDown =
    percent > 0 ? (
      <UpCircleTwoTone style={{ fontSize: "40px" }} twoToneColor="#52c41a" />
    ) : (
      <DownCircleTwoTone style={{ fontSize: "40px" }} twoToneColor="#faad14" />
    );

  return (
    <div>
      <Card title="Kết quả bán hàng hôm nay">
        <Space direction="horizontal" size={80}>
          <Space align="center" size={20}>
            <DollarTwoTone style={{ fontSize: "40px" }} />
            <Space direction="vertical" size={0}>
              <Text strong> {hoaDonTodayCount} Hóa đơn</Text>
              <Text strong style={{ fontSize: "1.5rem", color: "#1890ff" }}>
                {doanhThuToday}
              </Text>
              <Text type="secondary">Doanh thu</Text>
            </Space>
          </Space>

          <Space align="center" size={20}>
            <ToolTwoTone style={{ fontSize: "40px" }} twoToneColor="#fa8c16" />
            <Space direction="vertical" size={0}>
              <Text strong>{doiTraCount} Phiếu</Text>
              <Text strong style={{ fontSize: "1.5rem", color: "#fa8c16" }}>
                {soLuongDT}
              </Text>
              <Text type="secondary">Trả hàng</Text>
            </Space>
          </Space>

          <Space align="center">
            {iconUporDown}
            <Space direction="vertical" size={0}>
              <Text
                strong
                style={{
                  fontSize: "1.5rem",
                  color: percent > 0 ? "#52c41a" : "#faad14",
                }}
              >
                {percent} %
              </Text>
              <Text type="secondary">So với cùng kì tháng trước</Text>
            </Space>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
