import React, { useState, useEffect } from "react";
import * as actions from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  TaoPhieuHenModalState$,
  SanPhamsState$,
} from "../../../redux/selectors";
import {
  createPhieuHen,
  updatePhieuHen,
  hideTaoPhieuHenModal,
} from "../../../redux/actions";
import { Form, Input, DatePicker, Modal } from "antd";
import { messageError } from "../../message";

import moment from "moment";

const validateMessages = {
  required: "${label} không được bỏ trống!",
  types: {
    number: "${label} không phải là số hợp lệ!",
  },
  number: {
    range: "${label} phải nằm trong khoảng từ ${min} đến ${max}",
  },
};

export default function PhieuHen({ currentId, setCurrentId }) {
  const { isShow } = useSelector(TaoPhieuHenModalState$);
  const [form] = Form.useForm();
  const SP = useSelector(SanPhamsState$);

  const dateNow = moment().toDate();
  const [data, setData] = useState({
    MaPBH: "",
    MaHD: "",
    MaSP: "",
    TenSP: "",
    NgayBD: new Date(Date.now()),
    NgayKT: new Date(Date.now()),
  });

  const PhieuHenValue = useSelector((state) =>
    state.PhieuHens.data.find((PhieuHen) =>
      PhieuHen._id === currentId ? PhieuHen : null
    )
  );
  useEffect(() => {
    if (PhieuHenValue) setData(PhieuHenValue);
  }, [PhieuHenValue]);

  console.log("PhieuHen", data);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
  }, [dispatch]);

  const onClose = React.useCallback(() => {
    dispatch(hideTaoPhieuHenModal());
    setCurrentId(null);
    setData({
      MaPBH: "",
      MaHD: "",
      MaSP: "",
      TenSP: "",
      NgayBD: new Date(Date.now()),
      NgayKT: new Date(Date.now()),
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    if (
      data.MaPBH !== "" ||
      data.MaHD !== "" ||
      data.MaSP !== "" ||
      data.TenSP !== ""
    ) {
      let listSP = SP.find(function (e) {
        return e.MaSP === data.MaSP;
      });
      if (listSP === undefined) {
        messageError("Mã sản phẩm không tồn tại");
      } else if (data.NgayBD <= data.NgayKT) {
        if (currentId) {
          if (listSP.BaoHanh == "Có bảo hành") {
            dispatch(updatePhieuHen.updatePhieuHenRequest(data));
            onClose();
          } else {
            messageError("Sản phẩm không được bảo hành");
          }
        } else {
          if (listSP.BaoHanh == "Có bảo hành") {
            dispatch(createPhieuHen.createPhieuHenRequest(data));
            onClose();
          } else {
            messageError("Sản phẩm không được bảo hành");
          }
        }
      } else {
        messageError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
      }
    } else {
      messageError("Vui lòng nhập đầy đủ thông tin");
    }
  }, [data, dispatch, onClose, messageError]);

  const body = (
    <>
      <Form
        form={form}
        validateMessages={validateMessages}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 50,
        }}
        layout="horizontal"
      >
        <Form.Item
          label="Mã phiếu bảo hành"
          tooltip="Mã phiếu bảo hành là thông tin duy nhất"
          required
        >
          <Input
            placeholder="Nhập mã phiếu bảo hành"
            value={data.MaPBH}
            onChange={(e) => setData({ ...data, MaPBH: e.target.value })}
            defaultValue={data.MaPBH}
          />
        </Form.Item>
        <Form.Item
          label="Mã hóa đơn"
          tooltip="Mã hóa đơn có sản phẩm được bảo hành"
          required
        >
          <Input
            placeholder="Nhập mã hóa đơn"
            value={data.MaHD}
            onChange={(e) => setData({ ...data, MaHD: e.target.value })}
            defaultValue={data.MaHD}
          />
        </Form.Item>

        <Form.Item
          label="Mã sản phẩm"
          tooltip="Mã sản phẩm được bảo hành"
          required
        >
          <Input
            placeholder="Nhập mã sản phẩm"
            value={data.MaSP}
            onChange={(e) => setData({ ...data, MaSP: e.target.value })}
            defaultValue={data.MaSP}
          />
        </Form.Item>
        {/* <Form.Item
          label="Tên hàng"
          tooltip="Tên hàng là tên của sản phẩm"
          required
        >
          <Input
            placeholder="Nhập tên hàng"
            value={data.TenSP}
            onChange={(e) => setData({ ...data, TenSP: e.target.value })}
            defaultValue={data.TenSP}
          />
        </Form.Item> */}

        <Form.Item label="Ngày bắt đầu" style={{ marginBottom: 0 }} required>
          <Form.Item
            style={{ display: "inline-block", width: "calc(30% - 12px)" }}
          >
            <DatePicker
              value={moment(data.NgayBD)}
              defaultValue={moment(data.NgayBD)}
              onChange={(e) => {
                if (e) setData({ ...data, NgayBD: e.toDate() });
              }}
            />
          </Form.Item>
          <span
            style={{
              display: "inline-block",
              lineHeight: "32px",
              textAlign: "center",
              margin: "0 8px",
            }}
          >
            Ngày kết thúc:
          </span>
          <Form.Item
            required
            style={{ display: "inline-block", width: "calc(30% - 12px)" }}
          >
            <DatePicker
              min
              value={moment(data.NgayKT)}
              defaultValue={
                (moment(data.NgayKT), console.log(moment(data.NgayKT)))
              }
              onChange={(e) => {
                if (e) setData({ ...data, NgayKT: e.toDate() });
              }}
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  );

  return (
    <div>
      <Modal
        title={currentId ? "Câp nhật khuyến mãi" : "Thêm khuyến mãi"}
        visible={isShow}
        onCancel={onClose}
        onOk={onSubmit}
        width={800}
      >
        {body}
      </Modal>
    </div>
  );
}
