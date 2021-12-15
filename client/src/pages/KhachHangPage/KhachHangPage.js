import {
  DatabaseTwoTone,
  FrownTwoTone,
  PlusOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  PageHeader,
  Radio,
  Row,
  Space,
  Typography,
  Result,
} from "antd";
import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "../../color.js";
import Menubar from "../../components/header/Menubar/Menubar.js";
import KhachHangModal from "../../components/modal/KhachHangModal/KhachHangModal";
import KhachHangTable from "../../components/table/KhachHangTable/KhachHangTable";
import * as actions from "../../redux/actions";
import { showKhachHangModal } from "../../redux/actions";
import { isLoadingKhachHangsState$, KhachHangsState$ } from "../../redux/selectors/index.js";

const { Content, Sider, Header } = Layout;
const { Text } = Typography;

export default function KhachHangPage() {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  //#region Modal
  const openKhachHangModal = useCallback(() => {
    dispatch(showKhachHangModal());
  }, [dispatch]);
  //#endregion

  //#region Data KhachHangs
  const KhachHangs = useSelector(KhachHangsState$);

  const isLoadingTable = useSelector(isLoadingKhachHangsState$);

  const [dataSource, setdataSoure] = useState(KhachHangs);

  useEffect(() => {
    dispatch(actions.getKhachHangs.getKhachHangsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (KhachHangs) setdataSoure(KhachHangs);
  }, [KhachHangs]);

  const SLKHConHoatDong = KhachHangs.filter(
    (KhachHang) => KhachHang.TrangThai === true
  ).length;
  //#endregion
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
  }
  return (
    <Layout>
      <Header>
        <Menubar />
      </Header>
      <PageHeader
        onBack={() => window.history.back()}
        className="site-page-header"
        title="Khách hàng"
      />
      <Layout>
        <Sider
          width={300}
          style={{ padding: "0px 0px 0px 24px", background: "#F0F2F5" }}
          className="site-layout-sider"
        >
          <div className="site-card-border-less-wrapper">
            <Space direction="vertical">
              <Card
                title="Trạng thái hoạt động"
                bordered={false}
                style={{ width: 250, color: COLOR.darkblue }}
              >
                <Radio.Group defaultValue={1}>
                  <Space direction="vertical">
                    <Radio value={1} onClick={() => setdataSoure(KhachHangs)}>
                      Tất cả
                    </Radio>
                    <Radio
                      value={2}
                      onClick={() =>
                        setdataSoure(
                          KhachHangs.filter(
                            (KhachHang) => KhachHang.TrangThai === true
                          )
                        )
                      }
                    >
                      Còn hoạt động
                    </Radio>
                    <Radio
                      value={3}
                      onClick={() =>
                        setdataSoure(
                          KhachHangs.filter(
                            (KhachHang) => KhachHang.TrangThai === false
                          )
                        )
                      }
                    >
                      Ngừng hoạt động
                    </Radio>
                  </Space>
                </Radio.Group>
              </Card>
            </Space>
          </div>
        </Sider>
        <Content style={{ padding: "17px 24px 24px" }}>
          <div className="site-layout-content">
            <Row justify="start">
              <Col span={8}>
                <Space align="center" size={20}>
                  <DatabaseTwoTone style={{ fontSize: "40px" }} />
                  <Space direction="vertical" size={0}>
                    <Text strong>{KhachHangs.length} khách hàng</Text>
                    <Text strong style={{ fontSize: "1.5rem" }}>
                      {KhachHangs.length}
                    </Text>
                    <Text type="secondary">Tổng số khách hàng đã đăng ký</Text>
                  </Space>
                </Space>
              </Col>
              <Col span={8}>
                <Space align="center" size={20}>
                  <SmileTwoTone style={{ fontSize: "40px" }} />
                  <Space direction="vertical" size={0}>
                    <Text strong>{SLKHConHoatDong} khách hàng</Text>
                    <Text strong style={{ fontSize: "1.5rem" }}>
                      {SLKHConHoatDong}
                    </Text>
                    <Text type="secondary">Số khách hàng còn hoạt động</Text>
                  </Space>
                </Space>
              </Col>
              <Col span={8}>
                <Space align="center" size={20}>
                  <FrownTwoTone style={{ fontSize: "40px" }} />
                  <Space direction="vertical" size={0}>
                    <Text strong>
                      {KhachHangs.length - SLKHConHoatDong} khách hàng
                    </Text>
                    <Text strong style={{ fontSize: "1.5rem" }}>
                      {KhachHangs.length - SLKHConHoatDong}
                    </Text>
                    <Text type="secondary">
                      Số khách hàng không còn hoạt động
                    </Text>
                  </Space>
                </Space>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row justify="end">
              <Space>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={openKhachHangModal}
                >
                  Thêm khách hàng
                </Button>
              </Space>
            </Row>
            <KhachHangTable
              dataSource={dataSource}
              isLoadingTable={isLoadingTable}
              setCurrentId={setCurrentId}
            />
            <KhachHangModal currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
