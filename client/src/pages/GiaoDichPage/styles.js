import React from "react";
import DataTable from "./DataTableDatHang";

function Bodybar() {
  return (
    <section className="main_body">
      <section className="sidebar_left">
        <section className="section_style">
          <h4>Thời gian</h4>
          <section className="radio_time_section">
            <input type="radio" value="true" />
            <label className="label_period_time">
              Thời gian
            </label>
          </section>
          <section className="radio_time_section">
            <input type="radio" value="true" />
          </section>
        </section>
        <section className="section_style">lkjh</section>
      </section>
      <section className="sidebar_mid">
        <div className="main_body_section">
          <DataTable/>
        </div>
      </section>
    </section>
  );
}

export default Bodybar;
