import { Modal, Form, Input, Col, Row, Button, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { hideTaoPhieuTraHangModal } from "../../../redux/actions";
import { TaoPhieuTraHangState$ } from "../../../redux/selectors";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import TraHangList from "../../FormList/TraHangList";
import HoaDontable from "../../table/HoaDonTable/HoaDonTable";
export default function TaoPhieuTraHang() {
  const dispatch = useDispatch();
  const { isShow } = useSelector(TaoPhieuTraHangState$);
  const onClosePhieuTraHang = React.useCallback(() => {
    dispatch(hideTaoPhieuTraHangModal());
  }, [dispatch]);

  const [data, setData] = React.useState({
    MaHD: "",
  });
  const [trahangList, settrahangList] = useState([]);
  const [textInputSP, setTextInput] = useState({
    MaSP: "",
    SL: 0,
  });
  const onAddSPclick = useCallback(
    (e) => {
      settrahangList([
        {
          id: v4(),
          name: textInputSP.MaSP,
          number: textInputSP.SL,
          isCompleted: false,
        },
        ...trahangList,
      ]);
      setTextInput({ MaSP: "", SL: 0 });
    },
    [textInputSP, trahangList]
  );
  const OnButtonTraHangClick = useCallback((id)=> {
    settrahangList(prevState => prevState.map((trahang) => trahang.id === id? {...trahangList, trahang: null} : trahang));
  },[]);
  const body = (
    <Row>
      <Col span={6} push={17}>
        <Form
          labelCol={{
            span: 25,
          }}
          wrapperCol={{
            span: 25,
          }}
          layout="vertical"
        >
          <Form.Item label="Mã hóa đơn:">
            <Input data={data.MaHD} placeholder="Nhập mã hóa đơn" />
          </Form.Item>
          <Form.Item label="Mã sản phẩm:">
            <Form.Item style={{ display: "inline-block", width: "calc(55% )" }}>
              <Input
                value={textInputSP.MaSP}
                placeholder="Mã sản phẩm"
                allowClear="true"
                onPressEnter={onAddSPclick}
                onChange={(e) => setTextInput({ MaSP: e.target.value, SL: 1 })}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "calc(30%)",
                marginLeft: "10px",
              }}
            >
              <InputNumber
                min={1}
                value={textInputSP.SL}
                disabled={!textInputSP}
                style={{ width: "70px" }}
                onChange={(e) => {
                  setTextInput({ ...textInputSP, SL: e });
                }}
              />
            </Form.Item>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size={20}
              onClick={onAddSPclick}
              disabled={!textInputSP}
              style={{ float: "right" }}
            />
          </Form.Item>
        </Form>
        <TraHangList trahangList={trahangList} OnButtonTraHangClick={OnButtonTraHangClick}/>
        <section style={{ float: "right", width: "200px", marginTop: "20px" }}>
          <h4 style={{ float: "left", marginRight: "10px" }}>
            Tổng số lượng <span style={{ float: "right" }}> : </span> <br />
            Tổng tiền hàng trả <span style={{ float: "right" }}> : </span> <br />
            Giảm giá phiếu trả <span style={{ float: "right" }}> : </span> <br />
            Phí trả hàng <span style={{ float: "right" }}> : </span> <br />
            Tiền trả khách <span style={{ float: "right" }}> : </span> <br />
            Tiền đã trả <span style={{ float: "right" }}> : </span>
          </h4>
          <label>
            3 <br /> 1440000 <br /> 0 <br /> 60000 <br /> 1500000 <br /> 0{" "}
            <br />
          </label>
        </section>
      </Col>
      <Col span={15} pull={5}>
        <HoaDontable />
      </Col>
    </Row>
  );
  return (
    <div>
      <Modal
        title="Thêm phiếu trả hàng"
        visible={isShow}
        width={1300}
        onCancel={onClosePhieuTraHang}
      >
        {body}
      </Modal>
    </div>
  );
}
