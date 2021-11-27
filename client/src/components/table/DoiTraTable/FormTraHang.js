import { Tabs } from "antd";
import React from "react";
import "./FormTraHang.css";
import ChiTietTraHangTable from "./ChiTietTraHangTable";

const { TabPane } = Tabs;

export default function app({ record, dataCTPDTs }) {
  const CTPDTs = [];
  dataCTPDTs.forEach((CTPDT) => {
    if (CTPDT.idPDT === record._id) {
      CTPDTs.push(CTPDT);
    }
  });
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Thông tin" key="1">
          <ChiTietTraHangTable dataCTPDTs={CTPDTs} />
          <section className="info_bill">
            <label className="tittle">
              Tổng số lượng: <br />
              Tổng tiền hàng trả: <br />
            </label>
            <label>
              {record.SoLuong} <br /> {record.TongTien}
            </label>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
