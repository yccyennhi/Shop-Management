import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import { Card } from "antd";

import { useSelector } from "react-redux";
import { TongQuanHighestSanPhamList$ } from "../../redux/selectors";

const DemoBar = () => {
  
  const highestSanPhamList = useSelector(TongQuanHighestSanPhamList$);

  const arr = Object.keys(highestSanPhamList).map((key) => ({
    type: key,
    sales: highestSanPhamList[key],
  }));

  const data = arr
    .slice()
    .sort((a, b) => {
      return b.sales - a.sales;
    })
    .slice(0, 10);

  console.log("data", data);

  // var data = [
  //   {
  //     type: 'Giày Thể Thao Nam DSM074233DEN (Đen)',
  //     sales: 38,
  //   },
  //   {
  //     type: 'Sandal Nữ DEMH00900XAM (Xám)',
  //     sales: 52,
  //   },
  //   {
  //     type: 'Sandal Nam Hunter DEMH00900XAM (Xám)',
  //     sales: 100,
  //   },
  //   {
  //     type: 'Dép Eva Phun Nam DEM010400DEN (Đen)',
  //     sales: 145,
  //   },
  //   {
  //     type: 'Giày Thể Thao Nữ Neutral 200 RSMH00200XDL (Xanh Dương Lợt)',
  //     sales: 48,
  //   },
  //   {
  //     type: 'Dentsu Redder Nữ - Vietnamese Canvas of Pride (Trắng)',
  //     sales: 38,
  //   },
  //   {
  //     type: 'Dentsu Redder Nam - Vietnamese Canvas of Pride (Đen)',
  //     sales: 52,
  //   },
  //   {
  //     type: 'Giày Thể Thao Nữ Mid Americano DSWH03600DEN (Đen)',
  //     sales: 45,
  //   },
  //   {
  //     type: 'Giày Thể Thao Cao Cấp Nữ Army Green DSWH05100REU (Rêu)',
  //     sales: 60,
  //   },
  //   {
  //     type: 'Giày Thể Thao Cao Cấp Nam Army Green DSWH05100REU (Xám)',
  //     sales: 43,
  //   },
  // ];
  var config = {
    data: data,
    xField: "sales",
    yField: "type",
    meta: {
      type: { alias: "Sản phẩm" },
      sales: { alias: "Lượt bán" },
    },
    minBarWidth: 20,
    maxBarWidth: 20,
  };
  return (
    <Card title="Top 10 hàng hóa bán chạy">
      <Bar {...config} />
    </Card>
  );
};

export default DemoBar;
