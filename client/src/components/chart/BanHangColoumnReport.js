import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Card } from "antd";

const DemoColumn = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   asyncFetch();
  // }, []);
  const dataDT = Array(10)
    .fill()
    .map((_, i) => ({
      "day": i + 1,
      "value": Math.round(Math.random() * 1000000),
      "type": "Doanh thu",
    }));

  const dataLN = Array(10)
    .fill()
    .map((_, i) => ({
      "day": i + 1,
      "value": Math.round(Math.random() * 1000000),
      "type": "Lợi nhuận",
    }));
    
  dataLN.forEach((e => dataDT.push(e)));

  var config = {
    data: dataDT,
    isStack: true,
    xField: "day",
    yField: "value",
    seriesField: "type",
    label: {
      position: "middle",
      layout: [
        { type: "interval-adjust-position" },
        { type: "interval-hide-overlap" },
        { type: "adjust-color" },
      ],
    },
  };

  return (
    <Card title="Biểu đồ">
      <Column {...config} />
    </Card>
  );
};

export default DemoColumn;
