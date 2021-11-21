import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Card, Space, Typography } from "antd";
import { DollarTwoTone } from "@ant-design/icons";

const {Text } = Typography;

export default function TodayReportOverall() {
  
  const dateNow = new Date(Date.now()).setHours(0,0,0,0);
  console.log('date', new Date(dateNow));

  const [countHD, setCountHD] = useState(0);

  const HoaDons = useSelector((state) =>
    state.HoaDons.data.find((HoaDon) => 
      //HoaDon.ThoiGian == new Date(dateNow) ? HoaDon : null
      console.log('time', HoaDon.ThoiGian)
    )
  );
console.log('list', HoaDons);

  useEffect(() => {
    if (HoaDons) setCountHD(HoaDons.length);
  }, [HoaDons]);

  return (
    <div>
      <Card title="Kết quả bán hàng hôm nay">
      <Space direction="horizontal" size={80}>

        <Space align="center" size={20}>
          <DollarTwoTone style={{ fontSize: "40px" }} />
          <Space direction="vertical" size={0}>
            <Text strong>{countHD} Hóa đơn</Text>
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
