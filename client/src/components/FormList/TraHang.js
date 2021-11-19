import { Button } from "antd";
import React from "react";
export default function TraHang({ trahang, OnButtonTraHangClick }) {
  return (
    <Button
      block
      style={{ textAlign: "left" }}
      onClick={() => OnButtonTraHangClick(trahang.id)}
    >
      <h3 style={{ width: "50px", float: "left" }}>
        {" "}
        {trahang.number}. {trahang.name}
      </h3>{" "}
      <span style={{ float: "right", marginRight: "0px" }}>
        {" "}
        {trahang.number}{" "}
      </span>
    </Button>
  );
}
