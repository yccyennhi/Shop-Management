import React, { useEffect } from "react";
import { Button, Col, InputNumber, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function SanPhamTraHang({ sp, SPPanelChange, SPPanelRemove }) {
  const [data, setData] = React.useState();
  useEffect(() => {
    setData(sp);
  }, [sp]);
  if (data) data.ThanhTien = data.SoLuong * data.DonGia;
  return (
    <>
      {data ? (
        <section
          style={{
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "lightblue",
            paddingTop: 5,
          }}
        >
          <Row style={{ textAlign: "center" }}>
            <Col flex="5%">{data.STT}</Col>
            <Col flex="10%">
              <label style={{ textAlign: "center" }}>{data.MaSP}</label>{" "}
            </Col>
            <Col flex="50%">
              <label style={{ float: "left", marginLeft: "10%" }}>
                {data.TenSP}
              </label>
            </Col>
            <Col flex="10%">
              <InputNumber
                min={0}
                max={data.TonKho}
                bordered={false}
                style={{
                  top: 0,
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                  textAlign: "",
                  width: 65,
                }}
                size="small"
                value={data.SoLuong}
                onChange={(e) => {
                  setData({ ...data, SoLuong: e });
                  SPPanelChange({
                    ...data,
                    SoLuong: e,
                    ThanhTien: e * data.DonGia,
                  });
                }}
              />
            </Col>
            <Col flex="10%">
              <label style={{ textAlign: "right" }}>
                {`${data.DonGia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </label>
            </Col>
            <Col flex="10%">
              <label style={{ textAlign: "right" }}>
                {`${data.ThanhTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </label>
            </Col>
            <Col flex="5%">
              <Button
                danger
                type="link"
                icon={<DeleteOutlined />}
                style={{ top: -5 }}
                onClick={() => SPPanelRemove(data.STT - 1)}
              />
            </Col>
          </Row>
        </section>
      ) : null}
    </>
  );
}
