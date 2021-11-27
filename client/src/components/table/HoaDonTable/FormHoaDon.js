import { Tabs } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "./FormHoaDon.css";
import HangHoaBanTable from "./HangHoaBanTable";

const { TabPane } = Tabs;

export default function FormHoaDon({ record, dataCTHDs }) {
  const CTHDs = [];
  dataCTHDs.map((CTHD) => {
    if (CTHD.MaHD === record.MaHD) {
      CTHDs.push(CTHD);
    }
  });

  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Thông tin" key="1">
          <HangHoaBanTable dataCTHDs={CTHDs} />
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
              {record.SoLuong} <br />
              {record.TongTienHang}
              <br /> {record.GiamGia} <br /> {record.ThanhTien} <br />{" "}
              {record.TienKhachTra} <br /> {record.TienTraKhach} <br />
            </label>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
