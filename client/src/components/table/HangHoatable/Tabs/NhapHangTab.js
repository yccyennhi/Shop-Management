import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhieuNhaps } from "../../../../redux/actions";
import { PhieuNhapsState$ } from "../../../../redux/selectors";

export default function NhapHangTab({ maSP }) {
  const dispatch = useDispatch();

  const PhieuNhaps = useSelector(PhieuNhapsState$);

  const [dataSource, setDataSource] = useState(PhieuNhaps);

  useEffect(() => {
    let arrPhieuNhap = [];

    for (let i = 0; i < PhieuNhaps.length; i++) {
      if (PhieuNhaps[i].TrangThai == "Đã nhập hàng") {
        for (let j = 0; j < PhieuNhaps[i].MaSP.length; j++)
          if (PhieuNhaps[i].MaSP[j] == maSP) {
            let item = {
              MaPN: PhieuNhaps[i].MaPN,
              ThoiGian: PhieuNhaps[i].createdAt,
              TenNCC: PhieuNhaps[i].TenNCC,
              SoLuong: PhieuNhaps[i].SoLuong[j],
              GiaNhap: PhieuNhaps[i].GiaNhap[j],
              GiamGia: PhieuNhaps[i].GiamGia[j],
              ThanhTien: PhieuNhaps[i].ThanhTien[j],
            };
            arrPhieuNhap.push(item);
          }
      }
    }
    setDataSource(arrPhieuNhap);
  }, [PhieuNhaps]);


  const column = [
    {
      title: "Mã phiếu nhập",
      dataIndex: "MaPN",
      key: "MaPN",
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
      render: (date) => {
        return <p>{moment(date).format("DD/MM/YYYY")}</p>;
      },
      key: "createdAt",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "TenNCC",
      key: "TenNCC",
    },
    {
      title: "Số lượng",
      dataIndex: "SoLuong",
      key: "SoLuong",
    },
    {
      title: "Giá nhập",
      dataIndex: "GiaNhap",
      sorter: (a, b) => a.GiaNhap - b.GiaNhap,
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "GiaNhap",
    },
    {
      title: "Giảm giá",
      dataIndex: "GiamGia",
      sorter: (a, b) => a.GiamGia - b.GiamGia,
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "GiamGia",
    },

    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      sorter: (a, b) => a.ThanhTien - b.ThanhTien,
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "TongTien",
    },
  ];

  return (
    <div>
      <Table
        tableLayout="auto"
        columns={column}
        dataSource={dataSource}
        rowKey="MaPN"
      ></Table>
    </div>
  );
}
