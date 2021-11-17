import { Modal, Form, Input, Col, Row, Button, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { hideTaoPhieuTraHangModal } from "../../../redux/actions";
import { TaoPhieuTraHangState$ } from "../../../redux/selectors";
import { useDispatch } from "react-redux";
import TraHangTable from "../../table/HoaDonTable/TraHangTable";
import { v4 } from "uuid";
import TraHangList from "../../FormList/TraHangList";
export default function TaoPhieuTraHang() {
  const dispatch = useDispatch();
  const { isShow } = useSelector(TaoPhieuTraHangState$);
  const onClosePhieuTraHang = React.useCallback(() => {
    dispatch(hideTaoPhieuTraHangModal());
  }, [dispatch]);

  const [data, setData] = React.useState({
    MaKM: "",
    TenKM: "",
  });
  const [ListInputSP, setListInputSP] = useState([]);
  const [textInputSP, setTextSP] = useState("");
  const onAddSP = useCallback ( (e) => {
    setListInputSP([
      ...ListInputSP,
      { id: v4(), name: textInputSP, isCompleted: false },
    ]);
    setListInputSP("");
  },    [textInputSP,ListInputSP]
  );
  const onTextInputChange = (event) => {
    setTextSP(event.target.value);
  };
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
              <Input data={data.MaKM} placeholder="Nhập mã hóa đơn" />
            </Form.Item>
            <Form.Item label="Mã sản phẩm:">
              <Form.Item
                name="MaSP"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "calc(55% )" }}
              >
                <Input
                  value={textInputSP}
                  placeholder="Mã sản phẩm"
                  onChange={onTextInputChange}
                />
              </Form.Item>
              <Form.Item
                name="SoLuong"
                rules={[{ required: true }]}
                style={{
                  display: "inline-block",
                  width: "calc(30%)",
                  marginLeft: "10px",
                }}
              >
                <InputNumber
                  min={1}
                  defaultValue={1}
                  disabled={!textInputSP}
                  style={{ width: "70px" }}
                />
              </Form.Item>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={20}
                onClick={onAddSP}
                disabled={!textInputSP}
                style={{ float: "right" }}
              />
            </Form.Item>
          </Form>
          <TraHangList TraHangList={ListInputSP} />
          <section style={{ float: "right", width: "200px" }}>
            <label style={{ float: "left", marginRight: "10px" }}>
              Tổng số lượng: <br />
              Tổng tiền hàng trả: <br />
              Giảm giá phiếu trả: <br />
              Phí trả hàng: <br />
              Tiền khách cần trả: <br />
              Tiền khách nợ:
            </label>
            <label>
              3 <br /> 1440000 <br /> 0 <br /> 60000 <br /> 1500000 <br /> 0{" "}
              <br />
            </label>
          </section>
      </Col>
      <Col span={15} pull={5}>
        <TraHangTable />
      </Col>
    </Row>
  );
  return (
    <div>
      <Modal
        title="Thêm phiếu trả hàng"
        visible={isShow}
        width={1200}
        onCancel={onClosePhieuTraHang}
      >
        {body}
      </Modal>
    </div>
  );
}
