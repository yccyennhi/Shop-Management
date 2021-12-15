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
  Result,
  Row,
  Space,
  Typography,
} from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "../../color";
import Menubar from "../../components/header/Menubar/Menubar";
import NhanVienModal from "../../components/modal/NhanVienModal/NhanVienModal";
import NhanVienTable from "../../components/table/NhanVienTable/NhanVienTable";
import { AuthContext } from "../../contexts/AuthContext";
import * as actions from "../../redux/actions";
import { showNhanVienModal } from "../../redux/actions";
import {
  isLoadingNhanViensState$,
  NhanViensState$,
} from "../../redux/selectors";
const { Content, Sider, Header } = Layout;
const { Text } = Typography;

export default function NhanVienPage() {
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);

  //#region Modal
  const openNhanVienModal = useCallback(() => {
    dispatch(showNhanVienModal());
  }, [dispatch]);
  //#endregion

  //#region Data NhanViens
  const NhanViens = useSelector(NhanViensState$);

  const isLoadingTable = useSelector(isLoadingNhanViensState$);

  const [dataSource, setdataSoure] = useState(NhanViens);

  useEffect(() => {
    dispatch(actions.getNhanViens.getNhanViensRequest());
  }, [dispatch]);

  useEffect(() => {
    if (NhanViens) setdataSoure(NhanViens);
  }, [NhanViens]);

  const SLNVConLamViec = NhanViens.filter(
    (NhanVien) => NhanVien.TrangThai === true
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
  } else
    return (
      <Layout>
        <Header>
          <Menubar />
        </Header>
        <PageHeader
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Nhân viên"
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
                      <Radio value={1} onClick={() => setdataSoure(NhanViens)}>
                        Tất cả
                      </Radio>
                      <Radio
                        value={2}
                        onClick={() =>
                          setdataSoure(
                            NhanViens.filter(
                              (NhanVien) => NhanVien.TrangThai === true
                            )
                          )
                        }
                      >
                        Đang làm việc
                      </Radio>
                      <Radio
                        value={3}
                        onClick={() =>
                          setdataSoure(
                            NhanViens.filter(
                              (NhanVien) => NhanVien.TrangThai === false
                            )
                          )
                        }
                      >
                        Đã nghỉ
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
                      <Text strong>{NhanViens.length} nhân viên</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {NhanViens.length}
                      </Text>
                      <Text type="secondary">Tổng số lượng nhân viên</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <SmileTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>{SLNVConLamViec} nhân viên</Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {SLNVConLamViec}
                      </Text>
                      <Text type="secondary">Số nhân viên còn làm việc</Text>
                    </Space>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space align="center" size={20}>
                    <FrownTwoTone style={{ fontSize: "40px" }} />
                    <Space direction="vertical" size={0}>
                      <Text strong>
                        {NhanViens.length - SLNVConLamViec} nhân viên
                      </Text>
                      <Text strong style={{ fontSize: "1.5rem" }}>
                        {NhanViens.length - SLNVConLamViec}
                      </Text>
                      <Text type="secondary">
                        Số nhân viên không còn làm việc
                      </Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Divider orientation="left"></Divider>
              <Row justify="end">
                <Space direction="horizontal">
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={openNhanVienModal}
                  >
                    Thêm nhân viên
                  </Button>
                </Space>
              </Row>
              <NhanVienTable
                dataSource={dataSource}
                isLoadingTable={isLoadingTable}
                setCurrentId={setCurrentId}
              />
              <NhanVienModal
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
}
