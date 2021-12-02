import React, { useCallback, useRef, useState } from "react";
import { Button, Col, Input, InputNumber, Row } from "antd";
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
          <Col flex="13%">
            <label style={{ textAlign: "center" }}>{data.MaSP}</label>{" "}
          </Col>
          <Col flex="39%">
            <label style={{ float: "left" }}>{data.TenSP}</label>{" "}
          </Col>
          <Col flex="16%">
            <InputNumber
              style={{
                width: "70px",
                borderBottomStyle: "solid",
                borderWidth: "1px",
                borderColor: "lightgreen",
                textAlign: "center",
                top: "-3px",
              }}
              min={0}
              max={SP.SLmax}
              bordered={false}
              value={data.SoLuong}
              onChange={(e) => {
                setData({ ...data, SoLuong: e });
                setDataPDT({
                  ...data,
                  SoLuong: e,
                  ThanhTien: e * data.GiaBan,
                });
              }}
            />
          </Col>
          <Col flex="15%">
            <label style={{ textAlign: "right" }}>
              {`${data.GiaBan}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
          </Col>
          <Col flex="17%">
            <label style={{ textAlign: "right" }}>
              {`${data.ThanhTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
          </Col>
        </Row>
      </section>
    </>
  );
}
