import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Radio, Space } from "antd";
import "../../../App.css";

function TrangThaiBaoHanhcard() {
  return (
    <div>
      <Card title="Trạng thái bảo hành" bordered={false}>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>Tất cả</Radio>
            <Radio value={2}>Còn hạn</Radio>
            <Radio value={3}>Hết hạn</Radio>
          </Space>
        </Radio.Group>
      </Card>
    </div>
  );
}

export default TrangThaiBaoHanhcard;
