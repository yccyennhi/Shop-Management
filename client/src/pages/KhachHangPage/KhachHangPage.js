import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Layout, PageHeader, Radio, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "../../color.js";
import Menubar from "../../components/header/Menubar/Menubar.js";
import KhachHangModal from "../../components/modal/KhachHangModal/KhachHangModal";
import KhachHangTable from "../../components/table/KhachHangTable/KhachHangTable";
import * as actions from "../../redux/actions";
import { showKhachHangModal } from "../../redux/actions";
import { KhachHangsState$ } from "../../redux/selectors/index.js";

const { Content, Sider, Header } = Layout;

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

  const [dataSource, setdataSoure] = useState(KhachHangs);

  useEffect(() => {
    dispatch(actions.getKhachHangs.getKhachHangsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (KhachHangs) setdataSoure(KhachHangs);
  }, [KhachHangs]);
  //#endregion

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
          style={{ padding: "0px 0px 0px 24px" }}
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
            <Row justify="end">
              <Space>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={openKhachHangModal}
                >
                  Thêm khách hàng
                </Button>
                {/* <Button icon={<ImportOutlined />} type="primary">
                  Import
                </Button>
                <Button icon={<DownloadOutlined />} type="primary">
                  Xuất file
                </Button> */}
              </Space>
            </Row>
            <KhachHangTable
              dataSource={dataSource}
              setCurrentId={setCurrentId}
            />
            <KhachHangModal currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
