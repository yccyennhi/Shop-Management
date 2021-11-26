import React, { useCallback, useRef, useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

export default function SanPhamTraHang({ setDataPDT, SP }) {
  const [data, setData] = React.useState(SP);
  data.SoLuong =
    data.SoLuong >= SP.SLmax
      ? SP.SoLuong
      : data.SoLuong <= 0
      ? 0
      : data.SoLuong;
  data.ThanhTien = data.SoLuong * data.GiaBan;
  return (
    <>
      <section
        style={{
          marginBottom: "2px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "lightblue",
          paddingTop: "6px",
        }}
      >
        <Row style={{ textAlign: "center" }}>
          <Col flex="80px">
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
              icon={<CaretLeftOutlined />}
              size="small"
              disabled={data.SoLuong <= 0}
              onClick={() => {
                setData({
                  ...data,
                  SoLuong: data.SoLuong - 1,
                  ThanhTien: data.ThanhTien - data.GiaBan,
                });
                console.log(data);
                setDataPDT({
                  ...data,
                  SoLuong: data.SoLuong - 1,
                  ThanhTien: data.ThanhTien - data.GiaBan,
                });
              }}
            />
          </Col>
          <Col flex={1}>
            <Input
              style={{
                width: "50px",
                borderBottomStyle: "solid",
                borderWidth: "1px",
                borderColor: "lightgreen",
                textAlign: "center",
                top: "-3px",
              }}
              bordered={false}
              rules={[
                { type: "Number", min: 0, max: SP.SoLuong },
                { required: true, message: "Vui lòng nhập số lượng" },
              ]}
              value={data.SoLuong}
              onChange={(e) => {
                if (Number(e.target.value)) {
                  const value = Number(e.target.value);
                  setData({ ...data, SoLuong: value });
                  const SL =
                    value >= data.SLmax ? data.SLmax : value <= 0 ? 0 : value;
                  setDataPDT({
                    ...data,
                    SoLuong: SL,
                    ThanhTien: SL * data.GiaBan,
                  });
                } else {
                  setData({ ...data, SoLuong: 0 });
                  setDataPDT({ ...data, SoLuong: 0, ThanhTien: 0 });
                }
              }}
            />
          </Col>
          <Col flex={1}>
            <Button
              shape="circle"
              icon={<CaretRightOutlined />}
              size="small"
              disabled={data.SoLuong >= SP.SLmax}
              onClick={() => {
                setData({
                  ...data,
                  SoLuong: data.SoLuong + 1,
                  ThanhTien: data.ThanhTien + data.GiaBan,
                });
                console.log(data);
                setDataPDT({
                  ...data,
                  SoLuong: data.SoLuong + 1,
                  ThanhTien: data.ThanhTien + data.GiaBan,
                });
              }}
            />
          </Col>
          <Col flex={2}>
            <label style={{ textAlign: "center" }}>{data.GiaBan}</label>
          </Col>
          <Col flex="75px">
            <label style={{ textAlign: "center" }}>{data.ThanhTien}</label>
          </Col>
        </Row>
      </section>
    </>
  );
}
