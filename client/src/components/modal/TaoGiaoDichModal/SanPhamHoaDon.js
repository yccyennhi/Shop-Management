import React, { useCallback, useState } from "react";
import { Button, Col, Input, InputNumber, Row, Select } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

export default function SanPhamHoaDon() {
  const [data, setData] = React.useState({
    MaSP: "SP.MaSP",
    TenSP: "SP.TenSP",
    SoLuong: 0,
    MauSac: "",
    Size: 0,
    GiaBan: 0,
    ThanhTien: 0,
  });
  //   data.SoLuong =
  //     data.SoLuong >= SP.SoLuong
  //       ? SP.SoLuong
  //       : data.SoLuong <= 0
  //       ? 0
  //       : data.SoLuong;
  data.ThanhTien = data.SoLuong * data.GiaBan;
  const { Option } = Select;

  return (
    <>
      <section
        tyle={{
          marginBottom: "2px",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "lightblue",
          paddingTop: "6px",
          width: "700px",
          marginLeft: "10px",
        }}
      >
        <Row style={{ textAlign: "center" }}>
          <Col flex="80px">
            <label style={{ textAlign: "center", fontWeight: "500" }}>
              {data.MaSP}
            </label>{" "}
          </Col>
          <Col flex="170px">
            <label style={{ float: "left" }}>{data.TenSP}</label>{" "}
          </Col>
          <Col flex="80px">
            <Select
              size="small"
              value={data.MauSac}
              placeholder="Màu sắc"
              onChange={(e) => setData({ ...data, MauSac: e })}
            >
              <Option value="0">Đen</Option>
              <Option value="1">Trắng</Option>
            </Select>
          </Col>
          <Col>
            <InputNumber placeholder='Size' style={{ marginLeft: "5px" }} min={35} max={60} size="small" />
          </Col>
          <Col
            flex="30px"
            disabled={data.SoLuong < 0}
            style={{ marginLeft: "2px" }}
          >
            <Button
              shape="circle"
              icon={<CaretLeftOutlined />}
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
          <Col flex="50px">
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
              value={data.SoLuong}
              onChange={(e) => {
                if (Number(e.target.value))
                  setData({ ...data, SoLuong: Number(e.target.value) });
                else setData({ ...data, SoLuong: 0 });
              }}
            />
          </Col>
          <Col flex="30px">
            <Button
              shape="circle"
              icon={<CaretRightOutlined />}
              size="small"
              disabled={data.SoLuong >= 5}
              onClick={() =>
                setData({
                  ...data,
                  SoLuong: data.SoLuong + 1,
                  ThanhTien: data.ThanhTien + data.GiaBan,
                })
              }
            />
          </Col>
          <Col flex="60px">
            <label style={{ textAlign: "right" }}>{data.GiaBan}</label>
          </Col>
          <Col flex="80px">
            <label style={{ textAlign: "right" }}>{data.ThanhTien}</label>
          </Col>
        </Row>
      </section>
    </>
  );
}
