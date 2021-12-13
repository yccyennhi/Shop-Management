import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import COLOR from "../../color.js";
import SanPhamModal from "../../components/modal/SanPhamModal/SanPhamModal";
import { AuthContext } from "../../contexts/AuthContext";

import {
  Layout,
  PageHeader,
  Card,
  Space,
  Typography,
  Radio,
  Row,
  Divider,
  Button,
  Col,
  Result,
} from "antd";
import "./styles.css";
import {
  DatabaseTwoTone,
  SafetyCertificateTwoTone,
  ShopTwoTone,
  PlusOutlined,
} from "@ant-design/icons";

import HangHoatable from "../../components/table/HangHoatable/HangHoatable.js";
import { SanPhamsState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";
import Menubar from "../../components/header/Menubar/Menubar";
const { Content, Sider, Header } = Layout;
const { Text } = Typography;

export default function HangHoaPage() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const SanPhams = useSelector(SanPhamsState$);
  const [trangthai, setTrangthai] = useState(1);
  const [baohanh, setBaohanh] = useState(1);

  const openCreateSanPhamModal = React.useCallback(() => {
    dispatch(actions.showTaoSanPhamModal());
  }, [dispatch]);

  const SPDKD = SanPhams.filter(function (e) {
    return e.TrangThai == "Đang kinh doanh";
  });

  const SPCBH = SanPhams.filter(function (e) {
    return e.BaoHanh == "Có bảo hành";
  });
  const {
    authState: { TaiKhoan },
  } = useContext(AuthContext);
  if (TaiKhoan.TenTK != "ADMIN") {
    return (
      <Result
        className="error-page"
        status="error"
        title="Hạn chế quyền truy cập"
        subTitle="Vui lòng kiểm tra lại đường link hoặc tài khoản đăng nhập!"
      />
    );
  } else
    return (
      <Layout>
        <Header>
          <Menubar />
        </Header>
        <Layout>
          <Content>
            <PageHeader
              onBack={() => window.history.back()}
              className="site-page-header"
              title="Danh mục hàng hóa"
            />
          </Content>
        </Layout>
        <Layout>
          <Sider
            width={300}
            style={{ padding: "0px 0px 0px 24px", background: "#F0F2F5" }}
            className="site-layout-sider"
          >
            <div className="site-card-border-less-wrapper">
              <Space direction="vertical">
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
                <Row justify="start">
                  <Col span={8}>
                    <Space align="center" size={20}>
                      <DatabaseTwoTone style={{ fontSize: "40px" }} />
                      <Space direction="vertical" size={0}>
                        <Text strong>{SanPhams.length} sản phẩm</Text>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                          {SanPhams.length}
                        </Text>
                        <Text type="secondary">Tổng số lượng sản phẩm</Text>
                      </Space>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <Space align="center" size={20}>
                      <ShopTwoTone style={{ fontSize: "40px" }} />
                      <Space direction="vertical" size={0}>
                        <Text strong>{SPDKD.length} sản phẩm</Text>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                          {SPDKD.length}
                        </Text>
                        <Text type="secondary">
                          Số sản phẩm đang kinh doanh
                        </Text>
                      </Space>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <Space align="center">
                      <SafetyCertificateTwoTone style={{ fontSize: "40px" }} />
                      <Space direction="vertical" size={0}>
                        <Text strong>{SPCBH.length} sản phẩm</Text>
                        <Text strong style={{ fontSize: "1.5rem" }}>
                          {SPCBH.length}
                        </Text>
                        <Text type="secondary">Số sản phẩm có bảo hành</Text>
                      </Space>
                    </Space>
                  </Col>
                </Row>
                <Divider orientation="left"></Divider>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openCreateSanPhamModal}
                >
                  Thêm hàng hóa
                </Button>

                <HangHoatable
                  trangthai={trangthai}
                  baohanh={baohanh}
                  setCurrentId={setCurrentId}
                />
                <SanPhamModal
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
