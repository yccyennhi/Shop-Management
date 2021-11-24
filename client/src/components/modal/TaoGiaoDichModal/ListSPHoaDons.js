import React from "react";
import SanPhamHoaDon from "./SanPhamHoaDon";
export default function ListSPHoaDons({ SPsInfo}) {
  return (
    <>
    <SanPhamHoaDon />
      {/* {SPsInfo.map(SP => 
        <SanPhamTraHang key={SP.MaSP} SP={SP} />
      )} */}
    </>
  );
}
