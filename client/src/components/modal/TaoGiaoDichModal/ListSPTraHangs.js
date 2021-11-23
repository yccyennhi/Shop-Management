import React from "react";
import SanPhamTraHang from "./SanPhamTraHang";
export default function ListSPs({ data, setDatas, CTHDs }) {
  const List = [];
  CTHDs.forEach((CTHD) => {
    if (CTHD.MaHD === data.MaHD) {
      List.push(CTHD);
    }
  });
  return (
    <>
      {List.map(SP => 
        <SanPhamTraHang key={SP.MaSP} dataInfo={data} setDatas={setDatas} SP={SP} />
      )}
    </>
  );
}
