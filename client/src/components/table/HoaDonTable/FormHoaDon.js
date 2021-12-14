import { Descriptions, Tabs } from "antd";
import React from "react";
import "./FormHoaDon.css";
import HangHoaBanTable from "./HangHoaBanTable";
import moment from "moment";

const { TabPane } = Tabs;

export default function FormHoaDon({ record }) {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Thông tin chi tiết" key="1">
          <Descriptions>
            <Descriptions.Item label="Mã hóa đơn">
              {record.MaHD}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian">
              {moment(record.ThoiGian).format("DD/MM/YYYY  HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Mã nhân viên">
              {record.MaNV}
            </Descriptions.Item>
            <Descriptions.Item label="Khách hàng">
              {record.MaKH != "61b769ba26b4dbbca417c4de"
                ? record.MaKH
                : "Không"}
            </Descriptions.Item>
            <Descriptions.Item label="Mã khuyến mãi">
              {record.MaKM != "KM000" ? record.MaKM : "Không"}
            </Descriptions.Item>
          </Descriptions>
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
            <label style={{ textAlign: "right" }}>
              {record.SoLuong}
              <br />
              {`${record.TongTienHang}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <br /> {`${record.GiamGia}`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}{" "}
              <br />{" "}
              {`${record.ThanhTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              <br />{" "}
              {`${record.TienKhachTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              <br />{" "}
              {`${record.TienTraKhach} `.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <br />
            </label>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
