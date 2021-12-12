import { Button, Descriptions, Modal, PageHeader, Tag } from "antd";
import React, { useState } from "react";
import { deleteKhuyenMai, showModal } from "../../../redux/actions";

import moment from "moment";
import { useDispatch } from "react-redux";

export default function ExpandedRowRender({ record, setCurrentId }) {

  
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  function warning() {
    setIsShow(true);
    Modal.confirm({
      visible: isShow,
      title: "Cảnh báo",
      content:
        "Bạn có chắc chắn muốn xóa thông tin khuyến mãi này?",
      onOk() {
        onDelete();
      },
      
    });
  }

  const openCreateKMModal = React.useCallback(() => {
    setCurrentId(record._id);
    dispatch(showModal());
  }, [dispatch]);

  const onDelete = React.useCallback(() => {
    dispatch(deleteKhuyenMai.deleteKhuyenMaiRequest(record._id));
    setIsShow(false);
  }, [record, dispatch]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.TenKM}
        tags={
          <Tag color={record.TrangThai == false ? "red" : "green"}>
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
          <Button key="2"  onClick={warning}  >Xóa</Button>,
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
          {record.GiaTri.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
