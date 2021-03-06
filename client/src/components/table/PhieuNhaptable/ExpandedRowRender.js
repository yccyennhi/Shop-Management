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
      title: "C???nh b??o",
      content: "Phi???u h???y s??? kh??ng th??? kh??i ph???c. X??c nh???n h???y phi???u nh???p?",
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
      title: "Th??ng b??o",
      content:
        data.TrangThai == "???? h???y"
          ? "Phi???u ???? h???y kh??ng th??? ho??n th??nh nh???p h??ng!"
          : "Sau khi x??c nh???n kh??ng th??? h???y phi???u. X??c nh???n ho??n th??nh nh???p h??ng?",
      onOk() {
        if (data.TrangThai !== "???? h???y") {
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
      title: "C???nh b??o",
      content: "X??c nh???n x??a phi???u nh???p?",
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
              PN[j].TrangThai == "???? nh???p h??ng"
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
        SanPham.TrangThai='??ang kinh doanh';
        SanPham.TonKho = SanPham.TonKho + data.SoLuong[i];
        //C???p nh???t gi?? v???n, s??? l?????ng s???n ph???m
        dispatch(updateSanPham.updateSanPhamRequest(SanPham));
        setData({ ...data, TrangThai: "???? nh???p h??ng", TienTra: data.TongTien - data.GiamGiaTongTien });
        messageSuccess("Nh???p h??ng th??nh c??ng");
      } else {
        messageError("Trong danh s??ch c?? s???n ph???m kh??ng t???n t???i!");
        break;
      }
    }
  }, [dispatch]);

  const handleCancle = React.useCallback(() => {
    setData({ ...data, TrangThai: "???? h???y" });
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
      title: "M?? s???n ph???m",
      dataIndex: "MaSP",
    },
    {
      key: "TenSP",
      title: "T??n s???n ph???m",
      dataIndex: "TenSP",
    },
    {
      key: "MauSac",
      title: "M??u s???c",
      dataIndex: "MauSac",
    },
    {
      key: "Size",
      title: "Size",
      dataIndex: "Size",
    },
    {
      key: "LoaiHang",
      title: "Lo???i h??ng",
      dataIndex: "LoaiHang",
    },
    {
      key: "SoLuong",
      title: "S??? l?????ng",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      dataIndex: "SoLuong",
    },
    {
      key: "GiaNhap",
      title: "Gi?? nh???p",
      dataIndex: "GiaNhap",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "GiamGia",
      title: "Gi???m gi??",
      dataIndex: "GiamGia",
      render: (value) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      key: "ThanhTien",
      title: "Th??nh ti???n",
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
              data.TrangThai == "???? h???y" || data.TrangThai == "???? nh???p h??ng"
            }
          >
            S???a
          </Button>,
          <Button
            key="2"
            onClick={warning}
            disabled={
              data.TrangThai == "???? h???y" || data.TrangThai == "???? nh???p h??ng"
            }
          >
            H???y phi???u
          </Button>,
          <Button
            key="3"
            onClick={warningFinish}
            disabled={
              data.TrangThai == "???? h???y" || data.TrangThai == "???? nh???p h??ng"
            }
          >
            Ho??n th??nh
          </Button>,
          <Button
            key="4"
            onClick={warningDelete}
            disabled={data.TrangThai !== "???? h???y"}
          >
            X??a
          </Button>,
        ]}
        tags={[
          <Tag color="red" visible={data.TrangThai == "???? h???y"}>
            {data.TrangThai}
          </Tag>,
          <Tag color="yellow" visible={data.TrangThai == "Phi???u t???m"}>
            {data.TrangThai}
          </Tag>,
          <Tag color="blue" visible={data.TrangThai == "???? nh???p h??ng"}>
            {data.TrangThai}
          </Tag>,
        ]}
      >
        <Descriptions title="Th??ng tin chi ti???t" size="default" column={2}>
          <Descriptions.Item label="Ng?????i nh???p">
            {data.NguoiNhap}
          </Descriptions.Item>
          <Descriptions.Item label="Ng?????i t???o">
            {data.NguoiTao}
          </Descriptions.Item>
          <Descriptions.Item label="C???p nh???t l???n cu???i">
            {moment(data.NgayCapNhat).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="T??n NCC">{data.TenNCC}</Descriptions.Item>
          <Descriptions.Item label="T???ng s??? l?????ng">
            {`${data.TongSoLuong}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="T???ng s??? ti???n">
            {`${data.TongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="Gi???m gi?? tr??n t???ng h??a ????n">
            {`${data.GiamGiaTongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="S??? ti???n c???n tr???">
            {`${data.TongTien - data.GiamGiaTongTien - data.TienTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
          <Descriptions.Item label="S??? ti???n ???? tr???">
            {`${data.TienTra}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Descriptions.Item>
        </Descriptions>
        <Table
          scroll={{ x: 1200, y: 500 }}
          columns={columns}
          dataSource={dataSource}
          searchableProps={{
            inputProps: {
              placeholder: "Nh???p n???i dung c???n t??m",
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
