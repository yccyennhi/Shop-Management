import { Modal, Button, Row } from "antd";
import React, { useCallback, useState, useRef } from "react";
import * as actions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ThanhToanTichDiemModalState$ } from "../../../redux/selectors/index.js";
import { hideThanhToanTichDiemModal } from "../../../redux/actions";
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "../../../pages/SalePage/ComponentToPrint.js";
export default function ThanhToanTichDiemModal() {
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const { isShow } = useSelector(ThanhToanTichDiemModalState$);
  const dataHD = JSON.parse(localStorage.getItem("HoaDon"));
  const onCancel = React.useCallback(() => {
    dispatch(hideThanhToanTichDiemModal());
  }, [dispatch]);

  const body = (
    <>
      <Row style={{ width: 170, float: "right" }}>
        <ReactToPrint
          trigger={() => (
            <Button type="primary" style={{ marginRight: 10 }}>
              In hóa đơn
            </Button>
          )}
          onAfterPrint={() => {
            onCancel();
            dispatch(actions.createHoaDon.createHoaDonRequest(dataHD));
            dispatch(actions.getSanPhams.getSanPhamsRequest());
          }}
          content={() => componentRef.current}
        />
        <Button onClick={() => onCancel()} type="primary" danger>
          Hủy
        </Button>
      </Row>
      <Row style={{ width: 650 }}>
        <ComponentToPrint ref={componentRef} />
      </Row>
    </>
  );
  return (
    <div>
      <Modal
        title="In hóa đơn?"
        width={700}
        visible={isShow}
        footer={null}
        onCancel={onCancel}
      >
        {body}
      </Modal>
    </div>
  );
}
