import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import moment from "moment";
import { PageHeader, Space, Card, DatePicker, Layout, Radio } from "antd";
import BanHangtable from "../../components/table/BaoCaoTable/BanHangtable";
import BanHangColumnReport from "../../components/chart/BanHangColoumnReport";

import { BCBanHangsState$ } from "../../redux/selectors";
import COLOR from "../../color.js";

const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

export default function BCBanHangPage() {
  const today = [moment().subtract(7, "day").startOf("day"), moment()];
  const [currentDate, setCurrentDate] = useState(today);

  /* #region  Lấy data từ server */

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.getBCBanHangs.getBCBanHangsRequest());
  }, [dispatch]);

  const HoaDons = useSelector(BCBanHangsState$);
  /* #endregion */

  /* #region  set data theo ngày */
  const [currentDataSource, setCurrentDataSource] = useState();

  React.useEffect(() => {
    if (HoaDons) {
      const data = Object.entries(HoaDons).filter(([key, value]) =>
        moment(key).isBetween(currentDate[0], currentDate[1].endOf("day"))
      );
      setCurrentDataSource(data);
    }
  }, [HoaDons, currentDate]);
  /* #endregion */

  /* #region  set kiểu hiển thị */
  const [activeType, setActiveType] = useState("baoCao");

  const typeShow = {
    baoCao: <BanHangtable currentDataSource={currentDataSource} />,
    bieuDo: <BanHangColumnReport currentDataSource={currentDataSource} />,
  };

  /* #endregion */
  const dateFormat = "DD/MM/YYYY";
  return (
    <Layout>
      <Layout>
        <Content>
          <PageHeader className="site-page-header" title="Báo cáo bán hàng" />
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
                title="Kiểu hiển thị"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setActiveType("baoCao")}>
                      Báo cáo
                    </Radio>
                    <Radio value={2} onClick={() => setActiveType("bieuDo")}>
                      Biểu đồ
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
              <Card
                title="Thời gian áp dụng"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <RangePicker
                  defaultValue={today}
                  onChange={(e) =>
                    e ? setCurrentDate(e) : setCurrentDate(today)
                  }
                  format={dateFormat}
                />
              </Card>
            </Space>
          </div>
        </Sider>
        <Content style={{ padding: "17px 24px 24px" }}>
          <div className="site-layout-content">
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {typeShow[activeType]}
            </Space>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
