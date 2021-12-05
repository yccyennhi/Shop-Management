import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Layout, PageHeader, Radio, Row, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "../../color";
import Menubar from "../../components/header/Menubar/Menubar";
import NhanVienModal from "../../components/modal/NhanVienModal/NhanVienModal";
import NhanVienTable from "../../components/table/NhanVienTable/NhanVienTable";
import * as actions from "../../redux/actions";
import { showNhanVienModal } from "../../redux/actions";
import { NhanViensState$ } from "../../redux/selectors";

const { Content, Sider, Header } = Layout;

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

  const [dataSource, setdataSoure] = useState(NhanViens);

  useEffect(() => {
    dispatch(actions.getNhanViens.getNhanViensRequest());
  }, [dispatch]);

  useEffect(() => {
    if (NhanViens) setdataSoure(NhanViens);
  }, [NhanViens]);
  //#endregion

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
            <Row justify="end">
              <Space direction="horizontal">
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={openNhanVienModal}
                >
                  Thêm nhân viên
                </Button>
                {/* <Button icon={<ImportOutlined />} type="primary">
                Import
              </Button>
              <Button icon={<DownloadOutlined />} type="primary">
                Xuất file
              </Button> */}
              </Space>
            </Row>
            <NhanVienTable
              dataSource={dataSource}
              setCurrentId={setCurrentId}
            />
            <NhanVienModal currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
