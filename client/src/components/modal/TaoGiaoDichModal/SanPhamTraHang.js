import React, { useCallback, useState } from "react";
import { Button, Col, Row } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
export default function SanPhamTraHang() {
  const [data, setData] = React.useState({
    MaSP: "MaSP",
    TenSP: "TenSP",
    SoLuong: 5,
    GiaBan: 15000,
    ThanhTien: 75000,
  });
  const [maxinput] = useState(data.SoLuong);
  const OnInputSLChange = useCallback((e) => {
    const value = e.target.value;
    setData({
      ...data,
      ThanhTien:
        value >= maxinput
          ? maxinput * data.GiaBan
          : value <= 0
          ? 0
          : value * data.GiaBan,
      SoLuong: value,
    });
  }, []);
  return (
    <>
      <Button block style={{ marginBottom: "2px" }}>
        <Row style={{ textAlign: "center" }}>
          <Col flex={2}>
            <label style={{ textAlign: "center", fontWeight: "500" }}>
              {data.MaSP}
            </label>{" "}
          </Col>
          <Col flex={10}>
            <label style={{ float: "left" }}>{data.TenSP}</label>{" "}
          </Col>
          <Col flex={1} disabled={data.SoLuong < 0}>
            <Button
              shape="circle"
              icon={<MinusOutlined />}
              size="small"
              borderStyle="none"
              disabled={data.SoLuong <= 0}
              onClick={() =>
                setData({
                  ...data,
                  SoLuong: data.SoLuong - 1,
                  ThanhTien: data.ThanhTien - data.GiaBan,
                })
              }
            />
          </Col>
          <Col flex={1}>
            <input
              style={{
                width: "50px",
                borderStyle: "none",
                textAlign: "center",
              }}
              rules={[
                { type: "number", min: 0, max: maxinput },
                { required: true, message: "Vui lòng nhập số lượng" },
              ]}
              value={
                data.SoLuong > maxinput
                  ? maxinput
                  : data.SoLuong < 0
                  ? 0
                  : data.SoLuong
              }
              onChange={OnInputSLChange}
            />{" "}
          </Col>
          <Col flex={1}>
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              size="small"
              borderStyle="none"
              disabled={data.SoLuong >= maxinput}
              onClick={() =>
                setData({
                  ...data,
                  SoLuong: data.SoLuong + 1,
                  ThanhTien: data.ThanhTien + data.GiaBan,
                })
              }
            />
          </Col>
          <Col flex={2}>
            <label style={{ textAlign: "center" }}>{data.GiaBan}</label>
          </Col>
          <Col flex={2}>
            <label style={{ textAlign: "center" }}>{data.ThanhTien}</label>
          </Col>
        </Row>
      </Button>
    </>
  );
}
