import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {  PageHeader, Row, Button, Space} from "antd";
import {
  PlusOutlined,
  RestOutlined,
} from "@ant-design/icons";
import "./styles.css";

import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
import { showModal } from "../../redux/actions";
import CreateKhuyenMaiModal from "../../components/CreateKMModal/CreateKhuyenMaiModal";

export default function KhuyenMaiPage() {

  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  const openCreateKMModal = React.useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <>
      <div>
        <PageHeader className="site-page-header" title="Khuyến mãi" />
        <div>
          <Row justify="end">
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreateKMModal}
              >
                Thêm khuyến mãi
              </Button>
              <Button type="secondary" icon={<RestOutlined />}>
                Xóa khuyến mãi
              </Button>
            </Space>
          </Row>
          <CreateKhuyenMaiModal currentId={currentId} setCurrentId={setCurrentId}/>
          <KhuyenMaitable setCurrentId={setCurrentId} />
        </div>
      </div>
    </>
  );
}
