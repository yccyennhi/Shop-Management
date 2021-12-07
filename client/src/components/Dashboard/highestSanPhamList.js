import React, { useState, useEffect } from "react";
import { Card } from "antd";

import { useSelector } from "react-redux";
import { TongQuanHighestSanPhamList$ } from "../../redux/selectors";
import BarReport from "../chart/DashboardBarReport";

const tabList = [
  {
    key: "soLuong",
    tab: "Theo Số lượng",
  },
  {
    key: "doanhThu",
    tab: "Theo Doanh thu",
  },
];


export const HighestSanPhamList = () => {

  const highestSanPhamObj = useSelector(TongQuanHighestSanPhamList$);
  
  const contentList = {
  soLuong: BarReport (highestSanPhamObj, 0) ,
  doanhThu: BarReport (highestSanPhamObj, 1) ,
};


  const [activeTabKey, setActiveTabKey] = useState("soLuong");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <Card
      style={{ width: "100%" }}
      title="Top 10 sản phẩm bán chạy tháng này"
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={(key) => {
        onTabChange(key);
      }}
    >
      {contentList[activeTabKey]}
    </Card>
  );
};

export default HighestSanPhamList;
