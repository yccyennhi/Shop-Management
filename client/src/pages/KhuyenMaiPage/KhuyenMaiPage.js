import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {  PageHeader, Row, Button, Space} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";

import KhuyenMaitable from "../../components/table/KhuyenMaitable/KhuyenMaitable";
import { showModal } from "../../redux/actions";
import KhuyenMaiModal from "../../components/modal/KhuyenMaiModal/KhuyenMaiModal";

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
            </Space>
          </Row>
          <KhuyenMaiModal currentId={currentId} setCurrentId={setCurrentId}/>
          <KhuyenMaitable setCurrentId={setCurrentId} />
        </div>
      </div>
    </>
  );
}
