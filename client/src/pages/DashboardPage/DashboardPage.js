import React from "react";

import {Space } from "antd";
import TodayReportOverall from "../../components/Dashboard/TodayReportOverall"
import DemoColumn from "../../components/chart/DashboardColumnReport";
import DemoBar from "../../components/chart/DashboardBarReport";


import { useDispatch } from "react-redux";

import * as actions from "../../redux/actions";

export default function KhuyenMaiPage() {
    
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getTongQuans.getDataRequest());
  }, [dispatch]);

  return (
    <Space direction='vertical' size='large'  style={{width: '100%'}}>
     <TodayReportOverall/>
    < DemoColumn/>
    <DemoBar/>
    </Space>
  );
}
