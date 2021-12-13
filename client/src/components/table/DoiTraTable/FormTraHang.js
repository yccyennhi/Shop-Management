import { Tabs, Descriptions } from "antd";
import React from "react";
import "./FormTraHang.css";
import ChiTietTraHangTable from "./ChiTietTraHangTable";
import moment from "moment";
const { TabPane } = Tabs;

export default function app({ record }) {
  const CTPDTs = record.CTPDT;
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Thông tin chi tiết" key="1">
          <Descriptions>
            <Descriptions.Item label="Mã phiếu trả hàng">
              {record.MaPDT}
            </Descriptions.Item>
            <Descriptions.Item label="Mã hóa đơn">
              {record.MaHD}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian">
              {moment(record.ThoiGian).format("DD/MM/YYYY  HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Mã nhân viên">
              {record.MaNV}
            </Descriptions.Item>
          </Descriptions>
          <ChiTietTraHangTable dataCTPDTs={CTPDTs} />
          <section className="info_bill">
            <label className="tittle">
              Tổng số lượng: <br />
              Tổng tiền hàng trả: <br />
            </label>
            <label>
              {record.SoLuong} <br />{" "}
              {`${record.ThanhTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
