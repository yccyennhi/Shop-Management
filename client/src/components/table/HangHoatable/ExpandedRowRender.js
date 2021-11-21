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
import { deleteSanPham, showUpdateSanPhamModal } from "../../../redux/actions";

export default function ExpandedRowRender({ record, setCurrentId }) {
  const dispatch = useDispatch();

  const openUpdateSanPhamModal = React.useCallback(() => {
    setCurrentId(record._id);
    dispatch(showUpdateSanPhamModal());
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
          <Button key="1" type="primary" onClick={openUpdateSanPhamModal}>
            Sửa
          </Button>,
          <Button key="2" onClick={onDelete}>
            Xóa
          </Button>,
        ]}
      >
        <Row justify="start">
          <Col flex={1}>
            <Space direction="vertical">
              <Row>
                <Space direction="horizontal">
                  <Tag color="red" visible={record.TrangThai == "Ngừng kinh doanh"}>
                    {record.TrangThai}
                  </Tag>
                  <Tag color="yellow" visible={record.TrangThai == "Hết hàng"}>
                    {record.TrangThai}
                  </Tag>
                  <Tag color="blue" visible={record.TrangThai == "Đang kinh doanh"}>
                    {record.TrangThai}
                  </Tag>
                  <Tag color="grey" visible={record.BaoHanh == "Không bảo hành"}>
                    Không bảo hành
                  </Tag>
                  <Tag color="green" visible={record.BaoHanh == "Có bảo hành"}>
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
      </PageHeader>
    </>
  );
}
