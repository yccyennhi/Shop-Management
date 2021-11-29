import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Table,
  PageHeader,
  Descriptions,
  Tag,
  Button,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePhieuNhap,
  setIdThemPhieuNhapPage,
} from "../../../redux/actions";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { PhieuNhapsState$, SanPhamsState$ } from "../../../redux/selectors";

export default function ExpandedRowRender({ record }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [IsShowFinish, setIsShowFinish] = useState(false);
  const PN = useSelector(PhieuNhapsState$);
  const SP = useSelector(SanPhamsState$);
  const [dataSource, setDataSource] = useState([
    {
      MaSP: "",
      TenSP: "",
      MauSac: "",
      Size: "",
      LoaiHang: "",
      GiamGia: 0,
      SoLuong: 0,
      GiaNhap: 0,
      ThanhTien: 0,
    },
  ]);
  const PhieuNhapValue = useSelector((state) =>
    state.PhieuNhaps.data.find((PhieuNhap) =>
      PhieuNhap._id === record._id ? PhieuNhap : null
    )
  );
  const [data, setData] = useState(PhieuNhapValue);

  React.useEffect(() => {
    dispatch(updatePhieuNhap.updatePhieuNhapRequest(data));
  }, [data]);

  React.useEffect(() => {
    if (PhieuNhapValue != undefined) {
      let arr = [];
      for (let i = 0; i < PhieuNhapValue.MaSP.length; i++) {
        let newData = {
          MaSP: PhieuNhapValue.MaSP[i],
          TenSP: PhieuNhapValue.TenSP[i],
          MauSac: PhieuNhapValue.MauSac[i],
          Size: PhieuNhapValue.Size[i],
          LoaiHang: PhieuNhapValue.LoaiHang[i],
          GiamGia: PhieuNhapValue.GiamGia[i],
          SoLuong: PhieuNhapValue.SoLuong[i],
          GiaNhap: PhieuNhapValue.GiaNhap[i],
          ThanhTien: PhieuNhapValue.ThanhTien[i],
        };
        arr.push(newData);
      }
      setDataSource(arr);
    }
  }, [dispatch]);

  function warning() {
    setIsShow(true);
    Modal.confirm({
      visible: isShow,
      title: "Cảnh báo",
      content: "Xác nhận hủy phiếu nhập?",
      onOk() {
        handleDelete();
        setIsShow(false);
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
      content:
        data.TrangThai == "Đã hủy"
          ? "Phiếu đã hủy không thể hoàn thành nhập hàng!"
          : "Xác nhận hoàn thành nhập hàng?",
      onOk() {
        if (data.TrangThai !== "Đã hủy") {
          handleFinish();
        }
        setIsShowFinish(false);
      },
      onCancel() {
        setIsShowFinish(false);
      },
    });
  }
  const handleFinish = React.useCallback(() => {
    
    setData({ ...data, TrangThai: "Đã nhập hàng" });
  }, [dispatch]);

  const handleDelete = React.useCallback(() => {
    setData({ ...data, TrangThai: "Đã hủy" });
  }, [dispatch]);

  const history = useHistory();
  const handleNhapHang = () => {
    history.push("/ThemPhieuNhaps");
  };

  const openUpdatePhieuNhapModal = React.useCallback(() => {
    dispatch(setIdThemPhieuNhapPage(data.MaPN));
    handleNhapHang();
  }, [dispatch]);

  const date = moment(data.NgayTao).format("DD-MM-YYYY");
  const columns = [
    {
      key: "MaSP",
      title: "Mã sản phẩm",
      dataIndex: "MaSP",
    },
    {
      key: "TenSP",
      title: "Tên sản phẩm",
      dataIndex: "TenSP",
    },
    {
      key: "MauSac",
      title: "Màu sắc",
      dataIndex: "MauSac",
    },
    {
      key: "Size",
      title: "Size",
      dataIndex: "Size",
    },
    {
      key: "LoaiHang",
      title: "Loại hàng",
      dataIndex: "LoaiHang",
    },
    {
      key: "SoLuong",
      title: "Số lượng",
      dataIndex: "SoLuong",
    },
    {
      key: "GiaNhap",
      title: "Giá nhập",
      dataIndex: "GiaNhap",
    },
    {
      key: "GiamGia",
      title: "Giảm giá",
      dataIndex: "GiamGia",
    },
    {
      key: "ThanhTien",
      title: "Thành tiền",
      dataIndex: "ThanhTien",
    },
  ];
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={data.MaPN}
        subTitle={date}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={openUpdatePhieuNhapModal}
            disabled={
              data.TrangThai == "Đã hủy" || data.TrangThai == "Đã nhập hàng"
            }
          >
            Sửa
          </Button>,
          <Button
            key="2"
            onClick={warning}
            disabled={
              data.TrangThai == "Đã hủy" || data.TrangThai == "Đã nhập hàng"
            }
          >
            Hủy phiếu
          </Button>,
          <Button
            key="3"
            onClick={warningFinish}
            disabled={
              data.TrangThai == "Đã hủy" || data.TrangThai == "Đã nhập hàng"
            }
          >
            Hoàn thành
          </Button>,
        ]}
        tags={[
          <Tag color="red" visible={data.TrangThai == "Đã hủy"}>
            {data.TrangThai}
          </Tag>,
          <Tag color="yellow" visible={data.TrangThai == "Phiếu tạm"}>
            {data.TrangThai}
          </Tag>,
          <Tag color="blue" visible={data.TrangThai == "Đã nhập hàng"}>
            {data.TrangThai}
          </Tag>,
        ]}
      >
        <Descriptions title="Thông tin chi tiết" size="default" column={2}>
          <Descriptions.Item label="Người nhập">
            {data.NguoiNhap}
          </Descriptions.Item>
          <Descriptions.Item label="Người tạo">
            {data.NguoiTao}
          </Descriptions.Item>
          <Descriptions.Item label="Cập nhật lần cuối">
            {moment(data.NgayCapNhat).format("DD-MM-YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Tên NCC">{data.TenNCC}</Descriptions.Item>
          <Descriptions.Item label="Tổng số lượng">
            {data.TongSoLuong}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số tiền">
            {data.TongTien}
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá trên tổng hóa đơn">
            {data.GiamGiaTongTien}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền cần trả">
            {data.TongTien - data.GiamGiaTongTien - data.TienTra}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền đã trả">
            {data.TienTra}
          </Descriptions.Item>
        </Descriptions>
        <Table
          scroll={{ x: 1200, y: 500 }}
          columns={columns}
          dataSource={dataSource}
          searchableProps={{
            inputProps: {
              placeholder: "Nhập nội dung cần tìm",
              prefix: <SearchOutlined />,
              width: 200,
            },
          }}
          rowKey="MaSP"
        ></Table>
      </PageHeader>
    </>
  );
}
