import React, { useState, useEffect } from "react";
import * as actions from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  TaoPhieuHenModalState$,
  SanPhamsState$,
  PhieuBaoHanhsState$,
  PhieuHensState$,
} from "../../../redux/selectors";
import {
  createPhieuHen,
  updatePhieuHen,
  hideTaoPhieuHenModal,
} from "../../../redux/actions";
import { Form, Input, DatePicker, Modal, Select } from "antd";
import { messageError } from "../../message";
import moment from "moment";
const { Option } = Select;

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
  const PH = useSelector(PhieuHensState$);
  const PBH = useSelector(PhieuBaoHanhsState$);
  const dateNow = moment().toDate();
  const [data, setData] = useState({
    MaPH: "",
    MaPBH: "",
    MaSP: "",
    NgayHen: new Date(Date.now()),
    TrangThai: "Chưa hoàn thành",
    GhiChu: "",
  });

  const PhieuHenValue = useSelector((state) =>
    state.PhieuHens.data.find((PhieuHen) =>
      PhieuHen._id === currentId ? PhieuHen : null
    )
  );
  useEffect(() => {
    if (PhieuHenValue) setData(PhieuHenValue);
  }, [PhieuHenValue]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getSanPhams.getSanPhamsRequest());
    dispatch(actions.getPhieuBaoHanhs.getPhieuBaoHanhsRequest());
  }, [dispatch]);

  const onClose = React.useCallback(() => {
    dispatch(hideTaoPhieuHenModal());
    setCurrentId(null);
    setData({
      MaPH: "",
      MaPBH: "",
      MaSP: "",
      NgayHen: dateNow,
      TrangThai: "Chưa hoàn thành",
      GhiChu: "",
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    if (data.MaPBH !== "" || data.MaSP !== "" || data.MaPH !== "") {
      let listPH = PH.find(function (e) {
        return e.MaPH === data.MaPH;
      });

      let listPBH = PBH.find(function (e) {
        return e.MaPBH === data.MaPBH;
      });

      if (listPBH == undefined) {
        messageError("Mã phiếu bảo hành không tồn tại");
      } else if (listPBH.MaSP != data.MaSP) {
        messageError("Mã sản phẩm không tồn tại");
      } else if (moment(data.NgayHen) < moment(dateNow)) {
        messageError("Ngày hẹn phải lớn hơn hôm nay");
      } else if (currentId) {
        if (moment(listPBH.NgayKT) > moment(dateNow)) {
          if (listPH && listPH.MaPH != PhieuHenValue.MaPH) {
            messageError("Mã phiếu hẹn đã tồn tại");
          } else {
            dispatch(updatePhieuHen.updatePhieuHenRequest(data));
            onClose();
          }
        } else {
          messageError("Sản phẩm đã hết hạn bảo hành");
        }
      } else if (!currentId) {
        if (moment(listPBH.NgayKT) > moment(dateNow)) {
          if (listPH == undefined) {
            dispatch(createPhieuHen.createPhieuHenRequest(data));
            onClose();
          } else {
            messageError("Mã phiếu hẹn đã tồn tại");
          }
        } else {
          messageError("Sản phẩm đã hết hạn bảo hành");
        }
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
          label="Mã phiếu hẹn"
          tooltip="Mã phiếu hẹn là thông tin duy nhất"
          required
        >
          <Input
            placeholder="Nhập mã phiếu hẹn"
            value={data.MaPH}
            onChange={(e) => setData({ ...data, MaPH: e.target.value })}
            defaultValue={data.MaPH}
          />
        </Form.Item>

        <Form.Item
          label="Mã phiếu bảo hành"
          tooltip="Mã phiếu bảo hành của sản phẩm hẹn bảo hành"
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
        <Form.Item required label="Trạng thái" tooltip="Trạng thái phiếu hẹn">
          <Select
            disabled={!currentId}
            placeholder="Chọn trạng thái"
            value={data.TrangThai}
            onChange={(e) => setData({ ...data, TrangThai: e })}
            defaultValue={data.TrangThai}
          >
            <Option value="Hoàn thành">Hoàn thành</Option>
            <Option value="Chưa hoàn thành">Chưa hoàn thành</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Ngày hẹn"
          tooltip="Ngày hẹn lấy sản phẩm cần bảo hành"
          style={{ marginBottom: 0 }}
          required
        >
          <DatePicker
            value={moment(data.NgayHen)}
            defaultValue={moment(data.NgayHen)}
            onChange={(e) => {
              if (e) setData({ ...data, NgayHen: e.toDate() });
            }}
          />
        </Form.Item>
        
      </Form>
    </>
  );

  return (
    <div>
      <Modal
        title={currentId ? "Câp nhật phiếu hẹn" : "Thêm phiếu hẹn"}
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
