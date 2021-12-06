import React, { useState } from "react";
import { PageHeader, Descriptions, Tag, Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteKhuyenMai, showModal } from "../../../redux/actions";
import moment from "moment";
export default function ExpandedRowRender({ record, setCurrentId }) {
  
  const dispatch = useDispatch();

  const openCreateKMModal = React.useCallback(() => {
    setCurrentId(record._id);
    dispatch(showModal());
  }, [dispatch]);

  const onDelete = React.useCallback(() => {
    console.log('record', record);
    dispatch(deleteKhuyenMai.deleteKhuyenMaiRequest(record._id));
  }, [record, dispatch]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.TenKM}
        tags={
          <Tag color="blue">
            {record.TrangThai == false
              ? "Không áp dụng"
              : "Đang áp dụng"}
          </Tag>
        }
        subTitle={record.MaKM}
        extra={[
          <Button key="1" type="primary" onClick={openCreateKMModal}>
            Sửa
          </Button>,
          <Button key="2"  onClick={onDelete}  >Xóa</Button>,
        ]}
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Ngày bắt đầu">
            {moment(record.NgayBD).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">
            {moment(record.NgayKT).format("DD/MM/YYYY")}
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
