import React from 'react';
import { Column } from '@ant-design/charts';
import { Card} from "antd";

const DemoColumn = () => {

  const data = Array(30).fill().map((_,i) => ({'type': i+1, 'sales':Math.round(Math.random() * 1000000)}));

  var config = {
    data: data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: 'Tháng' },
      sales: { alias: 'Doanh thu' },
    },
  };
  return (
    <Card title="Doanh thu thuần tháng này">
      <Column {...config} />
      </Card>
  )
};

export default DemoColumn;