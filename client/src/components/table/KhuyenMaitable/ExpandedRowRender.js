import React, { useState } from "react";
import { Table, Input, Row, PageHeader, Descriptions, Tag, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";



export default function ExpandedRowRender({ record }) {
  const dispatch = useDispatch();
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.TenKM}
        tags={
          <Tag color="blue">
            {" "}
            {record.TrangThai == false
              ? "Ch­ưa kích hoạt"
              : "Đã kích hoạt"}{" "}
          </Tag>
        }
        subTitle={record.MaKM}
        extra={[
            <Button key="1" type="primary">
            Sửa
          </Button>,
            <Button key="2">Xóa</Button>,
 
          ]}
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Ngày bắt đầu">
            {record.NgayBD}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">
            {record.NgayKT}
          </Descriptions.Item>
          <Descriptions.Item label="Trị giá hóa đơn">
            {record.GiaTri}
          </Descriptions.Item>
          <Descriptions.Item label="Phần trăm giảm">
            {record.PhanTram}
          </Descriptions.Item>
          <Descriptions.Item label="Số lượng">
            {record.SoLuong}
          </Descriptions.Item>
        </Descriptions>

      </PageHeader>
    </>
  );
}
