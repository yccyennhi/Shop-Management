import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHoaDons } from "../../../../redux/actions";
import { HoaDonsState$ } from "../../../../redux/selectors";

export default function HoaDonDaMuaTab({ idKH }) {
  const dispatch = useDispatch();

  const HoaDons = useSelector(HoaDonsState$);

  const [TongTien, setTongTien] = useState(0);

  const [dataSource, setDataSource] = useState(
    HoaDons.filter((HoaDon) => HoaDon.idKH === idKH)
  );

  useEffect(() => {
    dispatch(getHoaDons.getHoaDonsRequest());
    if (HoaDons) {
      setDataSource(HoaDons.filter((HoaDon) => HoaDon.idKH === idKH));

      let Tong = 0;
      dataSource.map((value) => {
        Tong += value.ThanhTien;
      });
      setTongTien(Tong);
    }
  }, [dispatch]);

  const column = [
    {
      title: "Mã hóa đơn",
      dataIndex: "MaHD",
      key: "MaHD",
    },
    {
      title: "Thời gian",
      dataIndex: "ThoiGian",
      sorter: (a, b) => moment(a.ThoiGian) - moment(b.ThoiGian),
      render: (date) => {
        return <p>{moment(date).format("DD/MM/YYYY")}</p>;
      },
      key: "ThoiGian",
    },
    {
      title: "Mã khuyến mãi",
      dataIndex: "MaKM",
      key: "MaKM",
    },
    {
      title: "Tổng tiền hàng",
      dataIndex: "TongTienHang",
      sorter: (a, b) => a.TongTienHang - b.TongTienHang,
      render: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      key: "TongTienHang",
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
      key: "ThanhTien",
    },
  ];

  return (
    <div>
      <Table
        tableLayout="auto"
        columns={column}
        dataSource={dataSource}
        rowKey="_id"
      ></Table>
      <section
        className="info_bill"
        style={{ float: "left", width: "250px", marginLeft: "20px" }}
      >
        <label
          className="title"
          style={{ float: "left", fontWeight: "bold", marginRight: "10px" }}
        >
          Tổng số hóa đơn đã mua: <br />
          Tổng tiền đã thanh toán: <br />
        </label>
        <label style={{ textAlign: "right" }}>
          {dataSource.length}
          <br />
          {`${TongTien}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          <br />
        </label>
      </section>
    </div>
  );
}
