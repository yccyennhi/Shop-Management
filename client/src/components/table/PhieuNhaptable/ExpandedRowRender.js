import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Table, PageHeader, Descriptions, Tag, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePhieuNhap,
  setIdThemPhieuNhapPage,
  updateSanPham,
  deletePhieuNhap,
} from "../../../redux/actions";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { PhieuNhapsState$, SanPhamsState$ } from "../../../redux/selectors";
import { messageError, messageSuccess } from "../../message";

export default function ExpandedRowRender({ record }) {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [IsShowFinish, setIsShowFinish] = useState(false);
  const [IsShowDelete, setIsShowDelete] = useState(false);
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
      content: "Phiếu hủy sẽ không thể khôi phục. Xác nhận hủy phiếu nhập?",
      onOk() {
        handleCancle();
        setIsShow(false);
      },
      onCancel() {
        setIsShow(false);
      },
    });
  }

  function warningFinish() {
    setIsShowFinish(true);
    Modal.confirm({
      visible: IsShowFinish,
      title: "Thông báo",
      content:
        data.TrangThai == "Đã hủy"
          ? "Phiếu đã hủy không thể hoàn thành nhập hàng!"
          : "Sau khi xác nhận không thể hủy phiếu. Xác nhận hoàn thành nhập hàng?",
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

  function warningDelete() {
    setIsShowDelete(true);
    Modal.confirm({
      visible: IsShowDelete,
      title: "Cảnh báo",
      content: "Xác nhận xóa phiếu nhập?",
      onOk() {
        handleDelete();
        setIsShowDelete(false);
      },
      onCancel() {
        setIsShowDelete(false);
      },
    });
  }

  const handleFinish = React.useCallback(() => {
    for (let i = 0; i < data.MaSP.length; i++) {
      let SanPham = SP.find((e) => e.MaSP == data.MaSP[i]);
      if (SanPham != undefined) {
        let arrGiaNhap = [];
        let arrSoLuong = [];
        for (let j = 0; j < PN?.length; j++) {
          for (let k = 0; k < PN[j]?.MaSP?.length; k++) {
            if (
              PN[j].MaSP[k] == SanPham.MaSP &&
              PN[j].TrangThai == "Đã nhập hàng"
            ) {
              arrGiaNhap.push(PN[j].GiaNhap[k]);
              arrSoLuong.push(PN[j].SoLuong[k]);
            }
          }
        }
        let GiaNhap = 0;
        for (let item = 0; item < arrGiaNhap.length; item++) {
          GiaNhap = GiaNhap + arrGiaNhap[item] * arrSoLuong[item];
        }

        let SoLuong = arrSoLuong.reduce((sum, data) => {
          return (sum += data);
        }, 0);
        SanPham.GiaVon = Math.round(
          (GiaNhap + data.GiaNhap[i] * data.SoLuong[i]) /
            (SoLuong + data.SoLuong[i])
        );
        SanPham.TrangThai='Đang kinh doanh';
        SanPham.TonKho = SanPham.TonKho + data.SoLuong[i];
        //Cập nhật giá vốn, số lượng sản phẩm
        dispatch(updateSanPham.updateSanPhamRequest(SanPham));
        setData({ ...data, TrangThai: "Đã nhập hàng", TienTra: data.TongTien - data.GiamGiaTongTien });
        messageSuccess("Nhập hàng thành công");
      } else {
        messageError("Trong danh sách có sản phẩm không tồn tại!");
        break;
      }
    }
  }, [dispatch]);

  const handleCancle = React.useCallback(() => {
    setData({ ...data, TrangThai: "Đã hủy" });
  }, [dispatch]);

  const handleDelete = React.useCallback(() => {
    dispatch(deletePhieuNhap.deletePhieuNhapRequest(record._id));
  }, [record, dispatch]);

  const history = useHistory();
  const handleNhapHang = () => {
    history.push("/ThemPhieuNhaps");
  };

  const openUpdatePhieuNhapModal = React.useCallback(() => {
    dispatch(setIdThemPhieuNhapPage(data.MaPN));
    handleNhapHang();
  }, [dispatch]);

  const date = moment(data.NgayTao).format("DD/MM/YYYY");
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
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      dataIndex: "SoLuong",
    },
    {
      key: "GiaNhap",
      title: "Giá nhập",
      dataIndex: "GiaNhap",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "GiamGia",
      title: "Giảm giá",
      dataIndex: "GiamGia",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "ThanhTien",
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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
          <Button
            key="4"
            onClick={warningDelete}
            disabled={data.TrangThai !== "Đã hủy"}
          >
            Xóa
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
            {moment(data.NgayCapNhat).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Tên NCC">{data.TenNCC}</Descriptions.Item>
          <Descriptions.Item label="Tổng số lượng">
            {`${data.TongSoLuong}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng số tiền">
            {`${data.TongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá trên tổng hóa đơn">
            {`${data.GiamGiaTongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền cần trả">
            {`${data.TongTien - data.GiamGiaTongTien - data.TienTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền đã trả">
            {`${data.TienTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
