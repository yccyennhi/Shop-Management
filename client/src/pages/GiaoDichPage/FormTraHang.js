import { Tabs } from "antd";
import React from "react";
import "./FormTraHang.css";
import ChiTietTraHangTable from "../../components/table/HoaDonTable/ChiTietTraHangTable";

const { TabPane } = Tabs;

export default function app() {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Thông tin" key="1">
          < ChiTietTraHangTable/>
          <section className="info_bill">
            <label className="tittle">
              Tổng số lượng: <br />
              Tổng tiền hàng trả: <br />
              Giảm giá phiếu trả: <br />
              Phí trả hàng: <br />
              Tiền khách cần trả: <br />
              Tiền khách nợ:
            </label>
            <label>
              3 <br /> 1440000 <br /> 0 <br /> 60000 <br /> 1500000 <br /> 0 <br />
            </label>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
