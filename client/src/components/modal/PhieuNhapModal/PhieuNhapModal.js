import React, { useState, useEffect } from "react";
import * as actions from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  TaoPhieuNhapModalState$,
  PhieuNhapsState$,
  SanPhamsState$,
} from "../../../redux/selectors";
import {
  createPhieuNhap,
  updatePhieuNhap,
  hideTaoPhieuNhapModal,
} from "../../../redux/actions";
import { Form, Input, DatePicker, Modal, AutoComplete } from "antd";
import { messageError } from "../../message";
import moment from "moment";
const { Search } = Input;

const validateMessages = {
  required: "${label} không được bỏ trống!",
  types: {
    number: "${label} không phải là số hợp lệ!",
  },
  number: {
    range: "${label} phải nằm trong khoảng từ ${min} đến ${max}",
  },
};

export default function PhieuNhap({ currentId, setCurrentId }) {
  const { isShow } = useSelector(TaoPhieuNhapModalState$);
  const [form] = Form.useForm();
  const SP = useSelector(SanPhamsState$);

  const PN = useSelector(PhieuNhapsState$);
  const PBH = useSelector(PhieuNhapsState$);
  const options = [SP.MaSP];
  const dateNow = moment().toDate();
  const [data, setData] = useState({
    MaPN: "",
    MaSP: [],
    NguoiNhap: "",
    NguoiTao: "",
    NgayTao: new Date(Date.now()),
    NgayCapNhat: new Date(Date.now()),
    TenNCC: "",
    SoLuong: [],
    GiaNhap: [],
    ThanhTien: [],
    GiamGia: 0,
    TongSoLuong: 0,
    TongTien: 0,
    TienTra: 0,
    TrangThai: "Phiếu tạm",
    GhiChu: "",
  });
  const onSearch = (value) => console.log(value);
  const PhieuNhapValue = useSelector((state) =>
    state.PhieuNhaps.data.find((PhieuNhap) =>
      PhieuNhap._id === currentId ? PhieuNhap : null
    )
  );
  useEffect(() => {
    if (PhieuNhapValue) setData(PhieuNhapValue);
  }, [PhieuNhapValue]);

  console.log("PhieuNhap", data);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getPhieuNhaps.getPhieuNhapsRequest());
  }, [dispatch]);

  const onClose = React.useCallback(() => {
    dispatch(hideTaoPhieuNhapModal());
    setCurrentId(null);
    setData({
      MaPN: "",
      MaSP: [],
      NguoiNhap: "",
      NguoiTao: "",
      NgayTao: dateNow,
      NgayCapNhat: dateNow,
      TenNCC: "",
      SoLuong: [],
      GiaNhap: [],
      ThanhTien: [],
      GiamGia: 0,
      TongSoLuong: 0,
      TongTien: 0,
      TienTra: 0,
      TrangThai: "Phiếu tạm",
      GhiChu: "",
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createPhieuNhap.createPhieuNhapRequest(data));
    onClose();
    // if (
    //   data.MaPBH !== "" ||
    //   data.MaHD !== "" ||
    //   data.MaSP !== "" ||
    //   data.TenSP !== ""
    // ) {
    //   let listSP = PN.find(function (e) {
    //     return e.MaSP === data.MaSP;
    //   });
    //   let listPBH = PBH.find(function (e) {
    //     return e.MaPBH === data.MaPBH;
    //   });
    //   if (listSP === undefined) {
    //     messageError("Mã sản phẩm không tồn tại");
    //   }
    //   if (moment(data.NgayBD) <= moment(data.NgayKT)) {
    //     if (currentId) {
    //       if (listSP.BaoHanh == "Có bảo hành") {
    //         if (listPBH && data.MaPBH !== PhieuNhapValue.MaPBH) {
    //           messageError("Mã phiếu bảo hành đã tồn tại");
    //         } else {
    //           dispatch(updatePhieuNhap.updatePhieuNhapRequest(data));
    //           onClose();
    //         }
    //       } else {
    //         messageError("Sản phẩm không được bảo hành");
    //       }
    //     } else {
    //       if (listSP.BaoHanh == "Có bảo hành") {
    //         if (listPBH == undefined) {
    //           dispatch(createPhieuNhap.createPhieuNhapRequest(data));
    //           onClose();
    //         } else {
    //           messageError("Mã phiếu bảo hành đã tồn tại");
    //         }
    //       } else {
    //         messageError("Sản phẩm không được bảo hành");
    //       }
    //     }
    //   } else {
    //     messageError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
    //   }
    // } else {
    //   messageError("Vui lòng nhập đầy đủ thông tin");
    // }
  }, [data, dispatch, onClose, messageError]);
  const onSearchSP = React.useCallback(
    (value) => {
      console.log(value);
    },
    [dispatch]
  );

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
              disabled={currentId}
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
              disabled={currentId}
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
        title={currentId ? "Câp nhật phiếu nhập" : "Thêm phiếu nhập"}
        visible={isShow}
        onCancel={onClose}
        onOk={onSubmit}
        width={800}
      >
          <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />

        {/* <AutoComplete
          style={{ width: 200 }}
          options={options}
          placeholder="try to type `b`"
          filterOption
        /> */}
        {body}
      </Modal>
    </div>
  );
}
