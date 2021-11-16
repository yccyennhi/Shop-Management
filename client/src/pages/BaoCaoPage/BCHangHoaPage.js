import React from "react";
import {  PageHeader} from "antd";
import HangHoatable from '../../components/table/BaoCaoTable/HangHoatable';



export default function BCHangHoaPage() {

  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Báo cáo hàng hóa" /> 
        <div>    
        <HangHoatable/>
        </div>
      </div>
    </>
  );
}
