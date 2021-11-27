import React from "react";
import { Bar } from "@ant-design/charts";

const BarReport = (highestSanPhamObj, type) => {
  console.log(highestSanPhamObj, type);
  const dataSource = Object.entries(highestSanPhamObj).map(([key, value]) => ({
    type: key,
    sales: type == 0 ? value.SoLuong : value.ThanhTien,
  }));

  const data = dataSource.length
    ? dataSource
        .slice()
        .sort((a, b) => {
          return b.sales - a.sales;
        })
        .slice(0, 10)
    : [{ type: "", sales: 0 }];

  var config = {
    data: data,
    xField: "sales",
    yField: "type",
    meta: {
      type: { alias: "Sản phẩm" },
      sales: { alias: type === 0 ? "Lượt bán" : "Doanh thu" },
    },
    minBarWidth: 20,
    maxBarWidth: 20,
  };
  return <Bar {...config} />;
};

export default BarReport;
