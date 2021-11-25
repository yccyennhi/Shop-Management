import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Card } from "antd";
import moment from "moment";

const DemoColumn = ({ currentDataSource }) => {

  const dataDT = currentDataSource
    ? Array.from(currentDataSource, (HoaDon) => ({
        ThoiGian: moment(HoaDon[0]).format("DD/MM/YYYY"),
        value: HoaDon[1].TongTienHang,
        type: "Tổng tiền hàng",
      }))
    : [{
      ThoiGian: moment().format("DD/MM/YYYY"),
      value: 1,
      type: "Tổng tiền hàng",
    }];

  const dataLN = currentDataSource
    ? Array.from(currentDataSource, (HoaDon) => ({
        ThoiGian: moment(HoaDon[0]).format("DD/MM/YYYY"),
        value: HoaDon[1].LoiNhuan,
        type: "Lợi nhuận",
      }))
    :  [{
      ThoiGian: moment().format("DD/MM/YYYY"),
      value: 0,
      type: "Lợi nhuận",
    }];

  const dataSource = dataDT.concat(dataLN);

  var config = {
    data: dataSource,
    isStack: true,
    xField: "ThoiGian",
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
