import React, { useEffect, useRef, useMemo, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Menu, Dropdown, message, Space } from "antd";
import {
  EyeOutlined,
  DatabaseOutlined,
  SwapOutlined,
  UserOutlined,
  TagsOutlined,
  TeamOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
const { SubMenu } = Menu;

function Menubar() {
  const history = useHistory();
  //Tong Quan
  const handleTongQuan = () => {
    history.push("/TongQuans");
  };

  //Hang hoa
  const handleHangHoa = () => {
    history.push("/SanPhams");
  };
  const handleThietLapGia = () => {
    history.push("/ThietLapGias");
  };
  const handlePhieuBaoHanh = () => {
    history.push("/PhieuBaoHanhs");
  };
  const handlePhieuHen = () => {
    history.push("/PhieuHens");
  };
  const handleKiemKho = () => {
    history.push("/KiemKhos");
  };

  //Giao dich
  const handleDatHang = () => {
    history.push("/DatHangs");
  };
  const handleHoaDon = () => {
    history.push("/HoaDons");
  };
  const handleTraHang = () => {
    history.push("/TraHangs");
  };
  const handleYeuCauSuaChua = () => {
    history.push("/YeuCauSuaChuas");
  };
  const handleNhapHang = () => {
    history.push("/PhieuNhaps");
  };
  const handleTraHangNhap = () => {
    history.push("/TraHangNhaps");
  };
  //Khach Hang
  const handleKhachHang = () => {
    history.push("/KhachHangs");
  };

  //Nhan vien
  const handleNhanVien = () => {
    history.push("/NhanViens");
  };

  //Khuyen Mai
  const handleKhuyenMai = () => {
    history.push("/KhuyenMais");
  };

  //So quy
  const handleSoQuy = () => {
    history.push("/SoQuys");
  };

  //Bao cao
  const handleBCCuoiNgay = () => {
    history.push("/CuoiNgays");
  };
  const handleBCBanHang = () => {
    history.push("/BCBanHangs");
  };
  const handleBCDatHang = () => {
    history.push("/BCDatHangs");
  };
  const handleBCHangHoa = () => {
    history.push("/BCHangHoas");
  };

  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1000"]}>
        <SubMenu
          key="TongQuan"
          icon={<EyeOutlined />}
          title="Tổng quan"
          onTitleClick={handleTongQuan}
        ></SubMenu>

        <SubMenu
          key="HangHoa"
          icon={<DatabaseOutlined />}
          title="Hàng hóa"
          onTitleClick={handleHangHoa}
        >
          <Menu.Item key="DanhMuc" onClick={handleHangHoa}>
            Danh mục sản phẩm
          </Menu.Item>
          <Menu.Item key="PhieuBaoHanh" onClick={handlePhieuBaoHanh}>
            Phiếu bảo hành
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="GiaoDich"
          icon={<SwapOutlined />}
          title="Giao dịch"
          onTitleClick={handleHoaDon}
        >
          <Menu.Item key="HoaDon" onClick={handleHoaDon}>
            Hóa đơn
          </Menu.Item>
          <Menu.Item key="TraHang" onClick={handleTraHang}>
            Trả hàng
          </Menu.Item>
          <Menu.Item key="PhieuHen" onClick={handlePhieuHen}>
            Yêu cầu sửa chữa
          </Menu.Item>
          <Menu.Item key="NhapHang" onClick={handleNhapHang}>
            Nhập hàng
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="KhuyenMai"
          icon={<TagsOutlined />}
          title="Khuyến mãi"
          onTitleClick={handleKhuyenMai}
        ></SubMenu>
        <SubMenu
          key="KhachHang"
          icon={<UserOutlined />}
          title="Khách hàng"
          onTitleClick={handleKhachHang}
        ></SubMenu>
        <SubMenu
          key="NhanVien"
          icon={<TeamOutlined />}
          title="Nhân viên"
          onTitleClick={handleNhanVien}
        ></SubMenu>
        <SubMenu
          key="BaoCao"
          icon={<BarChartOutlined />}
          title="Báo cáo"
          onTitleClick={handleBCCuoiNgay}
        >
          <Menu.Item key="BCCuoiNgay" onClick={handleBCCuoiNgay}>
            Cuối ngày
          </Menu.Item>
          <Menu.Item key="BCBanHang" onClick={handleBCBanHang}>
            Bán hàng
          </Menu.Item>
          <Menu.Item key="BCHangHoa" onClick={handleBCHangHoa}>
            Hàng hóa
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Menubar;
