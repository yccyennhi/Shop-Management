import { Tabs } from "antd";
import React from "react";
import "./FormHoaDon.css";
import HangHoaBanTable from "../../components/table/HoaDonTable/HangHoaBanTable";

const { TabPane } = Tabs;

export default function app() {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Thông tin" key="1">
          <HangHoaBanTable />
          <section className="info_bill">
            <label className="tittle">
              Tổng số lượng: <br />
              Tổng tiền hàng: <br />
              Giảm giá: <br />
              Thành tiền: <br />
              Tiền khách trả: <br />
              Tiền trả khách:
            </label>
            <label>
              3 <br /> 1440000 <br /> 0 <br /> 1440000 <br /> 1500000 <br /> 60000 <br />
            </label>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
