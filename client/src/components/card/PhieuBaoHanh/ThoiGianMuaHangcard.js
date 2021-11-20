import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, DatePicker } from "antd";
import "../../../App.css";
const { RangePicker } = DatePicker;

function ThoiGianMuaHangcard() {
  return (
    <div>
      <Card title="Thời gian mua hàng" bordered={false}>
        <RangePicker />
      </Card>
    </div>
  );
}

export default ThoiGianMuaHangcard;
