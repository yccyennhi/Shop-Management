import React, { useState } from "react";
import { Table, Input, Row, PageHeader, Descriptions, Tag, Button, message } from "antd";
import * as actions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhieuBaoHanh,
  showTaoPhieuBaoHanhModal,
} from "../../../redux/actions";
import { SanPhamsState$, PhieuHensState$ } from "../../../redux/selectors";
import moment from "moment";
import { messageError } from "../../message";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();
  const dateNow = moment().toDate();
  const SP = useSelector(SanPhamsState$);
  const PH = useSelector(PhieuHensState$);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);
  const openCreatePBHModal = React.useCallback(() => {
    setCurrentId(record._id);
    dispatch(showTaoPhieuBaoHanhModal());
  }, [dispatch]);

  const onDelete = React.useCallback(() => {
    let listPBH = PH.find(function (e) {
      return (e.MaPBH === record.MaPBH) && (e.TrangThai==="Chưa hoàn thành");
    });
    if (listPBH == undefined) {
      console.log("record data", record);
      dispatch(deletePhieuBaoHanh.deletePhieuBaoHanhRequest(record._id));
    }
    else {
      messageError('Không thể xóa phiếu bảo hành vì còn phiếu hẹn của sản phẩm chưa hoàn thành!');
    }
  }, [record, dispatch]);
  let listSP = SP.find(function (e) {
    return e.MaSP === record.MaSP;
  });
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.MaPBH}
        subTitle={record.MaSP}
        extra={[
          <Button key="1" type="primary" onClick={openCreatePBHModal}>
            Sửa
          </Button>,
          <Button key="2" onClick={onDelete}>
            Xóa
          </Button>,
        ]}
        tags={[
          <Tag color="red" visible={moment(record.NgayKT) < dateNow}>
            Hết bảo hành
          </Tag>,
          <Tag color="blue" visible={moment(record.NgayKT) >= dateNow}>
            Còn bảo hành
          </Tag>,
        ]}
      >
        <Descriptions title="Thông tin chi tiết" size="default" column={2}>
          <Descriptions.Item label="Mã hóa đơn">
            {record.MaHD}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm">
            {listSP.TenSP}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu bảo hành">
            {moment(record.NgayBD).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc bảo hành">
            {moment(record.NgayKT).format("DD/MM/YYYY")}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
}
