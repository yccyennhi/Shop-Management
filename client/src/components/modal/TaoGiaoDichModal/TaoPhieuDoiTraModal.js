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
  const [textInputSP, setTextSP] = useState("");
  const [textInputSL, setTextSL] = useState();
  const onAddSPclick = useCallback(
    (e) => {
      settrahangList([
        ...trahangList,
        { id: v4(), name: textInputSP, number: textInputSL, isCompleted: false },
      ]);
      setTextSP("");
      //setTextSL(1);
    },
    [textInputSP, trahangList]
  );
  const onTextInputChange = useCallback((e) => {
    setTextSP(e.target.value);
  }, []);
  const onInputSLChange = useCallback((e) => {
    setTextSL(e.target.value);
  });
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
            <Form.Item
              style={{ display: "inline-block", width: "calc(55% )" }}
            >
              <Input
                value={textInputSP}
                placeholder="Mã sản phẩm"
                allowClear="true"
                onPressEnter={onAddSPclick}
                onChange={onTextInputChange}
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
                value = {textInputSL}
                defaultValue={1}
                disabled={!textInputSP}
                style={{ width: "70px" }}
                onChange = { onInputSLChange}
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
        <TraHangList trahangList={trahangList} />
        <section style={{ float: "right", width: "200px", marginTop: '20px' }}>
          <label style={{ float: "left", marginRight: "10px" }}>
            Tổng số lượng: <br />
            Tổng tiền hàng trả: <br />
            Giảm giá phiếu trả: <br />
            Phí trả hàng: <br />
            Tiền trả khách: <br />
            Tiền đã trả:
          </label>
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
