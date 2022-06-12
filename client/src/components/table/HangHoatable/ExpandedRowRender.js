import React, { useState } from "react";
import {
 
  Col,
  Row,
  Image,
  PageHeader,
  Descriptions,
  Tag,
  Button,
  Tabs,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  showTaoSanPhamModal,
  updateSanPham,
} from "../../../redux/actions";
import NhapHangTab from "./Tabs/NhapHangTab";
const { TabPane } = Tabs;

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  function confirm() {
    setIsShow(true);
    Modal.confirm({
      visible: isShow,
      title: "Cảnh báo",
      content:
        "Việc xóa sản phẩm sẽ làm ảnh hưởng đến dữ liệu kiểm kho. Xác nhận đưa tồn kho sản phẩm về 0 để thay thế?",
      onOk() {
        handleDelete();
      },
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
    let d= data;
    d.TonKho=0;
    d.TrangThai="Hết hàng";
    dispatch(updateSanPham.updateSanPhamRequest(d));
    console.log("Cập nhật thành công!")
    setIsShow(false);
    // dispatch(deleteSanPham.deleteSanPhamRequest(record._id));
  }, [data, record, dispatch]);

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
          <Button key="2" onClick={confirm}>
            Xóa
          </Button>,
        ]}
        tags={[
          <Tag color="red" visible={record.TrangThai === "Ngừng kinh doanh"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="yellow" visible={record.TrangThai === "Hết hàng"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="blue" visible={record.TrangThai === "Đang kinh doanh"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="grey" visible={record.BaoHanh === "Không bảo hành"}>
            Không bảo hành
          </Tag>,
          <Tag color="green" visible={record.BaoHanh === "Có bảo hành"}>
            Có bảo hành
          </Tag>,
        ]}
      >
        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab="Thông tin chi tiết" key="1">
          <Row justify="start">
          <Col flex={1}>
            <Image width={300} src={record.HinhAnh || ""} />
          </Col>
          <Col flex={10}>
            <Descriptions title="Thông tin chi tiết" size="default">
              <Descriptions.Item label="Mô tả">{record.MoTa}</Descriptions.Item>
              <Descriptions.Item label="Size">{record.Size}</Descriptions.Item>
              <Descriptions.Item label="Màu sắc">{record.MauSac}</Descriptions.Item>
              <Descriptions.Item label="Loại hàng">
                {`${record.LoaiHang}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Descriptions.Item>
              <Descriptions.Item label="Giá bán">
                {`${record.GiaBan}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Descriptions.Item>
              <Descriptions.Item label="Giá vốn">
                {`${record.GiaVon}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Descriptions.Item>
              <Descriptions.Item label="Tồn kho">
                {`${record.TonKho}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Descriptions.Item>
              <Descriptions.Item
                label="Thời gian bảo hành"
                style={{ display: record.BaoHanh !== "Có bảo hành" }}
              >
                { record.BaoHanh !== "Có bảo hành"?'Không bảo hành':`${record.ThoiGianBaoHanh}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}{ record.BaoHanh !== "Có bảo hành"?'':" tháng"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
          </TabPane>
          <TabPane tab="Hóa đơn đã nhập" key="2">
            <NhapHangTab maSP={record.MaSP}/>
          </TabPane>
        </Tabs>
        
      </PageHeader>
    </>
  );
}
