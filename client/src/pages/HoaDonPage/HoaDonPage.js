import React, { useCallback, useState } from "react";
import {
  PageHeader,
  Row,
  Button,
  Space,
  Layout
} from "antd";
import "./styles.css";
import {
  PlusOutlined,
  ImportOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import DataTableHoaDon from "../../components/table/HoaDonTable/HoaDonTable.js";
import { useDispatch, useSelector } from "react-redux";
import { getHoaDons } from "../../redux/actions";
import { Content } from "antd/lib/layout/layout";
import { HoaDonsState$ } from "../../redux/selectors";
import { useHistory } from "react-router-dom";

export default function HoaDonPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const HoaDons = useSelector(HoaDonsState$);
  React.useEffect(() => {
    dispatch(getHoaDons.getHoaDonsRequest());
  }, [dispatch]);
  return (
    <Layout>
      <PageHeader className="site-page-header" title="Hóa Đơn" />
      <Content style={{ padding: "0px 50px" }}>
        <div className="site-layout-content">
          <Row justify="end">
            <Space>
              <Button type="primary" icon={<PlusOutlined /> } onClick={()=> history.push("/Sales")}>
                Thêm hóa đơn
              </Button>
              <Button type="primary" icon={<ImportOutlined />}>
                Import
              </Button>
              <Button type="primary" icon={<DownloadOutlined />}>
                Xuất file
              </Button>
            </Space>
          </Row>
          <DataTableHoaDon HoaDons = {HoaDons}/>
        </div>
      </Content>
    </Layout>
    
  );
}
