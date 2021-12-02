import { Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./FormHoaDon.css";
import HangHoaBanTable from "./HangHoaBanTable";

const { TabPane } = Tabs;

export default function FormHoaDon({ record }) {

  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Thông tin" key="1">
          <HangHoaBanTable dataCTHDs={record} />
          <section className="info_bill">
            <label className="tittle">
              Tổng số lượng: <br />
              Tổng tiền hàng: <br />
              Giảm giá: <br />
              Thành tiền: <br />
              Tiền khách trả: <br />
              Tiền trả khách:
            </label>
            <label style ={{textAlign: 'right'}}>
              {record.SoLuong}<br />
              {`${record.TongTienHang}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <br /> {`${record.GiamGia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br /> {`${record.ThanhTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br />{" "}
              {`${record.TienKhachTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br /> {`${record.TienTraKhach} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br />
            </label>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
