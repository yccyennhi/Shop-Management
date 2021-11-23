import { Modal, Form, Input, DatePicker } from "antd";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import { hideTaoPhieuTraHangModal } from "../../../redux/actions";
import { TaoPhieuTraHangState$, CTHDsState$ } from "../../../redux/selectors";
import { useDispatch } from "react-redux";
import moment from "moment";
import ListSPs from "./ListSPTraHangs";
const { Search } = Input;

export default function TaoPhieuTraHang() {
  const dispatch = useDispatch();
  const CTHDs = useSelector(CTHDsState$);
  const [ListSPTraHangs, setListSP] = useState([]);
  const { isShow } = useSelector(TaoPhieuTraHangState$);
  const onClosePhieuTraHang = React.useCallback(() => {
    dispatch(hideTaoPhieuTraHangModal());
  }, [dispatch]);

  const [data, setData] = React.useState({
    MaHD: "",
    ThoiGian: new Date(Date.now()),
    SoLuong: 0,
    TongTien: 0,
  });
  const [textInpMaSP, setDataTextMaSP] = React.useState("");
  React.useEffect(() => {
    dispatch(actions.getCTHDs.getCTHDsRequest());
  }, [dispatch]);

  const onSearch = () => {
    CTHDs.forEach((e) => {
      if (e.MaHD === textInpMaSP) {
        data.MaHD = textInpMaSP;
        setDataTextMaSP("");
        return;
      }
    });
  };

  const setDataPDT = useCallback((SL, T_Tien) => {
    setData({
      ...data,
      SoLuong: data.SoLuong + SL,
      TongTien: data.TongTien + T_Tien,
    });
  }, []);
  const body = (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 50,
        }}
        layout="horizontal"
      >
        <Form.Item label="Mã hóa đơn:">
          <Search
            placeholder="Nhập mã hóa đơn"
            allowClear
            value={textInpMaSP}
            enterButton="Search"
            onPressEnter={onSearch}
            onChange={(e) => setDataTextMaSP(e.target.value)}
            size="large"
            onSearch={onSearch}
          />
        </Form.Item>
        <Form.Item label="Ngày lập:">
          <DatePicker defaultValue={moment(data.ThoiGian)} disabled={true} />
        </Form.Item>
        <Form.Item>
          <ListSPs data={data} setDatas={setDataPDT} CTHDs={CTHDs} />
        </Form.Item>
        <Form.Item>
          <section
            style={{ float: "right", width: "200px", marginTop: "20px" }}
          >
            <h4 style={{ float: "left", marginRight: "10px" }}>
              Tổng số lượng <span style={{ float: "right" }}> : </span> <br />
              Tổng tiền hàng trả <span style={{ float: "right" }}>: </span>{" "}
              <br />
            </h4>
            <label>
              {data.SoLuong} <br /> {data.TongTien}
            </label>
          </section>
        </Form.Item>
      </Form>
    </>
  );
  return (
    <div>
      <Modal
        title="Thêm phiếu trả hàng"
        visible={isShow}
        width={600}
        onCancel={onClosePhieuTraHang}
      >
        {body}
      </Modal>
    </div>
  );
}
