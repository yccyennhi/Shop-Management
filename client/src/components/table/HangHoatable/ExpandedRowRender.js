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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteSanPham, showTaoSanPhamModal } from "../../../redux/actions";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("blue");
  const [statuss, setStatuss] = useState("Đang kinh doanh");

  const openCreateSanPhamModal = React.useCallback(() => {
    setCurrentId(record._id);
    dispatch(showTaoSanPhamModal());
  }, [dispatch]);

  const onDelete = React.useCallback(() => {
    console.log("record data", record);
    dispatch(deleteSanPham.deleteSanPhamRequest(record._id));
  }, [record, dispatch]);
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.TenSP}
        subTitle={record.MaSP}
        extra={[
          <Button key="1" type="primary" onClick={openCreateSanPhamModal}>
            Sửa
          </Button>,
          <Button key="2" onClick={onDelete}>
            Xóa
          </Button>,
        ]}
      >
        {/* <Tag color="red" visible={record.TrangThai == 0}>
          {record.TrangThai == 0 ? "Ngừng kinh doanh" : ""}
        </Tag>
        <Tag color="yellow" visible={record.TrangThai == 1}>
          {record.TrangThai == 1 ? "Hết hàng" : ""}
        </Tag>
        <Tag color="blue" visible={record.TrangThai == 2}>
          {record.TrangThai == 2 ? "Đang kinh doanh" : ""}
        </Tag> */}
        <Row justify="start">
          <Col flex={1}>
            <Space direction="vertical">
              <Row>
                <Space direction="horizontal">
                  <Tag color="red" visible={record.TrangThai == 0}>
                    {record.TrangThai == 0 ? "Ngừng kinh doanh" : ""}
                  </Tag>
                  <Tag color="yellow" visible={record.TrangThai == 1}>
                    {record.TrangThai == 1 ? "Hết hàng" : ""}
                  </Tag>
                  <Tag color="blue" visible={record.TrangThai == 2}>
                    {record.TrangThai == 2 ? "Đang kinh doanh" : ""}
                  </Tag>
                  <Tag color="grey" visible={record.BaoHanh == 0}>
                    Không bảo hành
                  </Tag>
                  <Tag color="green" visible={record.BaoHanh == 1}>
                    Có bảo hành
                  </Tag>
                </Space>
              </Row>

              <Image width={300} src={record.HinhAnh || ""} />
            </Space>
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
            ,
          </Col>
        </Row>

        <>
          {/* <Descriptions size="medium" column={3} row={5}>
            <Descriptions.Item></Descriptions.Item>
            <Descriptions.Item label="Phần trăm giảm">
              {record.PhanTram}
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng">
              {record.SoLuong}
            </Descriptions.Item>
          </Descriptions> */}
        </>
      </PageHeader>
    </>
  );
}
