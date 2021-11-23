import React, { useState } from "react";
import { Table, Input, Row, PageHeader, Descriptions, Tag, Button } from "antd";
import * as actions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhieuHen,
  showTaoPhieuHenModal,
} from "../../../redux/actions";
import { SanPhamsState$ } from "../../../redux/selectors";
import moment from "moment";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();
  const SP = useSelector(SanPhamsState$);
  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);
  const openCreatePBHModal = React.useCallback(() => {
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
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Mã hóa đơn">
            {record.MaHD}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm">
            {listSP.TenSP}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu bảo hành">
            {moment(record.NgayBD).format("DD-MM-YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc bảo hành">
            {moment(record.NgayKT).format("DD-MM-YYYY")}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
}
