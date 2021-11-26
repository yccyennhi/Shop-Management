import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
  deletePhieuNhap,
  showTaoPhieuNhapModal,
  updatePhieuNhap,
  setIdThemPhieuNhapPage,
} from "../../../redux/actions";
import moment from "moment";
import ThemPhieuNhapPage from "../../../pages/ThemPhieuNhapPage/ThemPhieuNhapPage";

export default function ExpandedRowRender({ record, currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [IsShowFinish, setIsShowFinish] = useState(false);

  const PhieuNhapValue = useSelector((state) =>
    state.PhieuNhaps.data.find((PhieuNhap) =>
      PhieuNhap._id === record._id ? PhieuNhap : null
    )
  );
  const [data, setData] = useState(PhieuNhapValue);

  function warning() {
    setIsShow(true);
    Modal.warning({
      visible: isShow,
      title: "Cảnh báo",
      content: "Xác nhận hủy phiếu nhập?",
      onOk() {
        handleDelete();
      },
      onCancel() {
        setIsShow(false);
      },
    });
  }

  function warningFinish() {
    setIsShow(true);
    Modal.confirm({
      visible: IsShowFinish,
      title: "Thông báo",
      content: "Xác nhận hoàn thành nhập hàng?",
      onOk() {
        handleFinish();
      },
      onCancel() {
        setIsShowFinish(false);
      },
    });
  }
  const handleFinish = React.useCallback(() => {
    setData({ ...data, TrangThai: "Đã nhập hàng" });
    console.log("nhap", data);
    dispatch(updatePhieuNhap.updatePhieuNhapRequest(data));
    setIsShowFinish(false);
    // dispatch(deleteSanPham.deleteSanPhamRequest(record._id));
  }, [dispatch, IsShowFinish]);
  const handleDelete = React.useCallback(() => {
    setData({ ...data, TrangThai: "Đã hủy" });
    console.log("huy", data);
    dispatch(updatePhieuNhap.updatePhieuNhapRequest(data));
    setIsShow(false);
    // dispatch(deleteSanPham.deleteSanPhamRequest(record._id));
  }, [dispatch, isShow]);
  const history = useHistory();
  const handleNhapHang = () => {
    history.push("/ThemPhieuNhaps");
  };
  const openUpdatePhieuNhapModal = React.useCallback(() => {
    dispatch(setIdThemPhieuNhapPage(record.MaPN));
    handleNhapHang();
  }, [dispatch]);
  const date = moment(record.NgayTao).format("DD-MM-YYYY");
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={record.MaPN}
        subTitle={date}
        extra={[
          <Button key="1" type="primary" onClick={openUpdatePhieuNhapModal}>
            Sửa
          </Button>,
          <Button key="2" onClick={warning}>
            Hủy phiếu
          </Button>,
          <Button key="3" onClick={warningFinish}>
            Hoàn thành
          </Button>,
        ]}
        tags={[
          <Tag color="red" visible={record.TrangThai == "Đã hủy"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="yellow" visible={record.TrangThai == "Phiếu tạm"}>
            {record.TrangThai}
          </Tag>,
          <Tag color="blue" visible={record.TrangThai == "Đã nhập hàng"}>
            {record.TrangThai}
          </Tag>,
        ]}
      >
        <Descriptions title="Thông tin chi tiết" size="default" column={2}>
          <Descriptions.Item label="Người nhập">
            {record.NguoiNhap}
          </Descriptions.Item>
          <Descriptions.Item label="Người tạo">
            {record.NguoiTao}
          </Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">
            {moment(record.NgayCapNhat).format("DD-MM-YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Tên NCC">{record.TenNCC}</Descriptions.Item>
          <Descriptions.Item label="Tổng số lượng">
            {record.TongSoLuong}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số tiền">
            {record.TongTien}
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá trên tổng hóa đơn">
            {record.GiamGiaTongTien}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền cần trả">
            {record.TongTien - record.GiamGiaTongTien - record.TienTra}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền đã trả">
            {record.TienTra}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
}
