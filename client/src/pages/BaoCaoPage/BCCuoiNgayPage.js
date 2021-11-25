import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import moment from "moment";
import { PageHeader, Space, Card, DatePicker, Layout } from "antd";
import CuoiNgaytable from "../../components/table/BaoCaoTable/CuoiNgaytable";

import { CuoiNgaysState$ } from "../../redux/selectors";
import COLOR from "../../color.js";

const { Content, Sider } = Layout;

export default function BCCuoiNgayPage() {
  
  const [currentDate, setCurrentDate] = useState(moment().startOf("day"));

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getCuoiNgays.getCuoiNgaysRequest());
  }, [dispatch]);

  const HoaDons = useSelector(CuoiNgaysState$);
  const [dataSoure, setdataSoure] = useState(HoaDons);

  React.useEffect(() => {
    if (HoaDons.length) {
      const data = HoaDons.filter(
        (HoaDon) => HoaDon.ThoiGian.startOf("day") === currentDate.startOf("day")
      );
      setdataSoure(data);
    }
  }, [HoaDons, currentDate]);

  console.log(currentDate, dataSoure);
  return (
    <Layout>
      <Layout>
        <Content>
          <PageHeader className="site-page-header" title="Báo cáo cuối ngày" />
        </Content>
      </Layout>
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px" }}
          className="site-layout-sider"
        >
          <div className="site-card-border-less-wrapper">
            <Space direction="vertical">
              <Card
                title="Thời gian áp dụng"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <DatePicker defaultValue={moment()} format="DD/MM/YYYY"  onChange={(e) => setCurrentDate(e)}/>
              </Card>
            </Space>
          </div>
        </Sider>
        <Content style={{ padding: "17px 24px 24px" }}>
          <div className="site-layout-content">
            <CuoiNgaytable />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
