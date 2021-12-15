import React, { useState } from "react";
import { Table, Modal, Row, PageHeader, Descriptions, Tag, Button } from "antd";
import * as actions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { deletePhieuHen, showTaoPhieuHenModal } from "../../../redux/actions";
import { SanPhamsState$ } from "../../../redux/selectors";
import moment from "moment";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();
  const SP = useSelector(SanPhamsState$);
  const [isShow, setIsShow] = useState(false);
  function confirm() {
    setIsShow(true);
    Modal.confirm({
      visible: isShow,
      title: "Cảnh báo",
      content: "Xác nhận xóa phiếu bảo hành?",
      onOk() {
        onDelete();
      },
    });
  }
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);
  const openCreatePHModal = React.useCallback(() => {
    setCurrentId(record._id);
    dispatch(showTaoPhieuHenModal());
  }, [dispatch]);

  const onDelete = React.useCallback(() => {
    console.log("record data", record);
    dispatch(deletePhieuHen.deletePhieuHenRequest(record._id));
  }, [record, dispatch]);
  let listSP = SP.find(function (e) {
    return e.MaSP === record.MaSP;
  });
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.MaPH}
        subTitle={record.MaSP}
        extra={[
          <Button
            key="1"
            type="primary"
            disabled={record.TrangThai == "Hoàn thành" ? true : false}
            onClick={openCreatePHModal}
          >
            Sửa
          </Button>,
          <Button
            disabled={record.TrangThai == "Hoàn thành" ? true : false}
            key="2"
            onClick={confirm}
          >
            Xóa
          </Button>,
          
        ]}
        tags={[
          <Tag color="red" visible={record.TrangThai == "Chưa hoàn thành"}>
          {record.TrangThai}
        </Tag>,
        <Tag color="blue" visible={record.TrangThai == "Hoàn thành"}>
          {record.TrangThai}
        </Tag>
        ]}
      >
        
        <Descriptions title="Thông tin chi tiết" size="default" column={2}>
          <Descriptions.Item label="Mã phiếu bảo hành">
            {record.MaPBH}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm">
            {listSP.TenSP}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày hẹn">
            {moment(record.NgayHen).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú">{record.GhiChu}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
}
