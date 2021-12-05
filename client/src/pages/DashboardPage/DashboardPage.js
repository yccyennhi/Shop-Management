import React, { useState } from "react";
import { Layout, Space, PageHeader, Row, Col, Card, List, Avatar } from "antd";
import TodayReportOverall from "../../components/Dashboard/TodayReportOverall";
import DemoColumn from "../../components/chart/DashboardColumnReport";
import { Content, Header } from "antd/lib/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { HoaDonsState$, NhanViensState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";
import { HighestSanPhamList } from "../../components/Dashboard/highestSanPhamList";
import Menubar from "../../components/header/Menubar/Menubar";
import moment from "moment";
import {
  DollarOutlined
} from "@ant-design/icons";

export default function KhuyenMaiPage() {
  const dispatch = useDispatch();
  const HoaDons = useSelector(HoaDonsState$);
  const NhanViens = useSelector(NhanViensState$);

  const [HD, setHD] = useState(HoaDons);
  React.useEffect(() => {
    dispatch(actions.getHoaDons.getHoaDonsRequest());
    dispatch(actions.getTongQuans.getDataRequest());
    dispatch(actions.getNhanViens.getNhanViensRequest());
  }, [dispatch]);

  React.useEffect(() => {
    const listHD = HoaDons.sort((a, b) =>
      moment(a.createdAt) < moment(b.createdAt) ? 1 : -1
    );
    setHD(listHD);
  }, [dispatch, HoaDons]);

  return (
    <Layout>
      <Header>
        <Menubar />
      </Header>
      <PageHeader
        onBack={() => window.history.back()}
        className="site-page-header"
        title="Tổng quan"
      />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content-2">
          <Row>
            <Col span={18}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%", padding: "0px 24px 0px 0px" }}
              >
                <TodayReportOverall />
                <DemoColumn />
                <HighestSanPhamList />
              </Space>
            </Col>
            <Col span={6}>
              <Space
                direction="vertical"
                size="large"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "15px 24px 0px 0px",
                }}
              >
              <Card title="Đơn hàng gần đây">
              <List
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 10,
                  }}
                  itemLayout="horizontal"
                  dataSource={HoaDons}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: '#87d068' }} icon={<DollarOutlined />} />
                        }
                        title={<a>{NhanViens.find((data)=>data.MaNV==item.MaNV).TenNV} vừa bán đơn hàng {item.MaHD} trị giá {item.ThanhTien} VNĐ</a>}
                        description={<>{moment(moment(Date.now())-moment(item.createdAt)).format("HH")} giờ trước </>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
                
                
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
