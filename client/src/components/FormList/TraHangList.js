import React from "react";
import TraHang from "./TraHang";
export default function TraHangList({ trahangList, OnButtonTraHangClick }) {
  return (
    <>
      {trahangList.map((trahang) => (
        <TraHang key = {trahang.id} trahang={trahang}  OnButtonTraHangClick= {OnButtonTraHangClick}/>
      ))}
    </>
  );
}
