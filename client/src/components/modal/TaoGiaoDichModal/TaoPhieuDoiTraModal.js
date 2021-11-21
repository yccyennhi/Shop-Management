import {
  Modal,
  Form,
  Input,
  Col,
  Row,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { hideTaoPhieuTraHangModal } from "../../../redux/actions";
import { TaoPhieuTraHangState$ } from "../../../redux/selectors";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import moment from "moment";
import SanPhamTraHang from "./SanPhamTraHang";
const { Search } = Input;


export default function TaoPhieuTraHang() {
  const dispatch = useDispatch();
  const { isShow } = useSelector(TaoPhieuTraHangState$);
  const onClosePhieuTraHang = React.useCallback(() => {
    dispatch(hideTaoPhieuTraHangModal());
  }, [dispatch]);

  const [data, setData] = React.useState({
    MaHD: "",
    ThoiGian: new Date(Date.now()),
  });
  const [trahangList, settrahangList] = useState([]);

  const onSearch = useCallback((e)=> {
    
  });

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
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Form.Item>
        <Form.Item label="Ngày lập:">
          <DatePicker defaultValue={moment(data.ThoiGian)} disabled={true} />
        </Form.Item>
        <Form.Item>
          <SanPhamTraHang/>
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
              3 <br /> 1440000
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
