import React, { useState } from "react";
import {
  Table,
  Input,
  Badge,
  Col,
  Row,
  Image,
  PageHeader,
  Descriptions,
  Tag,
  Button,
  Space,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSanPham,
  showTaoSanPhamModal,
  updateSanPham,
} from "../../../redux/actions";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  function warning() {
    setIsShow(true);
    Modal.warning({
      visible: isShow,
      title: "Cảnh báo",
      content:
        "Việc xóa sản phẩm sẽ làm ảnh hưởng đến dữ liệu kiểm kho. Xác nhận đưa tồn kho sản phẩm về 0 để thay thế?",
      onOk() {
        handleDelete();
      },
      //  onCancel: {}
    });
  }
  const openUpdateSanPhamModal = React.useCallback(() => {
    setCurrentId(record._id);
    dispatch(showTaoSanPhamModal());
  }, [dispatch]);
  const SanPhamValue = useSelector((state) =>
    state.SanPhams.data.find((SanPham) =>
      SanPham._id === record._id ? SanPham : null
    )
  );
  const [data, setData] = useState(SanPhamValue);
  const handleDelete = React.useCallback(() => {
    setData({ ...data, TonKho: 0, TrangThai: "Hết hàng" });
    dispatch(updateSanPham.updateSanPhamRequest(data));
    setIsShow(false);
    // dispatch(deleteSanPham.deleteSanPhamRequest(record._id));
  }, [record, data, dispatch]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.TenSP}
        subTitle={record.MaSP}
        extra={[
          <Button key="1" type="primary" onClick={openUpdateSanPhamModal}>
            Sửa
          </Button>,
          <Button key="2" onClick={warning}>
            Xóa
          </Button>,
        ]}
        tags={[
          <Tag color="red" visible={record.TrangThai == "Ngừng kinh doanh"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="yellow" visible={record.TrangThai == "Hết hàng"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="blue" visible={record.TrangThai == "Đang kinh doanh"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="grey" visible={record.BaoHanh == "Không bảo hành"}>
            Không bảo hành
          </Tag>,
          <Tag color="green" visible={record.BaoHanh == "Có bảo hành"}>
            Có bảo hành
          </Tag>,
        ]}
      >
        <Row justify="start">
          <Col flex={1}>
              <Image width={300} src={record.HinhAnh || ""} />
          </Col>
          <Col flex={10}>
            <Descriptions title="Thông tin chi tiết" size="default">
              <Descriptions.Item label="Mô tả">{record.MoTa}</Descriptions.Item>
              <Descriptions.Item label="Size">{record.Size}</Descriptions.Item>
              <Descriptions.Item label="Loại hàng">
                {record.LoaiHang}
              </Descriptions.Item>
              <Descriptions.Item label="Giá bán">
                {record.GiaBan}
              </Descriptions.Item>
              <Descriptions.Item label="Giá vốn">
                {record.GiaVon}
              </Descriptions.Item>
              <Descriptions.Item label="Tồn kho">
                {record.TonKho}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </PageHeader>
    </>
  );
}
