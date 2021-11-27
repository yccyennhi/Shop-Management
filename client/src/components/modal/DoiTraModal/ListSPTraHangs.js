import React from "react";
import SanPhamTraHang from "./SanPhamTraHang";
export default function ListSPs({ setDataPDT, CTHDs }) {
  return (
    <>
      {CTHDs.map(SP => 
        <SanPhamTraHang key={SP.id} setDataPDT={setDataPDT} SP={SP} />
      )}
    </>
  );
}
