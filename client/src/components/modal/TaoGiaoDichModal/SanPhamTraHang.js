import React, { useCallback, useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

export default function SanPhamTraHang({ SP }) {
  const [data, setData] = React.useState({
    MaSP: SP.MaSP,
    TenSP: SP.TenSP,
    SoLuong: SP.SoLuong,
    GiaBan: SP.DonGia,
    ThanhTien: SP.ThanhTien,
  });
  const OnInputSLChange = useCallback((e) => {
    const value = e.target.value;
    setData({
      ...data,
      ThanhTien:
        value >= SP.SoLuong
          ? SP.SoLuong * data.GiaBan
          : value <= 0
          ? 0
          : value * data.GiaBan,
      SoLuong: data.ThanhTien / data.DonGia,
    });
  }, []);
  return (
    <>
      <section
        style={{
          marginBottom: "2px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: 'lightblue',
          paddingTop: '6px',
        }}
      >
        <Row style={{ textAlign: "center" }}>
          <Col flex='80px'>
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
              icon={<CaretLeftOutlined marginRight={2}/>}
              size="small"
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
            <Input
              style={{
                width: "50px",
                borderBottomStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'lightgreen',
                textAlign: "center",
                top: '-3px'
              }}
              bordered={false}
              rules={[
                { type: "number", min: 0, max: SP.SoLuong },
                { required: true, message: "Vui lòng nhập số lượng" },
              ]}
              value={
                data.SoLuong > SP.SoLuong
                  ? SP.SoLuong
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
              icon={<CaretRightOutlined />}
              size="small"
              disabled={data.SoLuong >= SP.SoLuong}
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
          <Col flex='75px'>
            <label style={{ textAlign: "center" }}>{data.ThanhTien}</label>
          </Col>
        </Row>
      </section>
    </>
  );
}
