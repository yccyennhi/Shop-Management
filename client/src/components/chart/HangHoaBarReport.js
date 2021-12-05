import React from "react";
import { Card, Space } from "antd";
import BarReport from "./DashboardBarReport";

export const HighestSanPhamList = ({highestSanPhamObj}) => {

  return (
    <Space direction="vertical"  style={{ width: "100%" }} size = 'large'>
      <Card
        style={{ width: "100%" }}
        title="Top 10 hàng hóa bán chạy theo số lượng (đã trừ đổi trả)"
      >
        {BarReport(highestSanPhamObj, 0)}
      </Card>
      <Card
        style={{ width: "100%" }}
        title="Top 10 hàng hóa bán chạy theo doanh thu (đã trừ đổi trả)"
      >
        {BarReport(highestSanPhamObj, 1)}
      </Card>
    </Space>
  );
};

export default HighestSanPhamList;


