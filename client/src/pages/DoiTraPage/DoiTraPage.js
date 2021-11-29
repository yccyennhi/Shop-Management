import React from "react";
import {
  PageHeader,
  Row,
  Button,
  Space,
  Layout
} from "antd";
import "./styles.css";
import {
  UserOutlined,
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import TraHangTable from "../../components/table/DoiTraTable/TraHangTable";
import TaoPhieuTraHangModal from "../../components/modal/DoiTraModal/TaoPhieuDoiTraModal";
import { showTaoPhieuTraHangModal } from "../../redux/actions";
import {PhieuDoiTrasState$, CTPDTsState$} from "../../redux/selectors"
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Content } from "antd/lib/layout/layout";

export default function DoiTraPage() {
  const dispatch = useDispatch();
  const PhieuDoiTras = useSelector(PhieuDoiTrasState$);
  const CTPDTs = useSelector(CTPDTsState$);
  React.useEffect(() => {
    dispatch(actions.getPhieuDoiTras.getPhieuDoiTrasRequest());
    dispatch(actions.getCTPDTs.getCTPDTsRequest());
  }, [dispatch]);
  const openTaoPhieuTraHangModal = React.useCallback(() => {
    dispatch(showTaoPhieuTraHangModal());
  }, [dispatch]);
  return (
    <Layout>
      <PageHeader className="site-page-header" title="Trả hàng" />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content">
        <Row justify="end">
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={openTaoPhieuTraHangModal}>
              Thêm phiếu trả hàng
            </Button>
            <Button type="primary" icon={<ImportOutlined />}>
              Import
            </Button>
            <Button type="primary" icon={<DownloadOutlined />}>
              Xuất file
            </Button>
          </Space>
        </Row>
        <TaoPhieuTraHangModal PhieuDoiTras = {PhieuDoiTras} CTPDTs = {CTPDTs}/>
        <TraHangTable PhieuDoiTras = {PhieuDoiTras} CTPDTs = {CTPDTs}/>
      </div>
      </Content>
    </Layout>
  );
}
