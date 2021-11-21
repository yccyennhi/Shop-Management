import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import COLOR from "../../color.js";

import {
  Menu,
  Layout,
  PageHeader,
  Card,
  DatePicker,
  Space,
  Typography,
  Radio,
} from "antd";
import "./styles.css";
import { DatabaseTwoTone } from "@ant-design/icons";

import HangHoatable from "../../components/table/HangHoatable/HangHoatable.js";
import { SanPhamsState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;
const { Text } = Typography;
const { SubMenu } = Menu;

export default function HangHoaPage() {
  const [currentId, setCurrentId] = useState(null);
  const SanPhams = useSelector(SanPhamsState$);
  const SLSanPham = SanPhams.length;
  const [trangthai, setTrangthai] = useState(1);
  const [baohanh, setBaohanh] = useState(1);

  return (
    <Layout>
      <Layout>
        <Content>
          <PageHeader className="site-page-header" title="Danh mục hàng hóa" />
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
              {/* <Card
                title="Số lượng hàng hóa"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Space direction="horizontal">
                  <DatabaseTwoTone style={{ fontSize: "40px" }} />
                  <Text
                    strong
                    style={{ fontSize: "1.4rem", color: COLOR.darkblue }}
                  >
                    {SLSanPham} sản phẩm
                  </Text>
                </Space>
              </Card> */}
              <Card
                title="Trạng thái kinh doanh"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setTrangthai(1)}>
                      Tất cả
                    </Radio>
                    <Radio value={2} onClick={() => setTrangthai(2)}>
                      Đang kinh doanh
                    </Radio>
                    <Radio value={3} onClick={() => setTrangthai(3)}>
                      Ngừng kinh doanh
                    </Radio>
                    <Radio value={4} onClick={() => setTrangthai(4)}>
                      Hết hàng
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
              <Card
                title="Bảo hành"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setBaohanh(1)}>
                      Tất cả
                    </Radio>
                    <Radio value={2} onClick={() => setBaohanh(2)}>
                      Có bảo hành
                    </Radio>
                    <Radio value={3} onClick={() => setBaohanh(3)}>
                      Không bảo hành
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
            </Space>
          </div>
        </Sider>
        <Content>
          <Layout style={{ padding: "17px 24px 24px" }}>
            <div className="site-layout-content">
              <HangHoatable
                trangthai={trangthai}
                baohanh={baohanh}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </div>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
